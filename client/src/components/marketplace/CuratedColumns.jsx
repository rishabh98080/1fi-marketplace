import React from 'react';
import { Link } from 'react-router-dom';

export default function CuratedColumns({ products = [] }) {
  const findProduct = (slugOrName) => {
    return products.find(p => 
      p.slug.includes(slugOrName) || 
      p.name.toLowerCase().includes(slugOrName.toLowerCase())
    );
  };

  const columns = [
    {
      title: 'Featured Products',
      items: [
        {
          name: 'Google Pixel 10',
          subtitle: '0% interest • 12 months',
          slug: 'google-pixel-10',
          image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80',
          product: findProduct('pixel')
        },
        {
          name: 'iPhone 17',
          subtitle: '0% interest • 12 months',
          slug: 'iphone-17',
          image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80',
          product: findProduct('iphone-17')
        }
      ]
    },
    {
      title: 'Best Sellers',
      items: [
        {
          name: 'iPhone 17 Pro Max',
          subtitle: '0% interest • Instant approval',
          slug: 'apple-iphone-17-pro',
          image: '/iphone17pro_reference.png',
          product: findProduct('iphone-17-pro') || findProduct('apple-iphone-17-pro')
        },
        {
          name: 'Galaxy S25 Ultra',
          subtitle: '0% interest • Instant approval',
          slug: 'galaxy-s25-ultra',
          image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80',
          product: findProduct('s25') || findProduct('s24') || findProduct('galaxy')
        }
      ]
    },
    {
      title: 'Best Deals',
      items: [
        {
          name: 'MacBook Pro',
          subtitle: '0% interest • 12 months',
          slug: 'macbook-pro',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
          product: findProduct('macbook')
        },
        {
          name: 'OnePlus 15',
          subtitle: '0% interest • Instant approval',
          slug: 'oneplus-15',
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
          product: findProduct('oneplus')
        }
      ]
    }
  ];

  return (
    <section className="my-10 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="space-y-3">
            
            {/* Centered Column Title */}
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 tracking-tight text-center">
              {col.title}
            </h3>

            {/* Column Cards */}
            <div className="space-y-3">
              {col.items.map((item, itemIdx) => {
                const targetSlug = item.product ? item.product.slug : item.slug;
                const displayImage = item.product?.defaultVariant?.imageUrl || item.image;

                return (
                  <Link
                    key={itemIdx}
                    to={`/products/${targetSlug}`}
                    className="group block bg-[#F4EEFD] hover:bg-[#EFEBFE] border border-[#E4D7FD] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between h-20 sm:h-22">
                      
                      {/* Left: Product Name & Subtitle */}
                      <div className="pr-2 space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#6222E4] transition-colors line-clamp-1">
                          {item.product ? item.product.name : item.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Right: Product Thumbnail */}
                      <div className="w-20 sm:w-24 h-full flex items-center justify-end shrink-0">
                        <img
                          src={displayImage}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/iphone17pro_reference.png';
                          }}
                        />
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
