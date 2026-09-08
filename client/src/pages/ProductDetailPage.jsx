import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { useProductDetails } from '../hooks/useProductDetails';
import { ProductDetailSkeleton } from '../components/common/SkeletonLoader';
import ErrorState from '../components/common/ErrorState';
import ProceedModal from '../components/marketplace/ProceedModal';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const {
    product,
    selectedVariant,
    setSelectedVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    loading,
    error,
    refetch
  } = useProductDetails(slug);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <ProductDetailSkeleton />;
  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-xs font-bold text-[#6222E4] mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>
        <ErrorState 
          title="Product not found"
          message={error || `Could not find product matching '${slug}'`}
          onRetry={refetch}
        />
      </div>
    );
  }

  const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;

  // Unique color finishes
  const uniqueColors = [];
  const seenColorHex = new Set();
  product.variants?.forEach((v) => {
    if (!seenColorHex.has(v.colorHex)) {
      seenColorHex.add(v.colorHex);
      uniqueColors.push({
        name: v.colorName,
        hex: v.colorHex
      });
    }
  });

  const uniqueStorages = [...new Set(product.variants?.map((v) => v.storage).filter(Boolean))];

  const handleColorSelect = (hex) => {
    const match = product.variants.find(
      (v) => v.colorHex === hex && v.storage === selectedVariant?.storage
    ) || product.variants.find((v) => v.colorHex === hex);
    if (match) setSelectedVariant(match);
  };

  const handleStorageSelect = (storage) => {
    const match = product.variants.find(
      (v) => v.storage === storage && v.colorHex === selectedVariant?.colorHex
    ) || product.variants.find((v) => v.storage === storage);
    if (match) setSelectedVariant(match);
  };

  const activePrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.mrp;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Clean Back Link */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-[#6222E4] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Shop</span>
        </Link>
      </div>

      {/* Main Grid: Left Card & Right EMI Plans matching img-001.png */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* ============================================================ */}
        {/* LEFT: Product Card with Finishes (Matches img-001.png) */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center">
          
          <div className="text-left">
            {product.badge && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-base font-semibold text-slate-400 mt-0.5">
              {selectedVariant?.storage || '256GB'}
            </p>
          </div>

          {/* Product Image */}
          <div className="h-72 sm:h-80 w-full flex items-center justify-center p-4 my-4">
            <img
              src={selectedVariant?.imageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-xl"
              onError={(e) => {
                e.target.src = '/iphone17pro_reference.png';
              }}
            />
          </div>

          {/* Finishes */}
          <div className="pt-2">
            <p className="text-xs text-slate-500 mb-3 font-medium">
              Available in {uniqueColors.length} finishes
            </p>

            <div className="flex items-center justify-center space-x-3">
              {uniqueColors.map((color, idx) => {
                const isSelected = selectedVariant?.colorHex === color.hex;
                return (
                  <button
                    key={idx}
                    title={color.name}
                    onClick={() => handleColorSelect(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-6 h-6 rounded-full border border-slate-300 shadow-sm transition-all ${
                      isSelected ? 'ring-2 ring-[#6222E4] ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Storage Options */}
          {uniqueStorages.length > 1 && (
            <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center space-x-2">
              {uniqueStorages.map((storage) => {
                const isSelected = selectedVariant?.storage === storage;
                return (
                  <button
                    key={storage}
                    onClick={() => handleStorageSelect(storage)}
                    className={`py-1.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'border-[#6222E4] bg-[#F4F0FD] text-[#6222E4]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* ============================================================ */}
        {/* RIGHT: Pricing & EMI List (Matches img-001.png) */}
        {/* ============================================================ */}
        <div className="space-y-4">
          
          {/* Price Header */}
          <div>
            <div className="text-4xl font-extrabold text-slate-950 tracking-tight">
              {formatCurrency(activePrice)}
            </div>
            {activeMrp > activePrice && (
              <div className="text-base text-slate-400 line-through mt-0.5">
                {formatCurrency(activeMrp)}
              </div>
            )}
            <p className="text-sm font-medium text-slate-700 mt-1">
              EMI plans backed by mutual funds
            </p>
          </div>

          {/* EMI Plans List */}
          <div className="space-y-2.5">
            {emiPlans.map((plan) => {
              const isSelected = selectedEmiPlan?.id === plan.id || selectedEmiPlan?.tenureMonths === plan.tenureMonths;
              
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedEmiPlan(plan)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#6222E4] shadow-sm ring-1 ring-[#6222E4]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-base">
                      {formatCurrency(plan.monthlyAmount)}
                      <span className="text-slate-500 font-normal ml-1">
                        x {plan.tenureMonths} months
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-700">
                      {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                    </div>
                  </div>

                  {plan.cashbackAmount > 0 && (
                    <div className="text-[11px] font-semibold text-emerald-600 mt-1">
                      Additional cashback of {formatCurrency(plan.cashbackAmount)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Proceed CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!selectedEmiPlan}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-[#6222E4] hover:bg-[#5019C3] shadow-md shadow-[#6222E4]/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>
                Proceed with {selectedEmiPlan?.tenureMonths}M Plan ({formatCurrency(selectedEmiPlan?.monthlyAmount)}/mo)
              </span>
            </button>
          </div>

        </div>

      </div>

      {/* Instant Proceed Modal */}
      <ProceedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        variant={selectedVariant}
        emiPlan={selectedEmiPlan}
      />

    </div>
  );
}
