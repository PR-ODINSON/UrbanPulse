# UrbanPulse Command Center

UrbanPulse is a React + Vite smart-city operations platform with:

- A premium landing experience
- A multi-page command-center dashboard
- Live simulation updates for operations metrics
- Multi-city seed data support (Delhi default, plus other major Indian cities)

## Tech Stack

- React
- Vite
- React Router
- Leaflet + OpenStreetMap / CARTO tiles
- Recharts
- CSS (global styles + landing styles + shared page system)

## Key Features

- **Landing page** with editorial hero + animated city canvas
- **Dashboard and internal modules** for:
  - Traffic
  - Environment
  - Utilities
  - Emergency
  - Reports
  - Analytics
  - Admin
  - Settings
- **Map interaction**
  - OSM-based mapping (no Mapbox required)
  - City markers and city switching in dashboard
  - Emergency dark map tiles
- **Live simulation**
  - Periodic metric/incident updates
  - Dynamic city-health score and insight text
- **Premium loading overlay**
  - Enhanced loading and retry states

## Project Structure

```text
src/
  components/
    common/
    dashboard/
    landing/
    layout/
  context/
    AppContext.jsx
  hooks/
    useSimulation.js
    useLiveData.js
    useScrollReveal.ts
  pages/
    LandingPage.tsx
    Dashboard.jsx
    Traffic.jsx
    Environment.jsx
    Utilities.jsx
    Emergency.jsx
    Reports.jsx
    Analytics.jsx
    Admin.jsx
    Settings.jsx
  services/
    simulation.js
    mapService.js
  styles/
    global.css
    pages.css
    landing/landing.css
```

## Multi-City Data

`src/services/simulation.js` contains city seed metadata in `CITY_SEEDS` and options in `CITY_OPTIONS`.

Included cities:

- Delhi
- Mumbai
- Bengaluru
- Hyderabad
- Chennai
- Kolkata
- Pune
- Ahmedabad
- Jaipur
- Indore
- Bhopal
- Lucknow

Dashboard defaults to **Delhi** and can switch city context from the map card controls.

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run preview` - preview production output

## Notes

- This project currently uses simulation data and UI interactions designed for rapid prototyping.
- Routing and module structure are already in place for integrating real APIs, sockets, and role-aware backend data later.
- JSX and TSX files are both used and supported in the current setup.
