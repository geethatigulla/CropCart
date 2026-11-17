# CropCart

CropCart is a front-end prototype of an agricultural marketplace that connects farmers directly with merchants and customers. Its landing page pitches AI price predictions, live crop auctions, quality grading, logistics and financing, and a role-based dashboard gives farmers a form to list crops for sale. The project was scaffolded with [Lovable](https://lovable.dev) (Vite + React + TypeScript + shadcn/ui).

> **Status: UI prototype.** There is no backend, database or real authentication yet. Login and registration are mocked in the browser, and all prices, auctions and predictions are hard-coded sample data. `AuthContext.tsx` notes that the mock auth "will be replaced with Supabase".

## Features

What the code currently does:

- **Landing page** (`/`) with animated sections:
  - Hero with a custom cursor effect on non-touch devices
  - Scrolling crop **price ticker** (static sample prices)
  - **Featured crops** cards with a tilt-on-hover effect
  - **Live auctions** with countdown timers and simulated, randomly changing bids
  - **AI price predictions**: a monthly price vs. predicted-price chart per crop (Wheat, Rice, Corn, Soybeans), from sample data
  - Call-to-action and footer
- **Header navigation** with Market, Logistics and Financing dropdown menus (placeholder links)
- **Mock authentication** (`/login`, `/register`): registration lets you pick a role (Farmer, Merchant or Customer). The "user" is stored in `localStorage`, and no password is checked.
- **Protected, role-aware routes**: `/dashboard` shows a different dashboard for farmers, merchants and customers, and `/farmer/list-crop` is only for the `farmer` role.
- **List a crop form** (`/farmer/list-crop`): name, description, price, quantity, unit, quality and location. On submit it logs the data to the console, shows a success toast and returns to the dashboard; nothing is saved.
- Shared TypeScript types for `User`, `Product` and `Order` (`src/types/index.ts`) as groundwork for a future backend.

## Tech stack

- React 18 + TypeScript, built with Vite 5 (`@vitejs/plugin-react-swc`)
- React Router 6, TanStack React Query (provider only, no queries yet)
- Tailwind CSS 3 with `tailwindcss-animate` and `@tailwindcss/typography`, shadcn/ui (Radix UI) components, lucide-react icons
- react-hook-form, Zod and Recharts (installed with the shadcn/ui set)
- ESLint 9 with `typescript-eslint`
- `lovable-tagger` (dev-only Vite plugin used by the Lovable editor)

## Project structure

```
CropCart/
├── index.html                 # Vite entry (also loads the Lovable gptengineer.js script)
├── vite.config.ts             # Dev server on port 8080, "@" alias → src/
├── tailwind.config.ts         # Theme incl. custom "cropgreen" colours
├── components.json            # shadcn/ui config
├── public/                    # favicon, placeholder.svg, robots.txt
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                # Providers + routes
    ├── contexts/AuthContext.tsx   # Mock login/register/logout (localStorage)
    ├── components/
    │   ├── auth/ProtectedRoute.tsx  # Redirects to /login; optional role check
    │   ├── home/              # Hero, PriceTicker, FeaturedCrops, LiveAuctions, AIPredictions, CallToAction
    │   ├── layout/            # Header, Footer
    │   └── ui/                # shadcn/ui components
    ├── pages/
    │   ├── Index.tsx          # Landing page
    │   ├── auth/Login.tsx, auth/Register.tsx
    │   ├── dashboard/Dashboard.tsx  # Role-based dashboard
    │   ├── farmer/ListCrop.tsx      # Crop listing form
    │   └── NotFound.tsx
    ├── hooks/                 # use-mobile, use-toast
    ├── lib/utils.ts
    └── types/index.ts         # User, Product, Order types
```

## Getting started

### Prerequisites

- Node.js 18+ and npm (a `bun.lockb` is also committed, so Bun works too)

### Install and run

```bash
npm install
npm run dev        # http://localhost:8080
```

Other scripts:

```bash
npm run build      # production build into dist/
npm run build:dev  # build in development mode
npm run preview    # serve the production build
npm run lint       # ESLint
```

No environment variables are required.

### Trying it out

1. Open `/register`, enter any email and password, choose a role and submit. You will be "logged in" as that role.
2. Open `/dashboard` to see the role-specific dashboard. As a farmer, use **List New Crop**.
3. **Logout** clears the stored user. Logging in through `/login` always signs you in as a `farmer`.

## Known limitations

- No backend or persistence: listings, orders and users are not saved anywhere.
- Mock login accepts any credentials and **logs the email and password to the browser console** (`AuthContext.tsx`, `Login.tsx`). Remove these logs before connecting real auth.
- Several links point to routes that do not exist yet and fall through to the 404 page: `/forgot-password`, `/unauthorized`, `/farmer/my-listings`, `/farmer/orders`, and all `/merchant/*` and `/customer/*` dashboard actions. Most header/footer links are `href="#"` placeholders.
- The `admin` role exists in the types but has no UI.
- `index.html` still has the default Lovable title (`crop-cart-ai-bloom`), description and social-preview image.
