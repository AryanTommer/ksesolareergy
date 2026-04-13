"use client";

import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function WhatsAppCommunity() {
  const benefits = ["सब्सिडी अपडेट", "एक्सपर्ट सलाह", "असली अनुभव", "फ्री गाइड"];

  return (
    <section className="py-20 md:py-32 bg-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-[100px] rotate-45 transform translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200 rounded-[100px] rotate-45 transform -translate-x-1/2 translate-y-1/2 opacity-50" />

      <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-5xl md:text-7xl mb-6 animate-wave inline-block origin-[70%_70%]">👋</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            WhatsApp समुदाय से जुड़ें! 💬
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
            हमारे WhatsApp ग्रुप में <strong className="text-emerald-700">5,000+ परिवार</strong> पहले से जुड़े हैं।<br/>
            सवाल पूछें, अनुभव शेयर करें, अपडेट पाएं — सब एक जगह!
          </p>
          <p className="text-sm md:text-base text-slate-500 font-semibold mb-12">
            कोई स्पैम नहीं <span className="mx-2 text-slate-300">·</span> सिर्फ उपयोगी जानकारी <span className="mx-2 text-slate-300">·</span> कभी भी छोड़ सकते हैं
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {benefits.map((bnf, i) => (
            <div key={i} className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-emerald-100 text-sm md:text-base font-bold text-emerald-800">
              <FaCheckCircle className="text-emerald-500" /> {bnf}
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <a href="https://wa.me/919999999999?text=मुझे PM सूर्य घर WhatsApp ग्रुप में जोड़ें" target="_blank" className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-lg md:text-xl shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] hover:scale-105 hover:bg-emerald-600 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.6)] transition-all">
            <FaWhatsapp className="text-3xl" /> WhatsApp ग्रुप से जुड़ें (फ्री)
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
