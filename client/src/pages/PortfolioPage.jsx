import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function PortfolioPage() {
  const formatCurrency = (val) => `₹${Number(val).toLocaleString('en-IN')}`;

  const funds = [
    { name: 'Parag Parikh Flexi Cap Fund - Direct (G)', units: '420.5', value: 185000, returns: '+18.4%', cagr: '16.2%' },
    { name: 'Mirae Asset Large Cap Fund - Direct (G)', units: '310.2', value: 145000, returns: '+14.8%', cagr: '13.5%' },
    { name: 'Nippon India Small Cap Fund - Direct (G)', units: '190.8', value: 120000, returns: '+24.1%', cagr: '21.0%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Portfolio Summary Header */}
      <div className="bg-gradient-to-r from-[#1E0B49] to-[#6222E4] rounded-3xl p-6 sm:p-8 text-white shadow-fi-elevated mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-purple-200 mb-1">
              <Wallet className="w-4 h-4" />
              <span>1Fi Mutual Fund Portfolio</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">₹4,50,000</div>
            <div className="text-xs text-purple-200 mt-1 flex items-center space-x-1.5">
              <span className="text-emerald-300 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +16.8% Overall Growth
              </span>
              <span>•</span>
              <span>CAMS & KFintech Verified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center font-bold text-slate-900 bg-white hover:bg-purple-50 rounded-xl px-5 py-3 text-xs sm:text-sm shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4 mr-2 text-[#6222E4]" />
              <span>Shop on 0% MF EMI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-fi-card">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Your Eligible Holdings for Marketplace Lien</h3>
            <p className="text-xs text-slate-500">Pledge without liquidating to buy iPhone, Galaxy, and Laptops on 0% EMI.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            100% Eligible
          </span>
        </div>

        <div className="space-y-4">
          {funds.map((fund, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-[#F8F6FE] transition-colors gap-3">
              <div>
                <div className="font-bold text-slate-900 text-sm">{fund.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">Holding Units: {fund.units}</div>
              </div>
              <div className="flex items-center space-x-6 text-right">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{formatCurrency(fund.value)}</div>
                  <div className="text-xs font-bold text-emerald-600">{fund.returns} Return</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
