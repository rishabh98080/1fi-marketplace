import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { submitApplication } from '../../services/marketplaceApi';

export default function ProceedModal({
  isOpen,
  onClose,
  product,
  variant,
  emiPlan
}) {
  const [customerName, setCustomerName] = useState('Rishabh Kumar');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [customerEmail, setCustomerEmail] = useState('rishabh@example.com');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [mfPortfolioAmount, setMfPortfolioAmount] = useState(450000);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;
  const effectivePledge = Math.round((variant?.price || product?.basePrice || 127400) * 1.25);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        productId: product.id,
        variantId: variant?.id,
        emiPlanId: emiPlan?.id,
        customerName,
        customerEmail,
        customerPhone,
        panNumber,
        mfPortfolioAmount: Number(mfPortfolioAmount),
        pledgedAmount: effectivePledge,
        monthlyEmi: emiPlan?.monthlyAmount,
        tenureMonths: emiPlan?.tenureMonths
      };

      const result = await submitApplication(payload);

      if (result && result.success) {
        setSuccessData(result.data);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!successData ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center space-x-2 text-xs font-bold text-[#6222E4] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>1Fi Mutual Fund Lien Approval</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
              Confirm EMI Application
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Pledge your mutual fund units digitally. No liquidation, no taxes, keep earning returns.
            </p>

            {/* Selected Plan Summary Card */}
            <div className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E8E1FB] mb-6 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-slate-900 text-base">{product?.name}</div>
                  <div className="text-xs text-slate-500">{variant?.colorName} • {variant?.storage}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-[#6222E4]">
                    {formatCurrency(variant?.price || product?.basePrice)}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Cashback: ₹7,500</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E1FB] flex justify-between items-center text-xs">
                <span className="font-medium text-slate-600">Selected EMI Tenure:</span>
                <span className="font-extrabold text-slate-900">
                  {formatCurrency(emiPlan?.monthlyAmount)}/mo x {emiPlan?.tenureMonths} Months ({emiPlan?.interestRate}% Int)
                </span>
              </div>
            </div>

            {/* Solvency / Lien Pledge breakdown */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 mb-6 text-xs text-emerald-900 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="flex items-center space-x-1.5">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  <span>Your MF Portfolio:</span>
                </span>
                <span>{formatCurrency(mfPortfolioAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Required Lien Pledge (1.25x):</span>
                <span className="font-semibold">{formatCurrency(effectivePledge)}</span>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-600 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Eligible for instant automated lien approval via CAMS / KFintech.</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per PAN)
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6222E4]/20 focus:border-[#6222E4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6222E4]/20 focus:border-[#6222E4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Card
                  </label>
                  <input
                    type="text"
                    required
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6222E4]/20 focus:border-[#6222E4] uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full fi-button-primary py-3.5 text-sm mt-2 flex items-center justify-center space-x-2 shadow-lg hover:shadow-fi-glow"
              >
                {submitting ? (
                  <span>Processing Instant Lien...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Lien</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-2">
              INSTANT LIEN APPROVED
            </span>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Order Confirmed!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Your mutual fund units have been marked with a safe digital lien. Zero liquidation, full returns.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Application ID:</span>
                <span className="font-mono font-bold text-slate-800">{successData.applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-800">{successData.productName} ({successData.variant})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly EMI:</span>
                <span className="font-bold text-[#6222E4]">{formatCurrency(successData.monthlyEmi)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure:</span>
                <span className="font-bold text-slate-800">{successData.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First Auto-Debit:</span>
                <span className="font-bold text-slate-800">{successData.firstDebitDate}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full fi-button-primary py-3 text-sm"
            >
              Done & Return to Marketplace
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
