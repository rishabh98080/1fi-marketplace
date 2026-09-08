import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export { SHOP_TABS } from '../shop/ShopNavigation';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation items matching Screenshot From 2026-09-07 22-01-23.png
  const navItems = [
    { label: 'Home', path: '/', isHome: true },
    { label: 'About Us', path: '/#about' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Shop', path: '/shop' },
    { label: 'Calculator', path: '/#calculator' },
    { label: 'Contact Us', path: '/#contact' },
    { label: 'Partner With Us', path: '/#partner' },
    { label: 'FAQs', path: '/#faqs' }
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-4 sm:px-6 w-full">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between relative transition-all">
        
        {/* Left: 1Fi Square Logo Icon (Exact match to screenshot) */}
        <Link to="/" className="flex items-center group">
          <div className="w-9 h-9 rounded-xl bg-[#6339F6] overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <img 
              src="/logo.png" 
              alt="1Fi" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback typography if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-white font-extrabold text-sm tracking-tight hidden">1Fi</span>
          </div>
        </Link>

        {/* Center: Navigation Links (Exact 8 items from screenshot) */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13.5px] font-medium text-[#475569]">
          {navItems.map((item) => {
            const isActive = item.isHome && currentPath === '/';

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`transition-colors duration-150 hover:text-[#6339F6] ${
                  isActive ? 'text-[#6339F6] font-semibold' : 'text-[#475569]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Shop Now ↗ Button + Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center text-[13.5px] font-semibold text-white bg-[#6339F6] hover:bg-[#5227E8] active:scale-95 transition-all rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 shadow-sm"
          >
            <span>Shop Now</span>
            <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.2]" />
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = item.isHome && currentPath === '/';
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-[#6339F6] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#6339F6]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
