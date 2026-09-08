const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { initDb } = require('./db');
const apiRoutes = require('./routes/api');

// Initialize database schema on boot
initDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static images directory if needed
app.use('/static', express.static(path.join(__dirname, '../public')));

// Mount API routes
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to 1Fi Marketplace API',
    endpoints: {
      health: '/api/health',
      categories: '/api/categories',
      products: '/api/products',
      productDetail: '/api/products/:slugOrId',
      emiPlans: '/api/products/:id/emi-plans',
      applications: '/api/applications'
    }
  });
});

// Centralized 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 1Fi Marketplace Backend running on http://localhost:${PORT}`);
    console.log(`📡 API Documentation & Endpoints live at http://localhost:${PORT}/api/products`);
  });
}

module.exports = app;
