"use client";

import { useState } from "react";
import { FaCalculator, FaBolt } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function SavingsCalculator() {
  const [bill, setBill] = useState(3000);

  const yearlySavings = bill * 12;
  const lifetimeSavings = yearlySavings * 25;
  const subsidyAmount = bill <= 2000 ? 30000 : bill <= 3000 ? 60000 : 78000;
  const recommendedSystem = bill <= 2000 ? "1 kW" : bill <= 3000 ? "2 kW" : bill <= 5000 ? "3 kW" : "4 kW+";

  return (
    <section id="calculator" className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-3xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-saffron-50 text-saffron-600 px-4 py-2 rounded-full font-bold text-sm border border-saffron-200 mb-6 shadow-sm">
            <FaCalculator className="text-saffron-500" /> बचत कैलकुलेटर
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            अपना फायदा चेक करें! 💸
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            बस अपना महीने का बिजली बिल बताइए — हम बताएंगे कितना फायदा होगा
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="glass-card p-6 md:p-10 border-2 border-saffron-200/60 shadow-[0_20px_50px_rgba(255,153,51,0.08)]">
            
            <div className="mb-10">
              <label className="block text-slate-900 font-bold md:text-lg mb-6 text-center md:text-left">
                📄 आपका महीने का बिजली बिल कितना आता है?
              </label>
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                <div className="w-full md:w-3/4">
                  <input 
                    type="range" 
                    min="500" max="10000" step="250" 
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-saffron-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-semibold mt-3 px-1">
                    <span>₹500</span>
                    <span>₹10,000</span>
                  </div>
                </div>
                <div className="bg-saffron-50 border border-saffron-200 py-3 px-6 rounded-2xl md:w-1/4 text-center shadow-inner">
                  <span className="text-3xl font-black text-saffron-600 font-outfit">₹{bill.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-xs md:text-sm text-emerald-800 font-bold mb-2">💡 महीने की बचत</div>
                <div className="text-xl md:text-2xl font-black text-emerald-600 font-outfit">₹{bill.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-xs md:text-sm text-amber-800 font-bold mb-2">📅 साल की बचत</div>
                <div className="text-xl md:text-2xl font-black text-amber-600 font-outfit">₹{yearlySavings.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-xs md:text-sm text-blue-800 font-bold mb-2">🏦 सब्सिडी मिलेगी</div>
                <div className="text-xl md:text-2xl font-black text-blue-600 font-outfit">₹{subsidyAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 p-4 rounded-2xl text-center shadow-sm">
                <div className="text-xs md:text-sm text-purple-800 font-bold mb-2">🏡 25 साल फायदा</div>
                <div className="text-xl md:text-2xl font-black text-purple-600 font-outfit">₹{lifetimeSavings.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/50 p-4 rounded-xl text-center mb-8">
              <span className="text-emerald-800 font-semibold text-sm md:text-base">
                🎯 आपके लिए <strong className="text-emerald-600 font-black text-lg px-1">{recommendedSystem}</strong> सोलर सिस्टम सबसे सही रहेगा!
              </span>
            </div>

            <a href="#apply-form" className="btn-premium flex w-full justify-center">
              <FaBolt className="mr-2" /> अभी आवेदन करें — ₹0 में शुरू करें!
            </a>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
