"use client";

import Image from "next/image";
import { FaCheckCircle, FaBolt, FaCalculator, FaClock, FaUserCheck, FaFire } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import heroImg from "@/public/images/premium_hero_solar.png";
import modiImg from "@/public/images/portrait_modi.png";
import yogiImg from "@/public/images/portrait_yogi.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-20 md:pt-12 md:pb-32 selection:bg-saffron-500 selection:text-white">
      {/* Background Graphic elements */}
      <div className="absolute top-0 right-0 w-full md:w-3/4 h-[800px] opacity-10 md:opacity-20 pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-saffron-400 to-emerald-100 blur-3xl mix-blend-multiply" />
      </div>

      {/* ═══════ Leader Endorsement Bar — Always visible on mobile ═══════ */}
      <AnimatedSection direction="up" delay={0.05}>
        <div className="max-w-7xl mx-auto px-5 mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-4 sm:gap-6 bg-gradient-to-r from-saffron-50 via-white to-saffron-50 border border-saffron-200/60 rounded-2xl sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 shadow-[0_4px_20px_rgba(249,115,22,0.12)]">
            {/* Modi Portrait */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-[3px] ring-saffron-400 ring-offset-2 ring-offset-white shadow-lg flex-shrink-0">
                <Image
                  src={modiImg}
                  alt="प्रधानमंत्री"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">माननीय प्रधानमंत्री</p>
                <p className="text-[10px] sm:text-xs text-saffron-600 font-bold">केंद्र सरकार</p>
              </div>
            </div>

            {/* Center Divider + Scheme Name */}
            <div className="flex flex-col items-center gap-0.5 px-2 sm:px-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-[3px] bg-saffron-500 rounded-full" />
                <div className="w-3 h-[3px] bg-white rounded-full border border-slate-200" />
                <div className="w-3 h-[3px] bg-emerald-500 rounded-full" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-extrabold text-slate-500 tracking-wider uppercase mt-1">सरकारी योजना</span>
            </div>

            {/* Yogi Portrait */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block text-right">
                <p className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight">माननीय मुख्यमंत्री</p>
                <p className="text-[10px] sm:text-xs text-saffron-600 font-bold">उत्तर प्रदेश</p>
              </div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-[3px] ring-saffron-400 ring-offset-2 ring-offset-white shadow-lg flex-shrink-0">
                <Image
                  src={yogiImg}
                  alt="मुख्यमंत्री"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>
          </div>
          {/* Labels visible only on mobile (below the portraits) */}
          <div className="flex justify-between px-6 mt-2 sm:hidden">
            <span className="text-[10px] font-bold text-slate-600">माननीय प्रधानमंत्री</span>
            <span className="text-[10px] font-bold text-slate-600">माननीय मुख्यमंत्री</span>
          </div>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto px-5 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-saffron-50 text-saffron-600 px-4 py-2 rounded-full font-bold text-xs md:text-sm border border-saffron-200 mb-6 shadow-sm">
              <FaFire className="text-saffron-500 animate-pulse" /> UP में सबसे ज़्यादा आवेदन हो रहे हैं!
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight text-balance">
              अपनी छत को <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 to-saffron-600 drop-shadow-sm">सोना</span> बनाएं ☀️
            </h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-slate-600 font-semibold mb-3 leading-relaxed">
              ₹0 इन्वेस्टमेंट <span className="mx-2 text-slate-300">·</span> 25 साल फ्री बिजली <span className="mx-2 text-slate-300">·</span> ₹17,500/साल कमाई
            </p>
            <p className="text-sm md:text-base text-slate-500 mb-8 font-medium">
              प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना — उत्तर प्रदेश
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.4}>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
                <FaCheckCircle className="text-emerald-500" /> 60% सरकारी सब्सिडी
              </span>
              <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
                <FaCheckCircle className="text-emerald-500" /> फ्री सर्वे और इंस्टॉलेशन
              </span>
              <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
                <FaCheckCircle className="text-emerald-500" /> 300 यूनिट फ्री बिजली
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8 w-full sm:w-auto">
              <a href="#apply-form" className="btn-premium flex items-center justify-center gap-2 w-full sm:w-auto hover:scale-105 active:scale-95 transition-transform">
                <FaBolt /> 3 मिनट में आवेदन करें
              </a>
              <a href="#calculator" className="btn-outline flex items-center justify-center gap-2 w-full sm:w-auto bg-white/70">
                <FaCalculator /> बचत कैलकुलेटर
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <div className="flex items-center justify-center md:justify-start gap-3 text-slate-500 text-xs md:text-sm font-medium">
              <FaClock className="text-saffron-500 text-base" />
              <span>औसत 3 मिनट</span>
              <span className="text-slate-300">|</span>
              <FaUserCheck className="text-emerald-500 text-base" />
              <span>आज <strong className="text-saffron-600">47 लोगों</strong> ने आवेदन किया</span>
            </div>
          </AnimatedSection>
        </div>

        {/* Image Content with floating leader portraits on desktop */}
        <AnimatedSection direction="left" delay={0.3} className="relative mt-8 md:mt-0 w-full">
          <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/40">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 rounded-3xl pointer-events-none" />
            <Image 
              src={heroImg} 
              alt="PM सूर्य घर योजना — सोलर पैनल वाला भारतीय घर"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay text on image */}
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white drop-shadow-md hidden md:block">
              <p className="font-outfit font-bold text-3xl">PM Surya Ghar</p>
              <p className="text-white/90 text-sm font-medium">Powering 50,000+ homes in Uttar Pradesh</p>
            </div>
          </div>
          
          {/* Decorative floating element */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms] z-30 hidden lg:flex">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">शून्य बिल</p>
              <p className="text-xs text-slate-500">25 साल तक</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
