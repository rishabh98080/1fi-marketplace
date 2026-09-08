import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString('en-IN')}`;
  const displayImage = product.defaultVariant?.imageUrl || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Product Image */}
      <Link 
        to={`/products/${product.slug}`}
        className="block h-44 w-full flex items-center justify-center p-2 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="max-h-full max-w-full object-contain drop-shadow-sm hover:scale-105 transition-transform"
          onError={(e) => {
            e.target.src = '/iphone17pro_reference.png';
          }}
        />
      </Link>

      {/* Info */}
      <div className="mt-3">
        <Link to={`/products/${product.slug}`}>
          <h4 className="font-bold text-slate-900 text-sm hover:text-[#6222E4] transition-colors line-clamp-1">
            {product.name}
          </h4>
        </Link>

        {/* Color finish dots */}
        {product.swatches && product.swatches.length > 0 && (
          <div className="flex items-center space-x-1.5 my-2">
            {product.swatches.map((swatch, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: swatch.colorHex }}
                className="w-3 h-3 rounded-full border border-slate-200"
              />
            ))}
          </div>
        )}

        {/* Price & EMI */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="text-base font-extrabold text-slate-900">
              {formatCurrency(product.price)}
            </div>
            {product.mrp > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatCurrency(product.mrp)}
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-[#6222E4] bg-[#F4F0FD] px-2 py-0.5 rounded-md">
              from {formatCurrency(product.minMonthlyEmi)}/mo
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to={`/products/${product.slug}`}
          className="mt-3 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#6222E4] hover:bg-[#5019C3] flex items-center justify-center space-x-1 transition-colors"
        >
          <span>Select EMI Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
