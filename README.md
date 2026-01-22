# Holiday Calendar 2026

A holiday calendar viewer for multiple organizations and cities.

## Overview

A React-based web application that displays holidays for different organizations and locations in 2026. Users can browse holidays by organization, city, and view them in either calendar or list format.

## Key Features

- **Multi-Organization Support** - View holidays for different organizations
- **Multi-City Support** - Different holiday schedules for various cities
- **Dual View Modes** - Switch between calendar and list views
- **Holiday Classification** - Holidays marked as general or optional
- **Theme Support** - Toggle between dark and light themes
- **Optional Holiday Filter** - Show/hide optional holidays with persistent storage
- **Interactive UI** - Smooth animations and modern glass-morphism design

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **date-fns** - Date utilities
- **Lucide React** - Icons

## Project Structure

```
├── components/       - React components (Calendar, ListView, NavBar, etc.)
├── utils/           - Utility functions
├── constants.ts     - Holiday data
├── types.ts         - TypeScript definitions
└── App.tsx          - Main application component
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
