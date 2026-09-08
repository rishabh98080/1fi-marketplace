import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  brands = ['Apple', 'Samsung', 'Sony', 'Google'],
  totalResults
}) {
  const formatCurrency = (val) => `₹${Number(val).toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-fi-card space-y-6">
      
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#6222E4]" />
          <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">Filters</h4>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-400 hover:text-[#6222E4] flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Search Products
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by model or feature..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6222E4]/20 focus:border-[#6222E4]"
          />
        </div>
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sort || 'relevance'}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6222E4]/20 focus:border-[#6222E4] font-medium text-slate-700 cursor-pointer"
        >
          <option value="relevance">Relevance & Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest Launches</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onFilterChange('brand', '')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !filters.brand
                ? 'bg-[#6222E4] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onFilterChange('brand', filters.brand === b ? '' : b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.brand === b
                  ? 'bg-[#6222E4] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Max Price
          </label>
          <span className="text-xs font-extrabold text-[#6222E4]">
            {formatCurrency(filters.maxPrice || 250000)}
          </span>
        </div>
        <input
          type="range"
          min="25000"
          max="250000"
          step="5000"
          value={filters.maxPrice || 250000}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-[#6222E4] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹25,000</span>
          <span>₹2,50,000</span>
        </div>
      </div>

    </div>
  );
}
