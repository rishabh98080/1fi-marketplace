import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full h-48 bg-slate-200 rounded-xl mb-4 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
        <div className="flex space-x-2 mb-4">
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
          <div className="w-4 h-4 rounded-full bg-slate-200"></div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-slate-200 rounded w-2/5"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-40 mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery Skeleton */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="h-5 bg-slate-200 rounded w-16 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="w-full h-80 bg-slate-200 rounded-2xl mb-6"></div>
          <div className="flex justify-center space-x-4">
            <div className="w-6 h-6 rounded-full bg-slate-200"></div>
            <div className="w-6 h-6 rounded-full bg-slate-200"></div>
            <div className="w-6 h-6 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Right Details Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="h-10 bg-slate-200 rounded w-1/2"></div>
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"></div>
            ))}
          </div>
          <div className="h-14 bg-slate-200 rounded-2xl w-full mt-6"></div>
        </div>
      </div>
    </div>
  );
}
