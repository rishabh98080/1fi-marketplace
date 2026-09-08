# 1Fi Marketplace — Responsive Full-Stack Web Application

A full-stack, responsive web application implementing the **1Fi Marketplace** inside the 1Fi Shop experience, built to evaluate product understanding, visual design excellence, component reusability, and dynamic backend architecture.

Developed in compliance with the **1Fi Marketplace 10-Phase Plan** and both the **SDE Intern** and **SDE-1** assignment specifications.

---

## Key Highlights

1. **Dynamic Architecture**: Zero hardcoding of product, variant, pricing, category, or EMI data inside UI components. All business data originates from a relational database and is served via RESTful APIs.
2. **Fintech Design Language**: Authentic 1Fi purple branding (`#6222E4` / `#6929DF`), soft purple surfaces, elevated cards, and subtle micro-interactions.
3. **Shop Tabs**: Implements the 3 required Shop options:
   - **Top Brands**: Blank/placeholder state as specified by the assignment.
   - **Nearby Stores**: Blank/placeholder state as specified by the assignment.
   - **1Fi Marketplace**: Fully designed, interactive, and responsive fintech marketplace.
4. **Exact Reference Screen Match**: Pixel-faithful implementation of the reference screen (`iPhone 17 Pro` at `₹1,27,400` with 3 finishes and 7 mutual-fund backed EMI tiers).
5. **Mutual Fund Backed EMI Engine**: Supports both 0% No-Cost EMI and reducing interest plans with dynamic collateral lien margin calculations (1.25x pledge) and instant paperless approval flow.

---

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, React Router 6, Canvas Confetti.
- **Backend**: Node.js, Express, better-sqlite3 (relational SQL database), Morgan, CORS, Jest, Supertest.
- **Database**: SQLite (with complete DDL schema, foreign keys, indexes, and realistic seed data).

---

## System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        1Fi React Client (Vite)                         │
│  ┌─────────────────────────┐     ┌──────────────────────────────────┐  │
│  │ Shop Navigation (Tabs)  │     │ 1Fi Marketplace Shell & Hero     │  │
│  │ - Top Brands (Blank)    │     ├──────────────────────────────────┤  │
│  │ - Nearby Stores (Blank) │     │ Category Rail & Filter Bar       │  │
│  │ - 1Fi Marketplace       │     ├──────────────────────────────────┤  │
│  └─────────────────────────┘     │ Product Catalog & Details (EMI)  │  │
│                                  └──────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ Dynamic HTTP Calls (Fetch / Proxy)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    Marketplace Service & Custom Hooks                  │
│       (useProducts, useProductDetails, marketplaceApi)                 │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ REST API (/api/*)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Node.js / Express REST Backend                     │
│  ┌───────────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │   Routes & Routers    │  │ Error Middleware │  │ Controllers     │ │
│  └───────────┬───────────┘  └────────┬─────────┘  └────────┬────────┘ │
│              └───────────────────────┼─────────────────────┘          │
│                                      ▼                                │
│                     Dynamic EMI & Lien Calculator                     │
└──────────────────────────────────────┬─────────────────────────────────┘
                                       │ SQL Statements
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     SQLite Relational Database                         │
│   (categories, products, variants, emi_plans, applications/orders)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

```sql
-- Categories
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category_id TEXT NOT NULL,
  description TEXT,
  mrp INTEGER NOT NULL,
  base_price INTEGER NOT NULL,
  badge TEXT,
  rating REAL DEFAULT 4.8,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT 0,
  is_best_seller BOOLEAN DEFAULT 0,
  is_best_deal BOOLEAN DEFAULT 0,
  specifications TEXT, -- JSON format
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Variants
CREATE TABLE variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  storage TEXT,
  ram TEXT,
  price INTEGER NOT NULL,
  mrp INTEGER NOT NULL,
  stock INTEGER DEFAULT 10,
  image_url TEXT NOT NULL,
  gallery_images TEXT,
  is_default BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- EMI Plans
CREATE TABLE emi_plans (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  variant_id TEXT,
  tenure_months INTEGER NOT NULL,
  interest_rate REAL NOT NULL,
  monthly_amount INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  cashback_amount INTEGER DEFAULT 0,
  processing_fee INTEGER DEFAULT 0,
  approval_type TEXT DEFAULT 'Instant MF Lien',
  min_mf_pledge INTEGER NOT NULL,
  is_recommended BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES variants(id) ON DELETE CASCADE
);

-- Applications / Orders
CREATE TABLE applications (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  emi_plan_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pan_number TEXT,
  mf_folio_number TEXT,
  mf_portfolio_amount INTEGER NOT NULL,
  pledged_amount INTEGER NOT NULL,
  monthly_emi INTEGER NOT NULL,
  tenure_months INTEGER NOT NULL,
  status TEXT DEFAULT 'APPROVED',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES variants(id),
  FOREIGN KEY (emi_plan_id) REFERENCES emi_plans(id)
);
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/categories` | List all product categories with product counts |
| `GET` | `/api/products` | Dynamic search, category, brand, price filtering & sorting |
| `GET` | `/api/products/:slugOrId` | Product details, all variants, specs, and reference EMI plans |
| `GET` | `/api/products/:id/emi-plans` | Dynamic EMI recalculation for custom principal/variant |
| `POST` | `/api/applications` | Submit EMI application backed by mutual funds with pledge validation |
| `GET` | `/api/applications/:id` | Retrieve application by ID |

---

## Quick Start & Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Database
```bash
npm run seed
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Start Development Servers (Backend + Frontend)
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Backend API runs at: `http://localhost:5000`

---

## Swapping SQLite with PostgreSQL / MySQL

The database connection and query logic in `server/src/db/` is isolated from the rest of the application. To connect to PostgreSQL or MySQL:
1. Replace `better-sqlite3` with `pg` (node-postgres) or `prisma` / `knex`.
2. Update connection configuration in `server/src/db/index.js` using `DATABASE_URL`.
3. The SQL schema in `server/src/db/schema.sql` uses standard ANSI SQL types (`TEXT`, `INTEGER`, `REAL`, `DATETIME`, `FOREIGN KEY`), requiring minimal modification for PostgreSQL.

---

## Project Structure

```text
├── 1Fi_Marketplace_Phase_Plan/   # Original 10-Phase specification documents
├── client/                       # React 18 + Vite + Tailwind frontend
│   ├── public/                   # 1Fi branding logo and reference image assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Header, Footer, SkeletonLoader, ErrorState
│   │   │   ├── marketplace/      # HeroBanner, CategoryRail, ProductCard, ProductGrid, FilterSidebar, ProceedModal
│   │   │   └── shop/             # ShopNavigation (Top Brands, Nearby Stores, 1Fi Marketplace)
│   │   ├── hooks/                # useProducts, useProductDetails
│   │   ├── pages/                # ShopPage, ProductDetailPage
│   │   ├── services/             # marketplaceApi.js
│   │   └── styles/               # index.css (Tailwind & design system tokens)
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                       # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/          # productController, categoryController, applicationController
│   │   ├── db/                   # schema.sql, seed.js, index.js
│   │   ├── routes/               # api.js
│   │   ├── services/             # emiCalculator.js
│   │   └── server.js             # Express entry point
│   ├── tests/                    # api.test.js (Jest & Supertest suite)
│   └── package.json
├── package.json                  # Root orchestration
└── README.md
```
