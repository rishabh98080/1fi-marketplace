import React from 'react';

export const SHOP_TABS = {
  TOP_BRANDS: 'top_brands',
  NEARBY_STORES: 'nearby_stores',
  MARKETPLACE: 'marketplace'
};

export default function ShopNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: SHOP_TABS.TOP_BRANDS, label: 'Top Brands' },
    { id: SHOP_TABS.NEARBY_STORES, label: 'Nearby Stores' },
    { id: SHOP_TABS.MARKETPLACE, label: '1Fi Marketplace' }
  ];

  return (
    <div className="flex justify-center my-6">
      <div className="inline-flex p-1 rounded-xl bg-slate-100/80 border border-slate-200/60 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white text-[#6222E4] shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BlankTabContent({ tabName }) {
  return (
    <div className="max-w-md mx-auto my-24 p-8 text-center text-slate-400 text-xs">
      <h3 className="font-semibold text-slate-600 text-sm mb-1">{tabName}</h3>
      <p>No products available in this section.</p>
    </div>
  );
}
