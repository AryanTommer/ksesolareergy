"use client";

import Image from "next/image";
import { FaVideo, FaPlay } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import thumbImg from "@/public/images/video_testimonial_thumb.png";

export function VideoProof() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-saffron-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-saffron-50 text-saffron-600 px-4 py-2 rounded-full font-bold text-sm border border-saffron-200 mb-6 shadow-sm">
            <FaVideo className="text-saffron-500" /> असली परिवार, असली कहानी
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            देखिए कैसे राज कुमार जी का बिजली बिल ₹0 हो गया 🎥
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            कानपुर (KESCO क्षेत्र) के राज कुमार जी ने बताया अपना अनुभव
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="glass-card overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 relative group cursor-pointer">
            
            {/* Thumbnail section */}
            <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden bg-slate-900">
              <Image 
                src={thumbImg}
                alt="Raj Kumar standing confidently outdoors"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-saffron-500/90 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_0_0_rgba(255,107,0,0.5)] animate-[pulse-green_2s_infinite]">
                  <FaPlay className="text-white text-3xl md:text-4xl ml-2" />
                </div>
                <p className="text-white font-bold text-lg md:text-xl drop-shadow-md">▶ वीडियो देखें (90 सेकंड)</p>
                <p className="text-white/80 text-xs md:text-sm mt-2 font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  राज कुमार जी, कानपुर — सोलर से ₹0 बिजली बिल
                </p>
              </div>
            </div>

            {/* Video Stats breakdown visually integrated into the bento card style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100/50">
              <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-slate-500 font-semibold mb-1">पहले का बिल</div>
                <div className="text-xl md:text-2xl font-black text-rose-500 font-outfit">₹5,000</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-slate-500 font-semibold mb-1">अब का बिल</div>
                <div className="text-xl md:text-2xl font-black text-emerald-500 font-outfit">₹0</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-slate-500 font-semibold mb-1">निवेश (सब्सिडी बाद)</div>
                <div className="text-xl md:text-2xl font-black text-blue-500 font-outfit">₹70,000</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-slate-500 font-semibold mb-1">अतिरिक्त कमाई</div>
                <div className="text-xl md:text-2xl font-black text-saffron-500 font-outfit">₹1,500/महीना</div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
