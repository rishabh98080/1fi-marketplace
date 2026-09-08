import React, { useState, useEffect } from 'react';
import ShopNavigation, { SHOP_TABS, BlankTabContent } from '../components/shop/ShopNavigation';
import CategoryRail from '../components/marketplace/CategoryRail';
import CenteredFilterBar from '../components/marketplace/CenteredFilterBar';
import ProductGrid from '../components/marketplace/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { fetchCategories } from '../services/marketplaceApi';
import ErrorState from '../components/common/ErrorState';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState(SHOP_TABS.MARKETPLACE);
  const [categories, setCategories] = useState([]);

  // Hook for main products
  const {
    products,
    loading,
    error,
    filters,
    updateFilter,
    refetch
  } = useProducts({
    category: 'all',
    search: '',
    sort: 'relevance'
  });

  // Load categories dynamically
  useEffect(() => {
    let isMounted = true;
    fetchCategories()
      .then((cats) => {
        if (isMounted) setCategories(cats);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      
      {/* 3-Option Shop Segmented Navigation (Top Brands | Nearby Stores | 1Fi Marketplace) */}
      <ShopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Option A: Top Brands */}
      {activeTab === SHOP_TABS.TOP_BRANDS && (
        <BlankTabContent tabName="Top Brands" />
      )}

      {/* Option B: Nearby Stores */}
      {activeTab === SHOP_TABS.NEARBY_STORES && (
        <BlankTabContent tabName="Nearby Stores" />
      )}

      {/* Option C: 1Fi Marketplace */}
      {activeTab === SHOP_TABS.MARKETPLACE && (
        <div className="mt-2">
          
          {/* Category Filter Pills */}
          <CategoryRail
            categories={categories}
            selectedCategory={filters.category || 'all'}
            onSelectCategory={(slug) => updateFilter('category', slug)}
          />

          {/* Search & Sort */}
          <CenteredFilterBar
            filters={filters}
            onFilterChange={updateFilter}
          />

          {/* Products Grid */}
          {error ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <ProductGrid
              products={products}
              loading={loading}
            />
          )}

        </div>
      )}

    </main>
  );
}
