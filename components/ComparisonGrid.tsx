"use client";

import { FaTimesCircle, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function ComparisonGrid() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 mb-6 shadow-sm">
            <FaExchangeAlt className="text-blue-500" /> तुलना
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            सोलर लगाने से पहले और बाद में 📊
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            देखिए कैसे ज़िंदगी बदल जाती है एक फैसले से!
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* BEFORE */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="glass-card relative overflow-hidden bg-gradient-to-br from-rose-50/50 to-white border-2 border-rose-200 h-full flex flex-col p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-10 -mt-10" />
              
              <div className="text-center mb-10 relative z-10">
                <div className="text-6xl mb-4">😰</div>
                <h3 className="text-2xl font-black text-rose-600">❌ सोलर से पहले</h3>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10 flex-grow">
                {[
                  { text: <>बिजली बिल: <strong className="text-rose-600">₹4,000-6,000/महीना</strong></> },
                  { text: <>साल का खर्च: <strong className="text-rose-600">₹48,000-72,000</strong></> },
                  { text: 'बिजली कटौती का टेंशन' },
                  { text: 'कोई अतिरिक्त कमाई नहीं' },
                  { text: <>25 साल में: <strong className="text-rose-600">₹12-18 लाख खर्च</strong></> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100">
                    <FaTimesCircle className="text-rose-500 text-xl flex-shrink-0" />
                    <span className="font-semibold text-slate-700 text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* AFTER */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="glass-card relative overflow-hidden bg-gradient-to-br from-emerald-50/50 to-white border-2 border-emerald-300 h-full flex flex-col p-8 shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -mr-10 -mt-10" />
              
              <div className="text-center mb-10 relative z-10">
                <div className="text-6xl mb-4">🥳</div>
                <h3 className="text-2xl font-black text-emerald-600">✅ सोलर लगाने के बाद</h3>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10 flex-grow">
                {[
                  { text: <>बिजली बिल: <strong className="text-emerald-600">₹0/महीना</strong></> },
                  { text: <>साल की बचत: <strong className="text-emerald-600">₹48,000-72,000</strong></> },
                  { text: '24×7 बिजली — कोई कटौती नहीं' },
                  { text: <>अतिरिक्त कमाई: <strong className="text-emerald-600">₹1,500/महीना</strong></> },
                  { text: <>25 साल में: <strong className="text-emerald-600">₹4.5 लाख+ फायदा</strong></> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-emerald-100">
                    <FaCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
                    <span className="font-semibold text-slate-800 text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
