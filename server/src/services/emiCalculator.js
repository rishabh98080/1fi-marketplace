/**
 * Dynamic EMI calculation utility for 1Fi Mutual-Fund Backed Marketplace.
 * Supports No-Cost EMI (0% interest) and standard reducing interest rates.
 */

function calculateEmiPlan(principal, tenureMonths, annualInterestRate = 0, cashback = 7500) {
  let monthlyAmount;
  let totalAmount;

  if (annualInterestRate === 0) {
    // 0% interest No-Cost EMI backed by mutual funds
    monthlyAmount = Math.round(principal / tenureMonths);
    totalAmount = principal;
  } else {
    // Reducing balance formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = annualInterestRate / (12 * 100);
    const compoundFactor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyAmount = Math.round((principal * monthlyRate * compoundFactor) / (compoundFactor - 1));
    totalAmount = monthlyAmount * tenureMonths;
  }

  // Mutual fund lien pledge required (1.25x of principal for security margin)
  const minMfPledge = Math.round(principal * 1.25);

  return {
    tenureMonths,
    interestRate: annualInterestRate,
    monthlyAmount,
    totalAmount,
    cashbackAmount: cashback,
    processingFee: 0,
    minMfPledge,
    approvalType: 'Instant MF Lien'
  };
}

/**
 * Generates standard 1Fi EMI tiers for a given principal amount.
 * Matches exact tiers shown in assignment reference:
 * - 3 months @ 0%
 * - 6 months @ 0%
 * - 12 months @ 0%
 * - 24 months @ 0%
 * - 36 months @ 10.5%
 * - 48 months @ 10.5%
 * - 60 months @ 10.5%
 */
function generateStandardPlans(principal, cashback = 7500) {
  const tiers = [
    { tenure: 3, rate: 0 },
    { tenure: 6, rate: 0 },
    { tenure: 12, rate: 0, recommended: true },
    { tenure: 24, rate: 0 },
    { tenure: 36, rate: 10.5 },
    { tenure: 48, rate: 10.5 },
    { tenure: 60, rate: 10.5 }
  ];

  return tiers.map(tier => {
    const calc = calculateEmiPlan(principal, tier.tenure, tier.rate, cashback);
    return {
      ...calc,
      isRecommended: !!tier.recommended
    };
  });
}

module.exports = {
  calculateEmiPlan,
  generateStandardPlans
};
