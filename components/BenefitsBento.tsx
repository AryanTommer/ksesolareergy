"use client";

import Image from "next/image";
import { FaGift, FaBolt, FaRupeeSign, FaShieldAlt } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";
import { motion } from "framer-motion";
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

        {/* BENTO GRID - 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">

          {/* Main Showcase Image Card - Spans 2 cols on Large */}
          <AnimatedSection direction="up" delay={0.2} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <motion.div
              className="relative w-full h-[400px] lg:h-full min-h-[500px] rounded-[2rem] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-700/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={bentoImg}
                alt="Beautiful premium solar panels on an Indian home roof"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-saffron-500/0 via-saffron-500/10 to-saffron-500/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />

              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10">
                <motion.div
                  className="bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md px-5 py-2 rounded-full inline-block text-emerald-300 font-bold mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯 सबसे बड़ा फायदा
                </motion.div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 text-balance">
                  60% सरकारी सब्सिडी सीधे आपके खाते में।
                </h3>
                <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg">
                  सरकार खर्च का 60% खुद देती है। आपका निवेश बहुत कम, और रिटर्न 25 सालों तक!
                </p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Stat Card 1 - 300 Units Free */}
          <AnimatedSection direction="right" delay={0.3} className="lg:col-span-2">
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 lg:p-8 rounded-[2rem] h-full flex flex-col hover:bg-slate-800/80 transition-all duration-300 group hover:border-saffron-500/30"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-saffron-500/20 flex items-center justify-center mb-6 border border-saffron-500/30"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaBolt className="text-2xl lg:text-3xl text-saffron-400" />
              </motion.div>
              <h4 className="text-xl lg:text-2xl font-bold text-white mb-3">300 यूनिट फ्री</h4>
              <p className="text-slate-400 text-base lg:text-[17px] leading-relaxed mb-6 flex-grow">
                हर महीने 300 यूनिट तक बिजली मुफ्त। गर्मियों में AC चलाएं, फ्रिज चलाएं, बिल की फिक्र खत्म!
              </p>
              <motion.div
                className="bg-saffron-500/10 border border-saffron-500/20 text-saffron-400 font-bold px-4 py-3 rounded-xl w-full text-center"
                whileHover={{ scale: 1.02 }}
              >
                💡 बचत: ₹3,000/महीना
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Stat Card 2 - Extra Income */}
          <AnimatedSection direction="right" delay={0.4} className="lg:col-span-2">
            <motion.div
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 lg:p-8 rounded-[2rem] h-full flex flex-col hover:bg-slate-800/80 transition-all duration-300 group hover:border-emerald-500/30"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <FaRupeeSign className="text-2xl lg:text-3xl text-emerald-400" />
              </motion.div>
              <h4 className="text-xl lg:text-2xl font-bold text-white mb-3">अतिरिक्त कमाई</h4>
              <p className="text-slate-400 text-base lg:text-[17px] leading-relaxed mb-6 flex-grow">
                जो बिजली आप इस्तेमाल नहीं करते, उसे पावर ग्रिड को बेचें। नेट मीटरिंग से सीधा फायदा।
              </p>
              <motion.div
                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-4 py-3 rounded-xl w-full text-center"
                whileHover={{ scale: 1.02 }}
              >
                🤑 कमाई: ₹17,500/साल
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Full Width Banner - 25 Year Guarantee */}
          <AnimatedSection direction="up" delay={0.5} className="md:col-span-2 lg:col-span-4">
            <motion.div
              className="bg-gradient-to-r from-blue-900/40 via-slate-800/40 to-blue-900/40 backdrop-blur-xl border border-blue-500/30 p-6 md:p-8 lg:p-10 rounded-[2rem] h-full flex flex-col md:flex-row items-center gap-6 lg:gap-8 group hover:border-blue-400/50 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-[1.5rem] lg:rounded-[2rem] bg-blue-500/20 flex items-center justify-center border border-blue-500/30"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaShieldAlt className="text-3xl md:text-4xl lg:text-5xl text-blue-400" />
              </motion.div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-3">25 साल की सरकारी गारंटी</h4>
                <p className="text-slate-300 text-base lg:text-lg">
                  एक बार लगवाएं और जीवन भर के लिए निश्चिंत हो जाएं। कोई भारी मेंटेनेंस नहीं, सरकार द्वारा प्रमाणित विश्वस्तरीय वारंटी!
                </p>
              </div>
              <motion.div
                className="hidden lg:flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-6 py-3 rounded-xl text-blue-300 font-bold"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ भरोसेमंद
              </motion.div>
            </motion.div>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
}
