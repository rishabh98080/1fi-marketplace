const express = require('express');
const router = express.Router();

const { getCategories } = require('../controllers/categoryController');
const { getProducts, getProductBySlugOrId, getEmiPlans } = require('../controllers/productController');
const { createApplication, getApplicationById } = require('../controllers/applicationController');

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: '1Fi Marketplace Backend',
    timestamp: new Date().toISOString()
  });
});

// Categories
router.get('/categories', getCategories);

// Products
router.get('/products', getProducts);
router.get('/products/:slugOrId', getProductBySlugOrId);
router.get('/products/:id/emi-plans', getEmiPlans);

// Mutual Fund EMI Applications
router.post('/applications', createApplication);
router.get('/applications/:id', getApplicationById);

module.exports = router;
