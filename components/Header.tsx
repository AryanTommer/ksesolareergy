"use client";

import { useState, useEffect } from "react";
import { FaSun, FaShieldAlt, FaLock, FaCertificate, FaUsers, FaBolt } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 to-emerald-500 origin-left z-[101]"
        style={{ scaleX }}
      />
      
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-lg shadow-saffron-500/30">
              <FaSun className="text-white text-lg md:text-xl" />
            </div>
            <div>
              <div className="font-extrabold text-sm md:text-base text-slate-900 leading-tight">PM सूर्य घर</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">उत्तर प्रदेश</div>
            </div>
          </div>
          <a href="#apply-form" className="btn-premium py-2 px-4 md:py-3 md:px-6 text-sm flex items-center gap-2 rounded-xl">
            <FaBolt /> 
            <span className="hidden sm:inline">अभी आवेदन करें</span>
            <span className="sm:hidden">आवेदन</span>
          </a>
        </div>
      </header>

      {/* Trust Bar - Adjusted top padding to sit under transparent/sticky header space */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-3 px-4 text-center mt-[76px] md:mt-[88px] relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 items-center text-white/90 text-[10px] md:text-xs lg:text-sm font-semibold">
          <span className="flex items-center gap-1.5"><FaShieldAlt className="text-emerald-300" /> सरकार द्वारा प्रमाणित</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><FaLock className="text-emerald-300" /> कोई छुपी फ़ीस नहीं</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><FaCertificate className="text-emerald-300" /> 25 साल की गारंटी</span>
          <span className="text-white/30 hidden lg:inline">|</span>
          <span className="flex items-center gap-1.5"><FaUsers className="text-emerald-300" /> 50,000+ परिवारों ने भरोसा किया</span>
        </div>
      </div>
    </>
  );
}
