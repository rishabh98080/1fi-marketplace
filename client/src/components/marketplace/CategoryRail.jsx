import React from 'react';

export default function CategoryRail({ categories = [], selectedCategory = 'all', onSelectCategory }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 py-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.slug || (cat.slug === 'all' && selectedCategory === 'all');

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-[#6222E4] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
