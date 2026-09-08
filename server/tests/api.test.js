const request = require('supertest');
const app = require('../src/server');
const seedDatabase = require('../src/db/seed');

beforeAll(() => {
  seedDatabase();
});

describe('1Fi Marketplace API Suite', () => {
  test('GET /api/health returns 200 and status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toContain('1Fi');
  });

  test('GET /api/categories returns seeded categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);
    
    const smartphoneCat = res.body.data.find(c => c.slug === 'smartphones');
    expect(smartphoneCat).toBeDefined();
    expect(smartphoneCat.name).toBe('Smartphones');
  });

  test('GET /api/products returns products list with pagination and enrichment', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    
    const first = res.body.data[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('mrp');
    expect(first).toHaveProperty('swatches');
    expect(first).toHaveProperty('minMonthlyEmi');
  });

  test('GET /api/products with search filter matches iPhone', async () => {
    const res = await request(app).get('/api/products?search=iPhone');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data.some(p => p.name.includes('iPhone'))).toBe(true);
  });

  test('GET /api/products/:slug returns iPhone 17 Pro with variants and reference EMI plans', async () => {
    const res = await request(app).get('/api/products/apple-iphone-17-pro');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    
    const product = res.body.data;
    expect(product.name).toBe('iPhone 17 Pro');
    expect(product.basePrice).toBe(127400);
    expect(product.mrp).toBe(134900);
    expect(product.badge).toBe('NEW');
    
    // Check variants (Sunset Orange, Natural Silver, Titanium Blue)
    expect(product.variants.length).toBeGreaterThanOrEqual(3);
    const orangeVariant = product.variants.find(v => v.colorName.includes('Orange'));
    expect(orangeVariant).toBeDefined();
    
    // Check EMI plans match reference screen (3M, 6M, 12M, 24M, 36M, 48M, 60M)
    expect(product.emiPlans.length).toBe(7);
    
    const plan12m = product.emiPlans.find(p => p.tenureMonths === 12);
    expect(plan12m).toBeDefined();
    expect(plan12m.monthlyAmount).toBe(11242);
    expect(plan12m.interestRate).toBe(0);
    expect(plan12m.cashbackAmount).toBe(7500);

    const plan60m = product.emiPlans.find(p => p.tenureMonths === 60);
    expect(plan60m).toBeDefined();
    expect(plan60m.monthlyAmount).toBe(2842);
    expect(plan60m.interestRate).toBe(10.5);
  });

  test('POST /api/applications validates mutual fund solvency and creates approved order', async () => {
    const payload = {
      productId: 'prod_iphone_17_pro',
      variantId: 'var_iphone17pro_orange_256',
      emiPlanId: 'emi_iphone17_12m',
      customerName: 'Aarav Sharma',
      customerEmail: 'aarav.sharma@example.com',
      customerPhone: '9876543210',
      mfPortfolioAmount: 500000,
      pledgedAmount: 159250,
      monthlyEmi: 11242,
      tenureMonths: 12
    };

    const res = await request(app).post('/api/applications').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('APPROVED');
    expect(res.body.data.applicationId).toBeDefined();
    expect(res.body.data.monthlyEmi).toBe(11242);

    // Retrieve order by ID
    const getRes = await request(app).get(`/api/applications/${res.body.data.applicationId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.customer_name).toBe('Aarav Sharma');
  });

  test('POST /api/applications rejects if MF portfolio is insufficient', async () => {
    const payload = {
      productId: 'prod_iphone_17_pro',
      variantId: 'var_iphone17pro_orange_256',
      emiPlanId: 'emi_iphone17_12m',
      customerName: 'Insufficient Balance User',
      customerPhone: '9876543210',
      mfPortfolioAmount: 50000, // less than required pledge (₹159,250)
      pledgedAmount: 159250,
      monthlyEmi: 11242,
      tenureMonths: 12
    };

    const res = await request(app).post('/api/applications').send(payload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('Insufficient Mutual Fund portfolio');
  });
});
