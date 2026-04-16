"use client";

import Image from "next/image";
import { FaTimesCircle, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import beforeImg from "@/public/images/before_solar.png";
import afterImg from "@/public/images/after_solar.png";

export function ComparisonGrid() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply opacity-20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply opacity-20 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 mb-6 flex-shrink-0 shadow-sm">
            <FaExchangeAlt className="text-blue-500" /> तुलना
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            सोलर लगाने से पहले और बाद में 📊
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            देखिए कैसे एक फैसले से आपकी ज़िंदगी और बचत दोनों बदल जाती है!
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* BEFORE CARD */}
          <AnimatedSection direction="left" delay={0.2} className="h-full">
            <div className="glass-card relative overflow-hidden h-full flex flex-col group border-2 border-rose-100 hover:border-rose-300 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Premium Image Header */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                <Image 
                  src={beforeImg} 
                  alt="Stressed family looking at high electricity bill" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  placeholder="blur"
                />
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-xl shadow-lg border-2 border-white/20 backdrop-blur-sm">
                      <FaTimesCircle />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white drop-shadow-md">सोलर से पहले</h3>
                  </div>
                </div>
              </div>
              
              {/* Content Body */}
              <div className="p-6 md:p-8 md:pt-10 flex flex-col gap-4 relative z-10 flex-grow bg-white/50 backdrop-blur-md">
                {[
                  { text: <>बिजली बिल: <strong className="text-rose-600 font-black">₹4,000-6,000/महीना</strong></> },
                  { text: <>साल का खर्च: <strong className="text-rose-600 font-black">₹48,000-72,000</strong></> },
                  { text: 'बिजली कटौती का भारी टेंशन' },
                  { text: 'कोई अतिरिक्त कमाई नहीं' },
                  { text: <>25 साल में: <strong className="text-rose-600 font-black">₹15 लाख+ खर्च</strong></> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 lg:p-5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-rose-50/50 hover:bg-white transition-colors">
                    <FaTimesCircle className="text-rose-400 text-xl md:text-2xl flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-700 text-base md:text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* AFTER CARD */}
          <AnimatedSection direction="right" delay={0.3} className="h-full">
            <div className="glass-card relative overflow-hidden h-full flex flex-col group border-2 border-emerald-400 hover:border-emerald-500 transition-colors shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)] hover:-translate-y-1">
              {/* Premium Image Header */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                <Image 
                  src={afterImg} 
                  alt="Happy family enjoying free electricity with AC" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  placeholder="blur" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/30 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-white/20 backdrop-blur-sm animate-pulse-green">
                      <FaCheckCircle />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white drop-shadow-md">सोलर के बाद</h3>
                  </div>
                </div>
              </div>
              
              {/* Content Body */}
              <div className="p-6 md:p-8 md:pt-10 flex flex-col gap-4 relative z-10 flex-grow bg-emerald-50/30 backdrop-blur-md">
                {[
                  { text: <>बिजली बिल: <strong className="text-emerald-700 font-black">₹0/महीना</strong></> },
                  { text: <>साल की बचत: <strong className="text-emerald-700 font-black">₹48,000-72,000</strong></> },
                  { text: '24×7 बिजली — AC चलाने की आज़ादी' },
                  { text: <>अतिरिक्त कमाई: <strong className="text-emerald-700 font-black">₹1,500/महीना</strong></> },
                  { text: <>25 साल में: <strong className="text-emerald-700 font-black">₹4.5 लाख+ फायदा</strong></> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 lg:p-5 bg-white backdrop-blur-xl rounded-2xl shadow-sm border border-emerald-100 hover:border-emerald-300 transition-colors">
                    <FaCheckCircle className="text-emerald-500 text-xl md:text-2xl flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800 text-base md:text-lg">{item.text}</span>
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
