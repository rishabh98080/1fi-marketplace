import React from 'react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroBanner({ onStartShoppingClick, onCheckEligibilityClick }) {
  return (
    <section className="text-center pt-8 pb-10 sm:pt-14 sm:pb-12 max-w-4xl mx-auto px-4">
      
      {/* Top Tag / Pill */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-purple-100 shadow-sm text-xs font-semibold text-slate-700 mb-6">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F4F0FD] text-[#6222E4] font-bold text-[11px] border border-[#E8E1FB]">
          <Sparkles className="w-3 h-3 mr-1 text-[#6222E4]" /> New
        </span>
        <span className="text-slate-600 font-medium">
          No-cost EMIs backed by mutual funds
        </span>
      </div>

      {/* Main Title Matching Screenshot Typography */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] mb-6">
        Shop today<br />
        <span className="font-serif italic font-normal text-slate-400">Pay later</span>{' '}
        <span className="text-slate-950">using</span><br />
        <span className="text-[#6222E4]">mutual funds.</span>
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 my-8">
        <button
          onClick={onCheckEligibilityClick}
          className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-[#6222E4] bg-white border-2 border-[#6222E4] hover:bg-[#F8F6FE] active:scale-[0.98] transition-all flex items-center justify-center shadow-sm"
        >
          <span>Check Eligibility</span>
          <ArrowUpRight className="w-4 h-4 ml-1.5" />
        </button>

        <a
          href="#product-grid"
          onClick={onStartShoppingClick}
          className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm text-white bg-[#6222E4] hover:bg-[#5019C3] active:scale-[0.98] shadow-md shadow-[#6222E4]/25 transition-all flex items-center justify-center"
        >
          <span>Start Shopping</span>
          <Search className="w-4 h-4 ml-2" />
        </a>
      </div>

      {/* Subtext */}
      <div className="text-xs sm:text-sm text-slate-500 font-medium space-y-1">
        <p>
          No <strong className="text-slate-900 font-bold">credit</strong> score required. No <strong className="text-slate-900 font-bold">interest</strong>.
        </p>
        <p>
          Fully backed by your <strong className="text-slate-900 font-bold">investments</strong>.
        </p>
      </div>

    </section>
  );
}
