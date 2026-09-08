-- 1Fi Marketplace Database Schema

-- Enable Foreign Keys
PRAGMA foreign_keys = ON;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
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
  specifications TEXT, -- JSON string of specs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Variants Table
CREATE TABLE IF NOT EXISTS variants (
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
  gallery_images TEXT, -- JSON array of image URLs
  is_default BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- EMI Plans Table
CREATE TABLE IF NOT EXISTS emi_plans (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  variant_id TEXT, -- NULL means applicable to all variants or base
  tenure_months INTEGER NOT NULL,
  interest_rate REAL NOT NULL, -- e.g. 0.0 or 10.5
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

-- Mutual Fund EMI Applications / Orders Table
CREATE TABLE IF NOT EXISTS applications (
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

-- Create Indexes for High Performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_variants_product ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_emi_plans_product ON emi_plans(product_id);
CREATE INDEX IF NOT EXISTS idx_emi_plans_variant ON emi_plans(variant_id);
