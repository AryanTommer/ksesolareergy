"use client";

import Image from "next/image";
import { FaGift, FaBolt, FaRupeeSign, FaPiggyBank, FaShieldAlt } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import bentoImg from "@/public/images/bento_solar.png";

export function BenefitsBento() {
  return (
    <section className="py-20 md:py-32 bg-slate-900 relative">
      {/* Dark theme for this section creates a premium high-agency feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[600px] bg-saffron-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-saffron-500/10 text-saffron-400 px-4 py-2 rounded-full font-bold text-sm border border-saffron-500/20 mb-6 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <FaGift className="text-saffron-400" /> फायदे ही फायदे
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight text-balance">
            PM सूर्य घर योजना के <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-400 to-emerald-400">अनोखे फायदे</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            एक बार लगाओ, 25 साल तक फायदा पाओ!
          </p>
        </AnimatedSection>

        {/* TRUE BENTO GRID (Mobile First) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(280px,auto)]">
          
          {/* Main Showcase Image Card - Spans 2 cols on Large */}
          <AnimatedSection direction="up" delay={0.2} className="md:col-span-2 lg:col-span-2 row-span-2">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-700/50">
              <Image 
                src={bentoImg} 
                alt="Beautiful premium solar panels on an Indian home roof" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
                <div className="bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-5 py-2 rounded-full inline-block text-emerald-300 font-bold mb-4">
                  🎯 सबसे बड़ा फायदा
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 text-balance">
                  60% सरकारी सब्सिडी सीधे आपके खाते में।
                </h3>
                <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg">
                  सरकार खर्च का 60% खुद देती है। आपका निवेश बहुत कम, और रिटर्न 25 सालों तक!
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Simple Stat Card 1 */}
          <AnimatedSection direction="up" delay={0.3} className="h-full">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-[2rem] h-full flex flex-col hover:bg-slate-800 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-saffron-500/20 flex items-center justify-center mb-8 border border-saffron-500/30 group-hover:scale-110 transition-transform">
                <FaBolt className="text-3xl text-saffron-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">300 यूनिट फ्री</h4>
              <p className="text-slate-400 text-[17px] leading-relaxed mb-8 flex-grow">
                हर महीने 300 यूनिट तक बिजली मुफ्त। गर्मियों में AC चलाएं, फ्रिज चलाएं, बिल की फिक्र खत्म!
              </p>
              <div className="bg-saffron-500/10 border border-saffron-500/20 text-saffron-400 font-bold px-4 py-3 rounded-xl w-full text-center">
                💡 बचत: ₹3,000/महीना
              </div>
            </div>
          </AnimatedSection>

          {/* Simple Stat Card 2 */}
          <AnimatedSection direction="up" delay={0.4} className="h-full">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-[2rem] h-full flex flex-col hover:bg-slate-800 transition-colors group">
               <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <FaRupeeSign className="text-3xl text-emerald-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">अतिरिक्त कमाई</h4>
              <p className="text-slate-400 text-[17px] leading-relaxed mb-8 flex-grow">
                जो बिजली आप इस्तेमाल नहीं करते, उसे पावर ग्रिड को बेचें। नेट मीटरिंग से सीधा फायदा।
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-4 py-3 rounded-xl w-full text-center">
                🤑 कमाई: ₹17,500/साल
              </div>
            </div>
          </AnimatedSection>

          {/* Double Width Banner Component logic on md */}
          <AnimatedSection direction="up" delay={0.5} className="md:col-span-2 lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 backdrop-blur-xl border border-blue-500/30 p-8 md:p-10 rounded-[2rem] h-full flex flex-col md:flex-row items-center gap-8 group hover:border-blue-400/50 transition-colors">
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-[2rem] bg-blue-500/20 flex items-center justify-center border border-blue-500/30 group-hover:rotate-12 transition-transform">
                <FaShieldAlt className="text-4xl md:text-5xl text-blue-400" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">25 साल की सरकारी गारंटी</h4>
                <p className="text-slate-300 text-lg">
                  एक बार लगवाएं और जीवन भर के लिए निश्चिंत हो जाएं। कोई भारी मेंटेनेंस नहीं, सरकार द्वारा प्रमाणित विश्वस्तरीय वारंटी!
                </p>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
}
