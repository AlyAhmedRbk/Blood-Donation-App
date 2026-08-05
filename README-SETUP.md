# Blood Donation Management System - Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Donor | donor@lifeblood.com | Password123! |
| Recipient | recipient@lifeblood.com | Password123! |
| Hospital | hospital@lifeblood.com | Password123! |
| Admin | admin@lifeblood.com | Admin123! |

## Troubleshooting

### If you get "Failed to resolve import" errors:

1. Delete `node_modules` folder:
```bash
rm -rf node_modules
```

2. Clear npm cache (optional):
```bash
npm cache clean --force
```

3. Reinstall dependencies:
```bash
npm install
```

4. Restart dev server:
```bash
npm run dev
```

### If port 5173 is already in use:

```bash
# Use a different port
npm run dev -- --port 3000
```

## Tech Stack

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router DOM v6** - Routing
- **Zustand** - State management
- **TanStack React Query** - Data fetching
- **Framer Motion** - Animations
- **React Hook Form + Zod** - Form validation
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Project Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, Layout
│   └── ui/          # Button, Card, Modal, Badge, etc.
├── pages/           # Landing, Login, Dashboard, etc.
├── store/           # Zustand state stores
├── hooks/           # Custom React hooks
├── data/            # Mock data
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
└── validations/     # Zod schemas
```

## Features

- ✅ Public landing page with hero, stats, search
- ✅ User authentication (login/register)
- ✅ Role-based dashboards (Donor, Recipient, Hospital, Admin)
- ✅ Blood request feed with filters
- ✅ Pledge-to-donate functionality
- ✅ User profiles & donor cards
- ✅ Notification system
- ✅ Responsive mobile-first design
- ✅ Smooth animations with Framer Motion
- ✅ Mock data for full offline experience

## Build for Production

```bash
npm run build
npm run preview
```
