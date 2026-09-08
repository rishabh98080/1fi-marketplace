import React from 'react';
import { Search } from 'lucide-react';

export default function CenteredFilterBar({
  filters,
  onFilterChange
}) {
  return (
    <div className="max-w-xl mx-auto my-4 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200/80 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6222E4] placeholder:text-slate-400"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      <select
        value={filters.sort || 'relevance'}
        onChange={(e) => onFilterChange('sort', e.target.value)}
        className="px-3 py-2.5 text-xs font-semibold bg-white border border-slate-200/80 rounded-xl text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#6222E4] cursor-pointer shadow-sm"
      >
        <option value="relevance">Popular</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
