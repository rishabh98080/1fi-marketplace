const { db } = require('../db');

function getCategories(req, res, next) {
  try {
    const stmt = db.prepare(`
      SELECT 
        c.*, 
        (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as product_count
      FROM categories c
      ORDER BY c.display_order ASC
    `);
    const categories = stmt.all();

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories
};
