import React from 'react';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../common/SkeletonLoader';

export default function ProductGrid({ 
  products = [], 
  loading = false,
  emptyMessage = "No products found." 
}) {
  return (
    <section className="my-4 max-w-5xl mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <ProductCardSkeleton key={n} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-400 text-xs">
          <p>{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
