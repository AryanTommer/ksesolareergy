"use client";

import Image from "next/image";
import { FaWhatsapp, FaCheckCircle, FaUsers } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import communityImg from "@/public/images/whatsapp_community.png";

export function WhatsAppCommunity() {
  const benefits = ["सब्सिडी अपडेट", "एक्सपर्ट सलाह", "असली अनुभव", "फ्री गाइड"];

  return (
    <section className="py-20 md:py-32 bg-emerald-50 relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/50 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron-200/50 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-white p-6 md:p-12 lg:p-16 shadow-[0_20px_80px_rgba(16,185,129,0.15)] flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content - Mobile First Stacking */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatedSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-200 mb-6 shadow-sm">
                <FaUsers className="text-emerald-600" /> हमारी फैमिली
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
                WhatsApp समुदाय से जुड़ें! 💬
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6">
                हमारे ग्रुप में <strong className="text-emerald-700 font-black px-1">5,000+ परिवार</strong> पहले से जुड़े हैं।<br/>
                सवाल पूछें, अपना अनुभव शेयर करें, और नई अपडेट्स पाएं!
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm md:text-base text-slate-500 font-semibold mb-10">
                <span>🚫 कोई स्पैम नहीं</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span>✅ सिर्फ काम की जानकारी</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span>🔓 कभी भी छोड़ें</span>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-10">
              {benefits.map((bnf, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 text-sm md:text-base font-bold text-slate-700 hover:border-emerald-300 hover:shadow-md transition-all cursor-default">
                  <FaCheckCircle className="text-emerald-500 text-lg" /> {bnf}
                </div>
              ))}
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <a 
                href="https://wa.me/919999999999?text=मुझे PM सूर्य घर WhatsApp ग्रुप में जोड़ें" 
                target="_blank" 
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#25D366] text-white px-8 py-5 md:py-6 rounded-3xl font-black text-xl md:text-2xl shadow-[0_20px_40px_-10px_rgba(37,211,102,0.5)] hover:bg-[#20BE5C] hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all"
              >
                <FaWhatsapp className="text-3xl md:text-4xl" /> फ्री में जुड़ें
              </a>
            </AnimatedSection>
          </div>

          {/* Premium Image Column */}
          <div className="flex-1 w-full max-w-md lg:max-w-none mx-auto -order-1 lg:order-none mb-10 lg:mb-0">
            <AnimatedSection direction="left" delay={0.3} className="relative">
              {/* Decorative rings behind image */}
              <div className="absolute inset-0 border-4 border-emerald-400/20 rounded-full scale-105 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 border-4 border-dashed border-emerald-500/20 rounded-full scale-110 animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="relative aspect-square w-full rounded-full overflow-hidden shadow-[0_30px_60px_rgba(16,185,129,0.3)] border-8 border-white animate-float z-10 bg-emerald-100">
                <Image 
                  src={communityImg}
                  alt="Happy neighbours looking at a smartphone"
                  fill
                  className="object-cover"
                  placeholder="blur"
                />
                
                {/* Floating WhatsApp Bubble overlay */}
                <div className="absolute -bottom-4 right-10 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl flex items-center gap-3 animate-pulse-green">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white text-xl">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold">नया मैसेज</div>
                    <div className="text-sm font-black text-slate-800">"मेरी सब्सिडी आ गई! 🎉"</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
