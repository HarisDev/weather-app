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

### Prerequisites

1. Copy `.env.example` to `.env` and add your API keys:

   ```bash
   cp .env.example .env
   ```

2. Get API keys from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### Run with Docker (Recommended)

```bash
docker-compose up --build
```

App available at `http://localhost:3000`

### Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Other Commands

```bash
npm run build   # Build for production
npm run serve   # Preview production build
npm run test    # Run tests
```

## Tests

The project includes 3 types of tests with test coverage:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Feature-level testing with mocked dependencies
- **E2E Tests**: End-to-end tests using Playwright

Run tests with `npm run test`

Run E2E tests with `npm run test:e2e`
