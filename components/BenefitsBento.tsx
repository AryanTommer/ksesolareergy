"use client";

import { FaGift } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function BenefitsBento() {
  const benefits = [
    {
      emoji: "⚡",
      title: "300 यूनिट फ्री बिजली",
      desc: "हर महीने 300 यूनिट तक बिजली मुफ्त। बिल लगभग ₹0!",
      badge: "💡 बचत: ₹3,000/महीना",
      badgeCol: "bg-saffron-50 text-saffron-600",
      topCol: "border-t-saffron-500"
    },
    {
      emoji: "💰",
      title: "60% सरकारी सब्सिडी",
      desc: "सरकार खर्च का 60% खुद देती है। आपका निवेश बहुत कम!",
      badge: "🏦 सीधे बैंक में ₹78,000 तक",
      badgeCol: "bg-emerald-50 text-emerald-600",
      topCol: "border-t-emerald-500"
    },
    {
      emoji: "📈",
      title: "अतिरिक्त कमाई करें",
      desc: "एक्स्ट्रा बिजली सरकार को बेचें, नेट मीटरिंग से पैसे कमाएं!",
      badge: "🤑 कमाई: ₹17,500/साल",
      badgeCol: "bg-blue-50 text-blue-600",
      topCol: "border-t-blue-500"
    },
    {
      emoji: "🛡️",
      title: "25 साल की वारंटी",
      desc: "कोई मेंटेनेंस खर्च नहीं। पैनल 25 साल चलते हैं!",
      badge: "✅ ज़ीरो मेंटेनेंस कॉस्ट",
      badgeCol: "bg-purple-50 text-purple-600",
      topCol: "border-t-purple-500"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-200 mb-6 shadow-sm">
            <FaGift className="text-emerald-500" /> फायदे ही फायदे
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight text-balance">
            PM सूर्य घर योजना के फायदे 🎁
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            एक बार लगाओ, 25 साल तक फायदा पाओ!
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((bnf, i) => (
            <AnimatedSection key={i} direction="up" delay={0.1 * (i + 1)} className="h-full">
              <div className={`glass-card p-8 h-full flex flex-col items-center text-center border-t-4 hover:scale-[1.02] ${bnf.topCol}`}>
                <div className="text-5xl mb-6 bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl shadow-inner border border-slate-100">
                  {bnf.emoji}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{bnf.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">
                  {bnf.desc}
                </p>
                <div className={`mt-auto px-4 py-2 rounded-xl font-bold text-xs md:text-sm w-full ${bnf.badgeCol}`}>
                  {bnf.badge}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
