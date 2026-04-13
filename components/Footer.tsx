"use client";

import { FaSun, FaWhatsapp, FaPhone, FaShieldAlt, FaLock, FaHeart } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Footer() {
  const quickLinks = [
    { label: "सब्सिडी जानकारी", href: "#subsidy" },
    { label: "बचत कैलकुलेटर", href: "#calculator" },
    { label: "पात्रता जाँचें", href: "#quiz" },
    { label: "अभी आवेदन करें", href: "#apply-form" },
    { label: "सामान्य प्रश्न", href: "#faq" },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <AnimatedSection direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shadow-lg shadow-saffron-500/30">
                <FaSun className="text-white text-xl" />
              </div>
              <div>
                <div className="font-extrabold text-lg leading-tight">PM सूर्य घर</div>
                <div className="text-slate-400 text-sm font-medium">उत्तर प्रदेश</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना के अंतर्गत UP के परिवारों को 
              60% सरकारी सब्सिडी के साथ सोलर पैनल लगवाने में मदद करना हमारा लक्ष्य है।
            </p>
            <div className="flex gap-2">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600/30 transition-colors"
              >
                <FaWhatsapp className="text-base" /> WhatsApp
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 bg-slate-700 text-slate-300 border border-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-600 transition-colors"
              >
                <FaPhone className="text-sm" /> Call
              </a>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection direction="up" delay={0.2}>
            <h3 className="text-white font-bold text-base mb-5 font-outfit">त्वरित लिंक</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-saffron-400 text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron-500/50 group-hover:bg-saffron-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Trust & Compliance */}
          <AnimatedSection direction="up" delay={0.3}>
            <h3 className="text-white font-bold text-base mb-5 font-outfit">विश्वास और सुरक्षा</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <FaShieldAlt className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>भारत सरकार द्वारा अधिकृत — Ministry of New and Renewable Energy (MNRE)</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <FaLock className="text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>आपकी जानकारी पूरी तरह सुरक्षित है। कोई छुपी फ़ीस नहीं।</span>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-bold mb-1">🕐 सोमवार–शनिवार</p>
                <p className="text-slate-400 text-xs">सुबह 9 बजे – शाम 7 बजे</p>
                <p className="text-slate-300 font-bold text-sm mt-2">Helpline: 1800-180-3333</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} PM सूर्य घर मुफ्त बिजली योजना — उत्तर प्रदेश।
          </p>
          <p className="flex items-center gap-1.5">
            <FaHeart className="text-rose-500 text-xs" />
            <span>UP के परिवारों के लिए बनाया गया</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
