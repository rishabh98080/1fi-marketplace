const { db } = require('../db');
const crypto = require('crypto');

function createApplication(req, res, next) {
  try {
    const {
      productId,
      variantId,
      emiPlanId,
      customerName,
      customerEmail,
      customerPhone,
      panNumber = 'ABCDE1234F',
      mfFolioNumber = '1FI-MF-' + Math.floor(100000 + Math.random() * 900000),
      mfPortfolioAmount = 450000,
      pledgedAmount,
      monthlyEmi,
      tenureMonths
    } = req.body;

    if (!productId || !variantId || !monthlyEmi || !tenureMonths) {
      return res.status(400).json({
        success: false,
        error: 'Missing required application details (productId, variantId, monthlyEmi, tenureMonths)'
      });
    }

    if (!customerName || !customerPhone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide full customer name and contact phone'
      });
    }

    const effectivePledge = Number(pledgedAmount) || Math.round(Number(monthlyEmi) * Number(tenureMonths) * 1.1);

    // Mutual fund lien pledge solvency check
    if (Number(mfPortfolioAmount) < effectivePledge) {
      return res.status(400).json({
        success: false,
        error: `Insufficient Mutual Fund portfolio value. Required pledge: ₹${effectivePledge.toLocaleString('en-IN')}, available portfolio: ₹${Number(mfPortfolioAmount).toLocaleString('en-IN')}.`
      });
    }

    const applicationId = 'APP-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const insertStmt = db.prepare(`
      INSERT INTO applications (
        id, product_id, variant_id, emi_plan_id, customer_name, customer_email,
        customer_phone, pan_number, mf_folio_number, mf_portfolio_amount,
        pledged_amount, monthly_emi, tenure_months, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      applicationId,
      productId,
      variantId,
      emiPlanId || 'CUSTOM',
      customerName,
      customerEmail || 'user@1fi.app',
      customerPhone,
      panNumber,
      mfFolioNumber,
      Number(mfPortfolioAmount),
      effectivePledge,
      Number(monthlyEmi),
      Number(tenureMonths),
      'APPROVED'
    );

    // Retrieve joined record
    const application = db.prepare(`
      SELECT 
        a.*,
        p.name as product_name,
        v.color_name,
        v.storage,
        v.price as product_price
      FROM applications a
      JOIN products p ON a.product_id = p.id
      JOIN variants v ON a.variant_id = v.id
      WHERE a.id = ?
    `).get(applicationId);

    res.status(201).json({
      success: true,
      message: 'Mutual Fund EMI application approved instantly with 0% liquidation!',
      data: {
        applicationId: application.id,
        status: application.status,
        customerName: application.customer_name,
        customerPhone: application.customer_phone,
        productName: application.product_name,
        variant: `${application.color_name} • ${application.storage}`,
        productPrice: application.product_price,
        monthlyEmi: application.monthly_emi,
        tenureMonths: application.tenure_months,
        mfFolioNumber: application.mf_folio_number,
        pledgedAmount: application.pledged_amount,
        mfPortfolioAmount: application.mf_portfolio_amount,
        firstDebitDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        createdAt: application.created_at
      }
    });
  } catch (error) {
    next(error);
  }
}

function getApplicationById(req, res, next) {
  try {
    const { id } = req.params;
    const application = db.prepare(`
      SELECT 
        a.*,
        p.name as product_name,
        v.color_name,
        v.storage,
        v.price as product_price
      FROM applications a
      JOIN products p ON a.product_id = p.id
      JOIN variants v ON a.variant_id = v.id
      WHERE a.id = ?
    `).get(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: `Application '${id}' not found`
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createApplication,
  getApplicationById
};
