import React from 'react';
import { Smartphone, ShieldCheck, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Smartphone,
      title: 'Select Your Dream Device',
      desc: 'Browse flagship smartphones, laptops, and tablets with customizable No-Cost EMI plans.'
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Digital Lien via CAMS / KFintech',
      desc: 'Mark a temporary paperless lien of 1.25x collateral. Zero liquidation, zero tax events, zero paper forms.'
    },
    {
      num: '03',
      icon: TrendingUp,
      title: 'Keep Earning Compound Returns',
      desc: 'Your mutual fund units remain invested, continuing to compound at ~14% p.a. while you pay simple monthly EMIs.'
    }
  ];

  return (
    <section id="how-it-works" className="my-20 max-w-6xl mx-auto px-4 text-center">
      
      {/* Pill Badge */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 shadow-sm mb-4">
        <span>How It Works</span>
      </div>

      {/* Heading matching screenshot style */}
      <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-12">
        <span className="font-serif italic font-normal text-slate-400">Shop using</span>{' '}
        <strong className="text-slate-950">mutual funds</strong>
      </h2>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-fi-card hover:shadow-fi-elevated transition-all relative overflow-hidden group"
            >
              <div className="text-4xl font-extrabold text-[#6222E4]/15 mb-4">
                {step.num}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#F8F6FE] border border-[#E8E1FB] text-[#6222E4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Link
          to="/products/apple-iphone-17-pro"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#6222E4] hover:text-[#5019C3] transition-colors"
        >
          <span>See live example with iPhone 17 Pro EMI calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  );
}
