const { db } = require('../db');
const { generateStandardPlans } = require('../services/emiCalculator');

/**
 * Get all products with dynamic search, filtering, sorting, and pagination
 */
function getProducts(req, res, next) {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      section,
      sort = 'relevance',
      page = 1,
      limit = 20
    } = req.query;

    const conditions = [];
    const params = [];

    // Search query: across name, brand, description
    if (search && search.trim() !== '') {
      conditions.push('(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)');
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    // Category filter: slug or id
    if (category && category !== 'all') {
      conditions.push('(c.slug = ? OR c.id = ?)');
      params.push(category, category);
    }

    // Brand filter
    if (brand) {
      conditions.push('p.brand = ?');
      params.push(brand);
    }

    // Price range filters
    if (minPrice) {
      conditions.push('p.base_price >= ?');
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      conditions.push('p.base_price <= ?');
      params.push(Number(maxPrice));
    }

    // Curated sections: featured, bestseller, deals
    if (section === 'featured') {
      conditions.push('p.is_featured = 1');
    } else if (section === 'bestseller') {
      conditions.push('p.is_best_seller = 1');
    } else if (section === 'deals') {
      conditions.push('p.is_best_deal = 1');
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Sorting
    let orderBy = 'p.is_featured DESC, p.created_at DESC';
    switch (sort) {
      case 'price_asc':
        orderBy = 'p.base_price ASC';
        break;
      case 'price_desc':
        orderBy = 'p.base_price DESC';
        break;
      case 'rating':
        orderBy = 'p.rating DESC';
        break;
      case 'newest':
        orderBy = 'p.created_at DESC';
        break;
      case 'relevance':
      default:
        orderBy = 'p.is_featured DESC, p.is_best_seller DESC, p.rating DESC';
        break;
    }

    // Total count query
    const countSql = `
      SELECT COUNT(*) as total
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;
    const totalRow = db.prepare(countSql).get(...params);
    const total = totalRow ? totalRow.total : 0;

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    // Fetch products
    const fetchSql = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const products = db.prepare(fetchSql).all(...params, limitNum, offset);

    // Attach default variant, color swatches, and min EMI to each product
    const variantStmt = db.prepare(`
      SELECT * FROM variants WHERE product_id = ? ORDER BY is_default DESC, price ASC
    `);

    const emiStmt = db.prepare(`
      SELECT MIN(monthly_amount) as min_monthly FROM emi_plans WHERE product_id = ?
    `);

    const enrichedProducts = products.map(prod => {
      const variants = variantStmt.all(prod.id);
      const defaultVariant = variants.find(v => v.is_default) || variants[0] || null;
      
      // Extract unique colors for swatches
      const swatches = [];
      const seenColors = new Set();
      variants.forEach(v => {
        if (!seenColors.has(v.color_hex)) {
          seenColors.add(v.color_hex);
          swatches.push({
            colorName: v.color_name,
            colorHex: v.color_hex
          });
        }
      });

      const emiRow = emiStmt.get(prod.id);
      const minMonthlyEmi = emiRow && emiRow.min_monthly ? emiRow.min_monthly : Math.round(prod.base_price / 60);

      let specs = {};
      try {
        specs = prod.specifications ? JSON.parse(prod.specifications) : {};
      } catch (e) {
        specs = {};
      }

      return {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        brand: prod.brand,
        categoryId: prod.category_id,
        categoryName: prod.category_name,
        categorySlug: prod.category_slug,
        description: prod.description,
        mrp: defaultVariant ? defaultVariant.mrp : prod.mrp,
        price: defaultVariant ? defaultVariant.price : prod.base_price,
        discountPercentage: Math.round(((prod.mrp - prod.base_price) / prod.mrp) * 100),
        badge: prod.badge,
        rating: prod.rating,
        reviewsCount: prod.reviews_count,
        isFeatured: Boolean(prod.is_featured),
        isBestSeller: Boolean(prod.is_best_seller),
        isBestDeal: Boolean(prod.is_best_deal),
        defaultVariant,
        swatches,
        minMonthlyEmi,
        specifications: specs
      };
    });

    res.json({
      success: true,
      count: enrichedProducts.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: enrichedProducts
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get product details by slug or ID with all variants and EMI plans
 */
function getProductBySlugOrId(req, res, next) {
  try {
    const { slugOrId } = req.params;

    const prodSql = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ? OR p.id = ?
    `;
    const prod = db.prepare(prodSql).get(slugOrId, slugOrId);

    if (!prod) {
      return res.status(404).json({
        success: false,
        error: `Product '${slugOrId}' not found.`
      });
    }

    // Fetch all variants
    const variants = db.prepare(`
      SELECT * FROM variants WHERE product_id = ? ORDER BY is_default DESC, price ASC
    `).all(prod.id);

    // Fetch all EMI plans for this product
    let emiPlans = db.prepare(`
      SELECT * FROM emi_plans WHERE product_id = ? ORDER BY tenure_months ASC
    `).all(prod.id);

    // If no explicit EMI plans stored, generate them dynamically based on base price
    if (emiPlans.length === 0) {
      const generated = generateStandardPlans(prod.base_price, 7500);
      emiPlans = generated.map((g, idx) => ({
        id: `emi_gen_${prod.id}_${g.tenureMonths}m`,
        product_id: prod.id,
        variant_id: variants[0]?.id || null,
        tenure_months: g.tenureMonths,
        interest_rate: g.interestRate,
        monthly_amount: g.monthlyAmount,
        total_amount: g.totalAmount,
        cashback_amount: g.cashbackAmount,
        processing_fee: g.processingFee,
        approval_type: g.approvalType,
        min_mf_pledge: g.minMfPledge,
        is_recommended: g.isRecommended ? 1 : 0
      }));
    }

    let specs = {};
    try {
      specs = prod.specifications ? JSON.parse(prod.specifications) : {};
    } catch (e) {
      specs = {};
    }

    res.json({
      success: true,
      data: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        brand: prod.brand,
        categoryId: prod.category_id,
        categoryName: prod.category_name,
        categorySlug: prod.category_slug,
        description: prod.description,
        mrp: prod.mrp,
        basePrice: prod.base_price,
        badge: prod.badge,
        rating: prod.rating,
        reviewsCount: prod.reviews_count,
        isFeatured: Boolean(prod.is_featured),
        isBestSeller: Boolean(prod.is_best_seller),
        isBestDeal: Boolean(prod.is_best_deal),
        specifications: specs,
        variants: variants.map(v => ({
          id: v.id,
          sku: v.sku,
          colorName: v.color_name,
          colorHex: v.color_hex,
          storage: v.storage,
          ram: v.ram,
          price: v.price,
          mrp: v.mrp,
          stock: v.stock,
          imageUrl: v.image_url,
          isDefault: Boolean(v.is_default)
        })),
        emiPlans: emiPlans.map(e => ({
          id: e.id,
          tenureMonths: e.tenure_months,
          interestRate: e.interest_rate,
          monthlyAmount: e.monthly_amount,
          totalAmount: e.total_amount,
          cashbackAmount: e.cashback_amount,
          processingFee: e.processing_fee,
          approvalType: e.approval_type,
          minMfPledge: e.min_mf_pledge,
          isRecommended: Boolean(e.is_recommended)
        }))
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get dynamic EMI plans recalculation for a specific product and variant
 */
function getEmiPlans(req, res, next) {
  try {
    const { id } = req.params;
    const { variantId, principal } = req.query;

    let targetPrice = principal ? Number(principal) : null;

    if (!targetPrice) {
      if (variantId) {
        const variant = db.prepare('SELECT price FROM variants WHERE id = ?').get(variantId);
        if (variant) targetPrice = variant.price;
      }
      if (!targetPrice) {
        const prod = db.prepare('SELECT base_price FROM products WHERE id = ? OR slug = ?').get(id, id);
        if (prod) targetPrice = prod.base_price;
      }
    }

    if (!targetPrice) {
      return res.status(400).json({
        success: false,
        error: 'Unable to determine price for EMI calculations'
      });
    }

    const plans = generateStandardPlans(targetPrice, 7500);

    res.json({
      success: true,
      principal: targetPrice,
      plans
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductBySlugOrId,
  getEmiPlans
};
