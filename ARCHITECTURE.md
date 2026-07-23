> [!IMPORTANT]
> **AI INSTRUCTION — MANDATORY MAINTENANCE RULE**
> This file is the single source of truth for project architecture.
> Whenever you (AI) make or assist with any code change — new file, deleted file, new route, new Redux slice, schema change, new dependency, new pattern, config change — you **must** update the relevant section(s) of this document in the same response/turn. No exceptions. Keep it current at all times.

# Architecture — Shree Ram Distributer Admin Panel

## Overview

React 19 SPA built with Vite. Deployed to GitHub Pages at `https://truthtable.github.io/admin/`.
Business domain: LPG gas cylinder distribution management — customers, deliveries, warehouse, purchases, expenses, attendance, reports.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router v7 (`HashRouter`) |
| State | Redux Toolkit + React Redux |
| UI | MUI Joy UI + MUI Material |
| Remote DB | Firebase Firestore + Firebase Realtime Database |
| Local DB | Dexie (IndexedDB wrapper) |
| HTTP | Axios (custom instance with interceptors) |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| PDF/Export | `@react-pdf/renderer`, `jspdf`, `html2pdf.js`, `react-to-print`, `react-csv` |
| Date | `dayjs`, `date-fns`, `air-datepicker` |
| Virtualization | `react-virtuoso`, `react-window` |
| Linting | ESLint 9 |
| Deploy | `gh-pages` |

---

## Project Structure

```
admin/
├── index.html                  # Entry HTML
├── vite.config.js              # Vite build config (base: /admin/, manual chunking)
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                # React root — mounts <App> with Redux <Provider>
    ├── App.jsx                 # Root component — auth gate + layout + routing
    ├── App.css
    ├── index.css
    ├── Constants.jsx           # App-wide constants
    ├── Tools.jsx               # Shared utility components/tools
    ├── firebase-config.jsx     # Firebase init — exports `db` (Firestore) and `realTimeDB`
    │
    ├── services/
    │   ├── Api.jsx             # Axios instance, all endpoint URLs, interceptors
    │   ├── add_delivery_service.jsx
    │   └── gas-services.jsx
    │
    ├── db/                     # Local persistence (IndexedDB via Dexie)
    │   ├── db.js               # `LocalDB` class — customer table schema (v3)
    │   └── users.js            # Saved login credentials store
    │
    ├── redux/                  # Redux slices and reducers
    │   ├── authSlice.js        # Auth — login, OTP verify, logout
    │   ├── billSlice.js        # Bill state
    │   ├── connectionSlice.js  # Network connection state
    │   ├── customerPaymentsUpdateOrCreate.js
    │   ├── actions/            # Thunk action creators
    │   ├── delivery/           # Gas delivery edit slice
    │   ├── localData/          # Local customers slice (IndexedDB sync)
    │   ├── purchase/           # Purchase data slice
    │   └── reducers/           # Feature reducers
    │       ├── customerReducers.js
    │       ├── deliverysReducer.js
    │       ├── expencesReducer.js
    │       ├── gasDeliveryReducer.js
    │       ├── gasReducer.js
    │       ├── plantsReducer.js
    │       ├── purchaseOrderItemReducer.js
    │       ├── purchaseOrderReducer.js
    │       ├── reportReducers.js
    │       ├── userReducer.js
    │       └── warehouseReducer.js
    │
    ├── state/                  # Redux store + legacy state hooks
    │   ├── store.js            # `configureStore` — wires all reducers
    │   ├── CheckLogin.jsx
    │   ├── Count.jsx
    │   ├── CustomerUpdate.jsx
    │   ├── Customers.jsx
    │   ├── DeliveryAPI.jsx
    │   ├── GasList.jsx
    │   ├── GetData.jsx
    │   ├── LoginAPI.jsx
    │   ├── SearchCustomer.jsx
    │   ├── UpdateDelivery.jsx
    │   ├── UpdateGas.jsx
    │   └── UpdateGasDelivery.jsx
    │
    ├── components/             # UI components
    │   ├── index.js            # Barrel exports (Header, Home, Sidebar)
    │   ├── Header.jsx          # Top header bar
    │   ├── Sidebar.jsx         # Collapsible icon sidebar with hover expand
    │   ├── Home.jsx            # Dashboard home page
    │   ├── Spacer.jsx
    │   ├── DateTimePickerField.tsx
    │   ├── ExportCSV.jsx
    │   ├── ExportODS.jsx
    │   ├── attendance/
    │   │   └── Attendance.jsx  # Staff attendance management
    │   ├── class/              # Shared class components
    │   ├── edit/               # Edit dialogs/forms
    │   ├── expense/
    │   │   └── ExpensesPage.jsx
    │   ├── report/             # Report sub-components
    │   ├── table/              # Generic table components
    │   └── view/               # Full-page feature views
    │       ├── ViewCustomer.jsx
    │       ├── DeliveryHistory.jsx
    │       ├── DeliveryBoyDetails.jsx
    │       ├── GasUi.jsx
    │       ├── GasEditUi.jsx
    │       ├── GasDataView.jsx
    │       ├── Expences.jsx
    │       ├── Purchase.jsx
    │       ├── AddPurchaseUI.jsx
    │       ├── Warehouse.jsx
    │       └── Report.jsx
    │
    ├── crud/                   # CRUD form components
    │   ├── index.js            # Barrel exports
    │   ├── Admin/
    │   ├── DeliveryHistory/
    │   ├── GasCylinders/
    │   ├── addDeliveryBoy/
    │   ├── customer/
    │   │   ├── InsertCustomer.jsx
    │   │   └── UpdateCustomer.jsx
    │   ├── report/
    │   ├── wherehouse/
    │   └── crud-css/
    │
    ├── helpers.jsx/            # Shared helper functions
    │   └── Validation.jsx
    ├── lib/
    │   └── utils.ts            # Utility functions
    └── assets/                 # Static assets (images, icons)
```

---

## Authentication Flow

```
User opens app
  │
  ├── navigator.onLine === false  →  Offline screen
  │
  ├── sessionStorage.authToken exists  →  Authenticated app (with Sidebar + Routes)
  │
  ├── URL contains "/report"  →  Public report view (no auth)
  │
  ├── sessionStorage.otpToken exists  →  OTP verification screen
  │        User enters OTP → POST /api/verify-otp
  │        Success → set authToken, reload
  │
  └── No tokens  →  Login screen
           User enters username/password → POST /api/token
           Success → set otpToken, show OTP screen
```

**Token storage:**
- `sessionStorage.otpToken` — temporary token after credential check, used until OTP verified
- `sessionStorage.authToken` — full auth token after OTP; attached as `Bearer` on every Axios request
- Saved logins stored in Dexie `users` table (username + encrypted/plain password) for quick re-login

**Auto-logout:** Axios response interceptor removes both tokens and reloads on HTTP 401.

---

## Routing

Uses `HashRouter` (required for GitHub Pages static hosting).

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Dashboard |
| `/admin/` | `Home` | Dashboard (alias) |
| `/admin/gasUi` | `GasUi` | Gas cylinder overview |
| `/admin/readWherehouse` | `Warehouse` | Warehouse stock |
| `/admin/deliveryHistory` | `DeliveryHistory` | Delivery records |
| `/admin/ViewCustomer` | `ViewCustomer` | Customer list + detail |
| `/admin/readDeliveryBoy` | `DeliveryBoyDetails` | Delivery boy profiles |
| `/admin/purchase` | `Purchase` | Purchase orders |
| `/admin/expense` | `Expences` | Expense tracking |
| `/admin/attendance` | `Attendance` | Staff attendance |
| `/admin/report` | `Report` | Bills & reports (also public) |

> **Note:** `Expense` and `Attendance` routes are hidden in sidebar in **production** builds. Visible only in `development` mode.

---

## State Management

Redux store configured in [`src/state/store.js`](src/state/store.js).

### Store Slices

| Key | Source | Description |
|---|---|---|
| `loginV2` | `redux/authSlice.js` | Auth state — login, OTP, errors |
| `connections` | `redux/connectionSlice.js` | Online/offline connection status |
| `bill` | `redux/billSlice.js` | Bill generation state |
| `customer` | `redux/reducers/customerReducers.js` | Customer list (new) |
| `customers` | `state/Customers.jsx` | Customer list (legacy) |
| `localCustomers` | `redux/localData/localCustomers.js` | IndexedDB-synced customer cache |
| `customerPaymentsUpdateOrCreate` | `redux/customerPaymentsUpdateOrCreate.js` | Payment upserts |
| `delivery` | `state/DeliveryAPI.jsx` | Delivery data (legacy) |
| `deliverys` | `redux/reducers/deliverysReducer.js` | Delivery list (new) |
| `modifyGasDelivery` | `redux/delivery/gasEditDelivery.js` | Gas delivery edit |
| `gasDelivery` | `redux/reducers/gasDeliveryReducer.js` | Gas delivery (new) |
| `gasDeliverys` | `state/UpdateGasDelivery.jsx` | Gas delivery (legacy) |
| `gasList` | `redux/reducers/gasReducer.js` | Gas cylinders (new) |
| `gas` | `state/GasList.jsx` | Gas data (legacy) |
| `purchaseOrders` | `redux/reducers/purchaseOrderReducer.js` | Purchase orders |
| `purchaseOrderItems` | `redux/reducers/purchaseOrderItemReducer.js` | Purchase order items |
| `purchaseData` | `redux/purchase/purchaseData.js` | Purchase aggregate data |
| `warehouses` | `redux/reducers/warehouseReducer.js` | Warehouse stock |
| `plants` | `redux/reducers/plantsReducer.js` | Plant/depot data |
| `expence` | `redux/reducers/expencesReducer.js` | Expenses |
| `reports` | `redux/reducers/reportReducers.js` | Reports data |
| `user` | `redux/reducers/userReducer.js` | Current user profile |
| `updateCustomer` | `state/CustomerUpdate.jsx` | Customer update state |
| `updateDeliveryData` | `state/UpdateDelivery.jsx` | Delivery update state |
| `updateGas` | `state/UpdateGas.jsx` | Gas update state |
| `count` | `state/Count.jsx` | Dashboard counts |
| `getData` | `state/GetData.jsx` | Generic data fetch |
| `search_customer` | `state/SearchCustomer.jsx` | Customer search |
| `checkLogin` | `state/CheckLogin.jsx` | Login validation (legacy) |
| `login` | `state/LoginAPI.jsx` | Login (legacy) |

> **Note:** Several slices exist in both `state/` (legacy hooks) and `redux/reducers/` (newer). Migration is in progress.

---

## Data Layer

### Remote — Firebase

Configured in [`src/firebase-config.jsx`](src/firebase-config.jsx):
- **Firestore** (`db`) — structured document storage
- **Realtime Database** (`realTimeDB`) — live sync data

Firebase project: `shriram-distributors` (asia-southeast1 region).

### Remote — REST API

Base URLs (configured in [`src/services/Api.jsx`](src/services/Api.jsx)):
- **Production:** `https://shree-ram-distributor.indiegrow.in/`
- **Development:** `http://localhost:8000/`

All requests go through a shared Axios instance with:
- Bearer token injection from `sessionStorage`
- Automatic 401 handling (clears session, reloads)

Key endpoint groups:
- `POST /api/token` — login
- `POST /api/verify-otp` — OTP verification
- `GET /api/customer_data-v2` — customers
- `GET /api/delivery_history` — deliveries
- `GET /api/gas_cylinder_data` — gas cylinders
- `GET /api/warehouse_index` — warehouse
- `GET /api/courier_boy_info` — delivery boys
- `GET /api/count` — dashboard counts
- `POST/PUT /api/customer_payments_update_or_create` — payment upserts
- `PUT /api/updateOrCreateOrDelete/` — generic update/create/delete

### Local — IndexedDB (Dexie)

`LocalDB` (in [`src/db/db.js`](src/db/db.js)) — schema v3:
- `customer` table: `id, user_id, name, aadhar_card_no, diaryNumber, address, phone_no, totalBalance`

Used for offline customer cache and syncing with remote.

`users` table (in [`src/db/users.js`](src/db/users.js)):
- Stores saved login credentials for quick re-login UI.

---

## Build & Deployment

```bash
npm run dev        # Vite dev server (host: true, ngrok-compatible)
npm run build      # Vite production build → dist/
npm run deploy     # build + gh-pages push to GitHub Pages
```

**Vite build optimizations:**
- Target: `esnext`
- Minifier: `esbuild`
- CSS code splitting enabled
- Manual `node_modules` chunking by package name (avoids monolithic vendor bundle)
- Base path: `/admin/`

**Deploy target:** `https://truthtable.github.io/admin/`

---

## Key Patterns

### Auth Gate (App.jsx)
Three-state conditional render: offline screen / authenticated layout / unauthenticated (login or OTP screen). No React Router guard components — gating happens directly in `App.jsx`.

### Sidebar Expand on Hover
Sidebar starts icon-only (collapsed). On `mouseEnter`, labels animate in via CSS `width` + `opacity` transition. On `mouseLeave`, labels hide. Mobile: toggled via `openSidebarToggle` prop.

### Dev-only Routes
`Expense` and `Attendance` sidebar items are filtered out in production builds via `process.env.NODE_ENV` check.

### PDF/Export
Multiple export strategies co-exist:
- `@react-pdf/renderer` — React-rendered PDF
- `jspdf` + `html2canvas` / `html2pdf.js` — HTML-to-PDF capture
- `react-to-print` — browser print dialog
- `react-csv` — CSV export
- `xlsx` — Excel export

### Report Public Access
`/admin/report` is accessible without `authToken` if the URL contains `/report` — allows sharing report links externally.

---

## Environment Notes

- No `.env` files observed; dev/prod URL switch is done via `process.env.NODE_ENV` in `Api.jsx`.
- Firebase credentials are hardcoded in `firebase-config.jsx` (public Firebase config — standard practice for client-side Firebase apps).
- Redux DevTools enabled in non-production builds.
