# Shree Ram Distributor — Admin Panel

> React 19 SPA — admin dashboard for LPG gas cylinder distribution management.
> Deployed at **https://truthtable.github.io/admin/**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router v7 (`HashRouter`) |
| State | Redux Toolkit + React Redux |
| UI | MUI Joy UI + MUI Material |
| Remote DB | Firebase Firestore + Realtime Database |
| Local DB | Dexie (IndexedDB) — offline customer cache |
| HTTP | Axios with Bearer token injection + 401 auto-logout |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| PDF/Export | `@react-pdf/renderer`, `jspdf`, `html2pdf.js`, `react-to-print`, `react-csv`, `exceljs` |
| Dates | `dayjs`, `date-fns`, `air-datepicker` |
| Virtualization | `react-virtuoso`, `react-window` |
| Deploy | `gh-pages` → GitHub Pages |

---

## Key Features

- **Dashboard** — delivery counts, summaries
- **Customer management** — CRUD, balance tracking, payment upserts
- **Delivery management** — history, bulk ops, gas delivery edit
- **Gas cylinders** — catalog, warehouse stock (auto-adjusted on delivery/purchase)
- **Purchase orders** — PO + line items, KG totals
- **Delivery boys** — profiles, expense tracking, attendance
- **Reports** — public shareable report view (no auth required)
- **Offline support** — IndexedDB customer cache via Dexie
- **PDF/Excel/CSV export** — multiple export strategies

---

## Running Locally

```bash
npm install
npm run dev        # Vite dev server (HMR, host: true)
```

API target switches automatically:
- **Development:** `http://localhost:8000/`
- **Production:** `https://shree-ram-distributor.indiegrow.in/`

---

## Build & Deploy

```bash
npm run build      # Vite production build → dist/
npm run deploy     # build + push to GitHub Pages
```

---

## Authentication

Three-state gate in `App.jsx`:
1. Offline → offline screen
2. `sessionStorage.authToken` present → authenticated layout
3. No token → login → OTP → `authToken` set

Saved logins stored in Dexie `users` table for quick re-login.

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `Home` | Dashboard |
| `/admin/gasUi` | `GasUi` | Gas cylinder overview |
| `/admin/readWherehouse` | `Warehouse` | Warehouse stock |
| `/admin/deliveryHistory` | `DeliveryHistory` | Delivery records |
| `/admin/ViewCustomer` | `ViewCustomer` | Customer list |
| `/admin/readDeliveryBoy` | `DeliveryBoyDetails` | Delivery boy profiles |
| `/admin/purchase` | `Purchase` | Purchase orders |
| `/admin/expense` | `Expences` | Expense tracking (dev only) |
| `/admin/attendance` | `Attendance` | Staff attendance (dev only) |
| `/admin/report` | `Report` | Bills & reports (public) |

---

## Project Structure

```
src/
├── main.jsx           # React root
├── App.jsx            # Auth gate + layout + routing
├── services/Api.jsx   # Axios instance + all API endpoints
├── firebase-config.jsx
├── db/                # Dexie IndexedDB schemas
├── redux/             # Redux slices (new)
├── state/             # Legacy Redux slices
├── components/        # UI components (Header, Sidebar, views)
├── crud/              # CRUD form components
└── helpers.jsx/       # Validation helpers
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for full Redux store, data layer, and pattern details.

---

## AI Agents

This project uses the `maintain-architecture` skill.
Whenever any route, Redux slice, dependency, or pattern changes, update [ARCHITECTURE.md](ARCHITECTURE.md) in the same turn.
