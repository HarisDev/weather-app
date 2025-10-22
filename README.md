# Clean Weather

A modern weather application built with React, TanStack Router, and Tailwind CSS.

## Features

- **Geolocation Detection**: Automatically detects user location using multiple fallback methods:
  - Browser Geolocation API
  - GeoIP lookup
  - Timezone-based approximation
- **Weather Display**: Shows current weather conditions and 4-day forecast
- **Recent Searches**: Track and revisit recent weather searches
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: React 19
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

### Testing

```bash
npm run test
```

## Key Features

### Geolocation Hook

The `useGeoLocation` hook implements a three-tier fallback strategy:

1. **Browser Geolocation API**: Attempts to get precise location from the browser
2. **GeoIP Lookup**: Falls back to IP-based geolocation with caching
3. **Timezone Approximation**: Uses browser timezone as a last resort
