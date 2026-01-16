# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev              # Start dev server on port 6000
npm run preview          # Preview production build
```

### Building & Deployment
```bash
npm run build            # TypeScript build + Vite build
npm run deploy           # SCP dist to $USER@cofasv03:/opt/builds/active-projects-vite-ts
```

### Testing & Linting
```bash
npm test                 # Run Vitest tests
npm run lint             # Run ESLint
```

### Running Specific Tests
```bash
npx vitest <path-to-test-file>              # Run specific test file
npx vitest --watch                          # Run tests in watch mode
```

## Architecture

### API & State Management

**API Integration:** All API calls are centralized in `src/context/App/AppActions.ts`. The API base URL is environment-aware:
- Development: `https://cofasv38.franklin-gov.com/api/v2/eng/public/active-projects`
- Production: `https://dev.franklintn.gov/api/v2/eng/public/active-projects`

**State Management Pattern:**
- **React Query (v3)** for server state, caching, and data fetching
- **Context + useReducer** for local map UI state (selection, filters, basemap, zoom)
  - `src/components/map/context.tsx` - Map state (selected project, project type filters, basemap)

### Map Integration

**ArcGIS JS API (@arcgis/core):**
- Main map view initialized in `src/components/map/ProjectsMap/hooks.ts`
- Supports basemap selection (default: dark-gray-vector)
- Includes Search, Home, Zoom, and BasemapGallery widgets
- Graphics layers for project markers (points) and labels (text)
- Hit testing for marker click detection

**Map Features:**
- Project type filtering (Facilities, Parks, Stormwater, Transportation, Water Management)
- Debounced filter updates (500ms) for smooth map transitions
- Type-specific marker icons via `projectMarkerMap`
- Auto-fits view extent to visible project locations
- Text labels visible at higher zoom levels (minScale: 20000)

### Component Organization

**Feature-Based Structure:**
```
src/components/
├── map/
│   ├── ProjectsMap/         # Main ArcGIS map component
│   │   ├── index.tsx        # Map container with ref
│   │   ├── hooks.ts         # Map view setup, filtering, debouncing
│   │   ├── utils.ts         # Hit test utilities, marker icon map
│   │   └── test.tsx         # Vitest tests
│   ├── popup/
│   │   └── Popup/           # Project details popup overlay
│   │       ├── index.tsx    # Popup wrapper with motion
│   │       ├── components.tsx # PopupHeader, badges, phase, updates
│   │       ├── hooks.ts     # useHandlePopup, useGetProject
│   │       ├── utils.ts     # Icon mapping, phase descriptions, motion props
│   │       └── test.tsx     # Vitest tests
│   ├── title/
│   │   └── MapTitle/        # Title overlay when no selection
│   └── context.tsx          # MapCtx provider and reducer
├── containers/
│   ├── MapContainer/        # Composes map, popup, title, and options
│   └── MapOptionsContainer/ # Legend and filter controls
│       ├── index.tsx
│       ├── components.tsx   # Legend and Filter components
│       ├── hooks.ts         # useHandleMapOptionsContainer
│       ├── utils.ts
│       └── test.tsx
└── loading/
    └── Loading/             # Loading spinner component
```

**Component File Pattern:** Components use a consistent structure:
- `index.tsx` - Main component export
- `components.tsx` - Sub-components used only within this feature
- `hooks.ts` - Custom hooks specific to the component
- `utils.ts` - Helper functions
- `test.tsx` - Vitest tests (using Testing Library)

### Path Aliases

The project uses path aliases configured in both `vite.config.ts` and `tsconfig.json`:
```typescript
@/              → src/
@components/    → src/components/
@config/        → src/config/
@helpers/       → src/helpers/
@pages/         → src/pages/
@utils/         → src/utils/
@assets/        → src/assets/
@test/          → src/test/
```

### Data Model

**Key Entities:**
- **ProjectInterface** - Capital project with coordinates, budget, phases, milestones, updates
  - `projectId`, `name`, `projectDescription`, `type`, `manager`, `link`, `approvedBudget`
  - `xCoordinate`, `yCoordinate`, `uuid`
  - `Phases[]`, `Milestones[]`, `Updates[]`
- **UpdateInterface** - Project status update with timestamp
- **MilestoneInterface** - Project milestone with estimated and realized dates
- **Phase** - Project phase (Upcoming through Complete)

**Project Types:** Facilities, Parks, Stormwater, Transportation, Water Management

**Project Phases:** Upcoming, Planning, Design, Property Acquisition, Bidding & Award, Construction, Closeout, Complete

### Configuration

**Environment Handling:** The app uses a `NODE_ENV` constant in `src/config/index.ts` set to `'production'` by default. In development, change to `'development'` to use the dev API endpoint.

**Base Path:** The app is deployed at `/active-projects` subdirectory (see `vite.config.ts` base setting).

**Map Service:** Public ArcGIS map service at `https://publicmaps.franklintn.gov/arcgis/rest/services/Maps/Capital_Investment/MapServer`

### Animation

**Motion (Framer Motion):** Used for popup, title, and options animations with shared motion props for consistent enter/exit transitions.

### Testing

**Vitest + Testing Library** setup:
- Test files: `**/*.{test,spec}.{ts,tsx}` or `**/test.tsx`
- Setup file: `src/test/setup.ts`
- Mock API responses in `src/test/mocks/api.ts`
- Uses jsdom environment for DOM testing

## Standards

Follow the guides in `/opt/claude-standards/` for consistent code style and conventions:

- **Import Organization:** `/opt/claude-standards/IMPORT_ORGANIZATION.md`
- **React Conventions:** `/opt/claude-standards/REACT_CONVENTIONS.md`
- **TypeScript Style:** `/opt/claude-standards/TYPESCRIPT_STYLE.md`
- **Version Control:** `/opt/claude-standards/VERSION_CONTROL.md`
- **README Template:** `/opt/claude-standards/README_TEMPLATE.md`
