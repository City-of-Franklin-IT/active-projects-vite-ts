# Active Projects Map Viewer

Interactive map application displaying active capital investment projects for the City of Franklin, Tennessee. Built for the Engineering Department to visualize and track CIP (Capital Investment Program) projects across the city.

## Live Application
[https://apps.franklintn.gov/active-projects/](https://apps.franklintn.gov/active-projects/)

## Features

- **Interactive ArcGIS Map**: Visualize project locations with multiple basemap options
- **Project Details**: View comprehensive project information including:
  - Project descriptions and types (Facilities, Parks, Stormwater, Transportation, Water Management)
  - Project managers and approved budgets
  - Current project phases (Upcoming, Planning, Design, Property Acquisition, Bidding & Award, Construction, Closeout, Complete)
  - Milestones with estimated and realized dates
  - Project updates and links
- **Real-time Filtering**: Filter projects by type and phase with debounced updates
- **Responsive Design**: Full-screen map interface optimized for all devices

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Mapping**: ArcGIS JavaScript API (@arcgis/core)
- **Styling**: Tailwind CSS 4 + DaisyUI
- **State Management**: React Query for server state
- **Routing**: React Router 7
- **Animation**: Motion (Framer Motion)
- **Testing**: Vitest + React Testing Library
- **Error Handling**: React Error Boundary

## Project Structure

```
src/
├── components/
│   ├── map/
│   │   ├── ProjectsMap/      # Main map component with ArcGIS integration
│   │   ├── popup/Popup/      # Project detail popups
│   │   └── title/MapTitle/   # Map title display
│   ├── containers/
│   │   ├── MapContainer/     # Map layout container
│   │   └── MapOptionsContainer/ # Filter and options UI
│   └── loading/Loading/      # Loading states
├── pages/Home/               # Main application page
├── context/App/              # Application state and API actions
├── utils/                    # Utility components and functions
└── config/                   # API endpoints and configuration
```

## API

**Production API**: https://api.franklin-gov.com/api/v2/eng<br>
**API Proxy**: https://dev.franklintn.gov/api/v2/eng<br>
**API Documentation**: [API Docs](https://dev.franklintn.gov/api/v2/eng/api-docs)<br>
**API Source**: [GitHub - eng-api-ts](https://github.com/City-of-Franklin-IT/eng-api-ts)

## Database
`[COFDBV06].[cip]`

## Development

```bash
# Install dependencies
npm install

# Run development server (port 5006)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment

```bash
# Deploy to production server
npm run deploy
```

Copies the built application to `andrew@cofasv03:/home/andrew/apps/builds/active-projects-vite-ts`
