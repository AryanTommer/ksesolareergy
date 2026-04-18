"use client";

import { useState, useEffect } from "react";
import { FaShieldAlt, FaLock, FaCertificate, FaUsers, FaBolt, FaBars, FaTimes } from "react-icons/fa";
import { KSELogo } from "./KSELogo";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: "होम", path: "/" },
    { name: "सेवाएँ", path: "/services" },
    { name: "उत्पाद", path: "/products" },
    { name: "हमारे बारे में", path: "/about" },
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron-500 to-emerald-500 origin-left z-[102]"
        style={{ scaleX }}
      />
      
      <header 
        className={`fixed top-0 left-0 right-0 z-[101] transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 relative z-[102]" onClick={() => setIsMobileMenuOpen(false)}>
            <KSELogo className="w-10 h-10 md:w-12 md:h-12" />
            <div>
              <div className="font-extrabold text-sm md:text-base text-slate-900 leading-tight">PM सूर्य घर</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium">उत्तर प्रदेश</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className="font-bold text-slate-700 hover:text-saffron-500 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="/#apply-form" className="btn-premium py-2 px-4 md:py-3 md:px-6 text-sm flex items-center gap-2 rounded-xl hidden md:flex">
              <FaBolt /> 
              <span>अभी आवेदन करें</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-700 hover:text-saffron-500 transition-colors relative z-[102]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col h-screen"
          >
            <nav className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className="font-extrabold text-2xl text-slate-800 hover:text-saffron-500 border-b border-gray-100 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <a 
                href="/#apply-form" 
                className="btn-premium py-3 px-6 text-lg flex items-center justify-center gap-2 rounded-xl w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBolt /> 
                <span>अभी आवेदन करें</span>
              </a>
            </div>
            
            {/* Trust Badges in Mobile Menu */}
            <div className="mt-auto mb-10 flex flex-col gap-4 text-sm font-semibold text-slate-500 justify-center">
               <span className="flex items-center gap-2"><FaShieldAlt className="text-emerald-500" /> सरकार द्वारा प्रमाणित</span>
               <span className="flex items-center gap-2"><FaLock className="text-emerald-500" /> कोई छुपी फ़ीस नहीं</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
