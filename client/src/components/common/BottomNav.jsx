import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, ShoppingBag, CreditCard, User } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Portfolio', path: '/portfolio', icon: PieChart },
    { label: 'Shop', path: '/', icon: ShoppingBag, isShop: true },
    { label: 'Loans', path: '/portfolio#loans', icon: CreditCard },
    { label: 'Profile', path: '/portfolio#profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-2 safe-bottom shadow-lg">
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isShop 
            ? (currentPath === '/' || currentPath === '/shop' || currentPath.startsWith('/products'))
            : currentPath === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-[#6222E4]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.isShop && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#6222E4] ring-2 ring-white"></span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
