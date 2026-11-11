# syntax=docker/dockerfile:1.4

# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines these at build time (see src/App.tsx and src/context/App/AppActions.ts).
# Override with --build-arg (or `args:` in docker-compose) for other environments.
ARG VITE_APP_BASE=/active-projects
ARG VITE_API_URL=https://dev.franklintn.gov/api/v3/eng/public/active-projects
ENV VITE_APP_BASE=$VITE_APP_BASE \
    VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Runtime stage ----
FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

# nginx config: serve the SPA under /active-projects on port 6000.
# The upstream reverse proxy should forward /active-projects/ to this container.
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
    listen 6000;
    server_name _;

    # Don't leak the container's internal host/port in redirects behind a proxy
    absolute_redirect off;

    root /usr/share/nginx/html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/javascript image/svg+xml;

    # Health check for Docker/Portainer
    location = /healthz {
        access_log off;
        default_type text/plain;
        return 200 'ok';
    }

    location = / {
        return 302 /active-projects/;
    }

    # Hashed build assets: cache aggressively
    location /active-projects/assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA: fall back to index.html for client-side routes
    location /active-projects/ {
        add_header Cache-Control "no-cache";
        try_files $uri $uri/ /active-projects/index.html;
    }
}
NGINX

COPY --from=build /app/dist /usr/share/nginx/html/active-projects

EXPOSE 6000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:6000/healthz || exit 1
