const { db, initDb } = require('./index');
const { generateStandardPlans } = require('../services/emiCalculator');

function seedDatabase() {
  console.log('🔄 Initializing database schema...');
  initDb();

  // Clear existing data cleanly
  db.exec(`
    DELETE FROM applications;
    DELETE FROM emi_plans;
    DELETE FROM variants;
    DELETE FROM products;
    DELETE FROM categories;
  `);

  console.log('🌱 Seeding categories...');
  const insertCategory = db.prepare(`
    INSERT INTO categories (id, name, slug, icon, description, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const categories = [
    { id: 'cat_all', name: 'All Categories', slug: 'all', icon: 'LayoutGrid', description: 'Browse all marketplace electronics', order: 0 },
    { id: 'cat_smartphones', name: 'Smartphones', slug: 'smartphones', icon: 'Smartphone', description: 'Flagship smartphones with 0% MF EMI', order: 1 },
    { id: 'cat_laptops', name: 'Laptops', slug: 'laptops', icon: 'Laptop', description: 'High performance productivity & gaming laptops', order: 2 },
    { id: 'cat_audio', name: 'Audio', slug: 'audio', icon: 'Headphones', description: 'Premium noise-cancelling headphones & earbuds', order: 3 },
    { id: 'cat_tablets', name: 'Tablets', slug: 'tablets', icon: 'Tablet', description: 'Creative tablets and iPads', order: 4 },
    { id: 'cat_wearables', name: 'Wearables', slug: 'wearables', icon: 'Watch', description: 'Smartwatches and fitness trackers', order: 5 }
  ];

  categories.forEach(cat => {
    insertCategory.run(cat.id, cat.name, cat.slug, cat.icon, cat.description, cat.order);
  });

  console.log('🌱 Seeding products matching 1Fi reference design...');
  const insertProduct = db.prepare(`
    INSERT INTO products (
      id, slug, name, brand, category_id, description, mrp, base_price,
      badge, rating, reviews_count, is_featured, is_best_seller, is_best_deal, specifications
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertVariant = db.prepare(`
    INSERT INTO variants (
      id, product_id, sku, color_name, color_hex, storage, ram,
      price, mrp, stock, image_url, gallery_images, is_default
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertEmiPlan = db.prepare(`
    INSERT INTO emi_plans (
      id, product_id, variant_id, tenure_months, interest_rate,
      monthly_amount, total_amount, cashback_amount, processing_fee,
      approval_type, min_mf_pledge, is_recommended
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // =========================================================================
  // 1. Featured Products - Item 1: Google Pixel 10 (or Pixel 9 Pro)
  // =========================================================================
  insertProduct.run(
    'prod_pixel_10',
    'google-pixel-10',
    'Google Pixel 10',
    'Google',
    'cat_smartphones',
    'Powered by next-generation Google Tensor G5 with advanced Gemini Pro AI, triple rear camera system with 30x Super Res Zoom, and 7 years of OS updates.',
    99999,
    89999,
    'NEW',
    4.8,
    420,
    1, // is_featured
    0,
    0,
    JSON.stringify({
      "Display": "6.3-inch Super Actua OLED, 1-120Hz, 3000 nits peak",
      "Processor": "Google Tensor G5 (3nm) with Titan M3 coprocessor",
      "Camera": "50MP wide + 48MP ultrawide + 48MP 5x telephoto",
      "Battery": "4700 mAh with 30W fast charging and Qi wireless"
    })
  );

  insertVariant.run(
    'var_pixel10_bay',
    'prod_pixel_10',
    'PIX10-BAY-128',
    'Bay Blue',
    '#9DB7D5',
    '128GB',
    '12GB',
    89999,
    99999,
    15,
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80']),
    1
  );

  generateStandardPlans(89999, 5000).forEach(plan => {
    insertEmiPlan.run(
      `emi_pixel10_${plan.tenureMonths}m`,
      'prod_pixel_10',
      'var_pixel10_bay',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  // =========================================================================
  // 2. Featured Products - Item 2: iPhone 17
  // =========================================================================
  insertProduct.run(
    'prod_iphone_17',
    'iphone-17',
    'iPhone 17',
    'Apple',
    'cat_smartphones',
    'Equipped with A19 Bionic, stunning Super Retina XDR display with Action Button, dual 48MP Fusion camera system, and all-day battery life.',
    89900,
    79900,
    'NEW',
    4.8,
    890,
    1, // is_featured
    0,
    0,
    JSON.stringify({
      "Display": "6.1-inch Super Retina XDR OLED, 2000 nits peak",
      "Processor": "Apple A19 Bionic with 16-core Neural Engine",
      "Camera": "Dual 48MP Fusion + 12MP Ultra Wide with Sensor-shift OIS",
      "Battery": "Up to 24 hours video playback"
    })
  );

  insertVariant.run(
    'var_iphone17_black',
    'prod_iphone_17',
    'IP17-BLK-128',
    'Midnight Black',
    '#1F2022',
    '128GB',
    '6GB',
    79900,
    89900,
    20,
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80']),
    1
  );

  generateStandardPlans(79900, 4000).forEach(plan => {
    insertEmiPlan.run(
      `emi_iphone17base_${plan.tenureMonths}m`,
      'prod_iphone_17',
      'var_iphone17_black',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  // =========================================================================
  // 3. Best Sellers - Item 1: iPhone 17 Pro Max / iPhone 17 Pro
  // (Exact match to reference image img-001.png)
  // =========================================================================
  const iphone17ProSpecs = JSON.stringify({
    "Display": "6.3-inch Super Retina XDR with ProMotion 120Hz",
    "Processor": "A19 Pro Bionic chip (3nm process)",
    "Rear Camera": "Triple 48MP Fusion Camera + 48MP Ultra Wide + 48MP 5x Telephoto",
    "Front Camera": "18MP TrueDepth Camera with autofocus",
    "Battery": "Up to 29 hours video playback, MagSafe fast charging",
    "Build": "Grade 5 Aerospace Titanium with Ceramic Shield front",
    "OS": "iOS 19",
    "MF Pledge Benefit": "Zero liquidation of mutual funds. Earn up to 14% annual MF returns while repaying."
  });

  insertProduct.run(
    'prod_iphone_17_pro',
    'apple-iphone-17-pro',
    'iPhone 17 Pro',
    'Apple',
    'cat_smartphones',
    'The pinnacle of smartphone innovation featuring Grade 5 Titanium, A19 Pro performance, advanced tetraprism 5x optical zoom, and mutual fund-backed zero-cost EMI plans.',
    134900,
    127400,
    'NEW',
    4.9,
    1482,
    1,
    1, // is_best_seller
    0,
    iphone17ProSpecs
  );

  // iPhone 17 Pro Variants matching reference screen finishes:
  const iphoneVariants = [
    {
      id: 'var_iphone17pro_orange_256',
      sku: 'IP17P-ORG-256',
      colorName: 'Sunset Orange',
      colorHex: '#E67332',
      storage: '256GB',
      ram: '8GB',
      price: 127400,
      mrp: 134900,
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      isDefault: 1
    },
    {
      id: 'var_iphone17pro_silver_256',
      sku: 'IP17P-SLV-256',
      colorName: 'Natural Silver',
      colorHex: '#E0E3E5',
      storage: '256GB',
      ram: '8GB',
      price: 127400,
      mrp: 134900,
      stock: 22,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      isDefault: 0
    },
    {
      id: 'var_iphone17pro_blue_256',
      sku: 'IP17P-BLU-256',
      colorName: 'Titanium Blue',
      colorHex: '#3D4C63',
      storage: '256GB',
      ram: '8GB',
      price: 127400,
      mrp: 134900,
      stock: 18,
      imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      isDefault: 0
    },
    {
      id: 'var_iphone17pro_orange_512',
      sku: 'IP17P-ORG-512',
      colorName: 'Sunset Orange',
      colorHex: '#E67332',
      storage: '512GB',
      ram: '8GB',
      price: 147400,
      mrp: 154900,
      stock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      isDefault: 0
    },
    {
      id: 'var_iphone17pro_silver_1tb',
      sku: 'IP17P-SLV-1TB',
      colorName: 'Natural Silver',
      colorHex: '#E0E3E5',
      storage: '1TB',
      ram: '8GB',
      price: 177400,
      mrp: 184900,
      stock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      isDefault: 0
    }
  ];

  iphoneVariants.forEach(v => {
    insertVariant.run(
      v.id,
      'prod_iphone_17_pro',
      v.sku,
      v.colorName,
      v.colorHex,
      v.storage,
      v.ram,
      v.price,
      v.mrp,
      v.stock,
      v.imageUrl,
      JSON.stringify([v.imageUrl]),
      v.isDefault
    );
  });

  // Explicitly seed exact reference EMI plans for iPhone 17 Pro 256GB (₹1,27,400)
  const exactIphonePlans = [
    { tenure: 3, rate: 0.0, monthly: 44967, total: 134901, cashback: 7500, recommended: 0 },
    { tenure: 6, rate: 0.0, monthly: 22483, total: 134898, cashback: 7500, recommended: 0 },
    { tenure: 12, rate: 0.0, monthly: 11242, total: 134904, cashback: 7500, recommended: 1 },
    { tenure: 24, rate: 0.0, monthly: 5621, total: 134904, cashback: 7500, recommended: 0 },
    { tenure: 36, rate: 10.5, monthly: 4297, total: 154692, cashback: 7500, recommended: 0 },
    { tenure: 48, rate: 10.5, monthly: 3385, total: 162480, cashback: 7500, recommended: 0 },
    { tenure: 60, rate: 10.5, monthly: 2842, total: 170520, cashback: 7500, recommended: 0 }
  ];

  exactIphonePlans.forEach((plan) => {
    insertEmiPlan.run(
      `emi_iphone17_${plan.tenure}m`,
      'prod_iphone_17_pro',
      'var_iphone17pro_orange_256',
      plan.tenure,
      plan.rate,
      plan.monthly,
      plan.total,
      plan.cashback,
      0,
      'Instant MF Lien',
      Math.round(127400 * 1.25),
      plan.recommended
    );
  });

  // Also seed alias for "iPhone 17 Pro Max" slug so either URL works
  insertProduct.run(
    'prod_iphone_17_pro_max',
    'iphone-17-pro-max',
    'iPhone 17 Pro Max',
    'Apple',
    'cat_smartphones',
    'Super-sized 6.9-inch Super Retina XDR display with Grade 5 Titanium, A19 Pro performance, and extended battery life.',
    144900,
    137400,
    'BEST SELLER',
    4.9,
    2100,
    0,
    1, // is_best_seller
    0,
    iphone17ProSpecs
  );

  insertVariant.run(
    'var_iphone17pm_titanium',
    'prod_iphone_17_pro_max',
    'IP17PM-BLU-256',
    'Titanium Blue',
    '#3D4C63',
    '256GB',
    '8GB',
    137400,
    144900,
    15,
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80']),
    1
  );

  generateStandardPlans(137400, 7500).forEach(plan => {
    insertEmiPlan.run(
      `emi_iphone17pm_${plan.tenureMonths}m`,
      'prod_iphone_17_pro_max',
      'var_iphone17pm_titanium',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  // =========================================================================
  // 4. Best Sellers - Item 2: Galaxy S25 Ultra / S24 Ultra
  // =========================================================================
  insertProduct.run(
    'prod_samsung_s25_ultra',
    'galaxy-s25-ultra',
    'Galaxy S25 Ultra',
    'Samsung',
    'cat_smartphones',
    'Welcome to the era of mobile Galaxy AI. Titanium Frame with 200MP Quad Tele System, Snapdragon 8 Gen 4, and integrated S-Pen.',
    144999,
    129999,
    'BEST SELLER',
    4.8,
    1150,
    0,
    1, // is_best_seller
    0,
    JSON.stringify({
      "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits",
      "Processor": "Snapdragon 8 Gen 4 for Galaxy",
      "Camera": "200MP Quad Tele System with AI ProVisual Engine",
      "S-Pen": "Integrated S-Pen with latency down to 2.8ms",
      "Battery": "5000 mAh with 45W Super Fast Charging"
    })
  );

  insertVariant.run(
    'var_s25u_gray',
    'prod_samsung_s25_ultra',
    'S25U-GRY-256',
    'Titanium Gray',
    '#7D7E80',
    '256GB',
    '12GB',
    129999,
    144999,
    18,
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80']),
    1
  );

  generateStandardPlans(129999, 6500).forEach(plan => {
    insertEmiPlan.run(
      `emi_s25u_${plan.tenureMonths}m`,
      'prod_samsung_s25_ultra',
      'var_s25u_gray',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  // =========================================================================
  // 5. Best Deals - Item 1: MacBook Pro
  // =========================================================================
  insertProduct.run(
    'prod_macbook_pro',
    'macbook-pro',
    'MacBook Pro',
    'Apple',
    'cat_laptops',
    'MacBook Pro blasts forward with M3 Max, an incredibly advanced chip delivering exceptional speed and capability for demanding workflows with 22 hours battery life.',
    199900,
    184900,
    'BEST DEAL',
    4.9,
    740,
    0,
    0,
    1, // is_best_deal
    JSON.stringify({
      "Display": "14.2-inch Liquid Retina XDR, 1600 nits peak, 120Hz ProMotion",
      "Processor": "Apple M3 Max (14-core CPU, 30-core GPU)",
      "Memory": "36GB Unified Memory",
      "Storage": "512GB SSD",
      "Battery": "Up to 18 hours movie playback"
    })
  );

  insertVariant.run(
    'var_mbp_gold',
    'prod_macbook_pro',
    'MBP-GLD-512',
    'Starlight Gold',
    '#E5D9C5',
    '512GB',
    '18GB',
    184900,
    199900,
    10,
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80']),
    1
  );

  generateStandardPlans(184900, 10000).forEach(plan => {
    insertEmiPlan.run(
      `emi_mbp_${plan.tenureMonths}m`,
      'prod_macbook_pro',
      'var_mbp_gold',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  // =========================================================================
  // 6. Best Deals - Item 2: OnePlus 15
  // =========================================================================
  insertProduct.run(
    'prod_oneplus_15',
    'oneplus-15',
    'OnePlus 15',
    'OnePlus',
    'cat_smartphones',
    'Flagship killer performance powered by Snapdragon 8 Gen 4, 4th Gen Hasselblad Camera for Mobile, 5400 mAh battery with 100W SUPERVOOC charging.',
    74999,
    64999,
    'BEST DEAL',
    4.7,
    680,
    0,
    0,
    1, // is_best_deal
    JSON.stringify({
      "Display": "6.82-inch 2K 120Hz ProXDR Display with Aqua Touch",
      "Processor": "Snapdragon 8 Gen 4 Mobile Platform",
      "Camera": "50MP Sony LYT-808 with OIS + 64MP 3x Periscope Telephoto",
      "Battery": "5400 mAh with 100W SUPERVOOC and 50W AIRVOOC"
    })
  );

  insertVariant.run(
    'var_op15_emerald',
    'prod_oneplus_15',
    'OP15-EMR-256',
    'Flowy Emerald',
    '#2E4A40',
    '256GB',
    '16GB',
    64999,
    74999,
    14,
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    JSON.stringify(['https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80']),
    1
  );

  generateStandardPlans(64999, 4500).forEach(plan => {
    insertEmiPlan.run(
      `emi_op15_${plan.tenureMonths}m`,
      'prod_oneplus_15',
      'var_op15_emerald',
      plan.tenureMonths,
      plan.interestRate,
      plan.monthlyAmount,
      plan.totalAmount,
      plan.cashbackAmount,
      0,
      'Instant MF Lien',
      plan.minMfPledge,
      plan.isRecommended ? 1 : 0
    );
  });

  console.log('✅ Database successfully seeded with 1Fi reference products matching screenshot!');
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
