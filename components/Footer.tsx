"use client";

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaLock, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

interface Settings {
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
}

export function Footer() {
  const [settings, setSettings] = useState<Settings>({
    phone: "1800-XXX-XXXX",
    whatsapp: "+91 99999-99999",
    email: "info@suryagharup.in",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.phone) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const whatsappNumber = settings.whatsapp.replace(/[^0-9]/g, "");

  return (
    <>
      <section className="py-20 md:py-24 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="max-w-6xl mx-auto px-5 relative z-10 text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-4">अभी भी सोच रहे हैं? 🤔</h2>
          <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">
            UP में हर महीने <strong className="text-white">500 स्लॉट</strong> भरे जा रहे हैं। देर करने पर इंतज़ार लंबा हो सकता है!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#apply-form" className="btn-premium px-10">
              अभी आवेदन करें
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=PM सूर्य घर योजना के बारे में जानकारी चाहिए`} target="_blank" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <FaWhatsapp className="inline mr-2" /> WhatsApp पर पूछें
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10 border-t border-white/10 pt-16">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="font-extrabold text-xl mb-4 text-white">PM सूर्य घर योजना</h4>
              <p className="text-slate-400 leading-relaxed font-medium">प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना के तहत उत्तर प्रदेश के परिवारों को सोलर पैनल लगाने में मदद और सीधे बैंक में 60% सब्सिडी।</p>
            </div>
            <div>
              <h4 className="font-extrabold text-xl mb-4 text-white">उपयोगी लिंक</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-saffron-400 font-medium transition-colors">सरकारी पोर्टल</a></li>
                <li><a href="#" className="text-slate-400 hover:text-saffron-400 font-medium transition-colors">सब्सिडी स्टेटस चेक</a></li>
                <li><a href="#" className="text-slate-400 hover:text-saffron-400 font-medium transition-colors">अप्रूव्ड वेंडर लिस्ट</a></li>
                <li><a href="#" className="text-slate-400 hover:text-saffron-400 font-medium transition-colors">गोपनीयता नीति</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-extrabold text-xl mb-4 text-white">संपर्क करें</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaPhoneAlt className="text-emerald-500" /> {settings.phone} (टोल फ्री)</li>
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaWhatsapp className="text-emerald-500 text-lg" /> {settings.whatsapp}</li>
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaEnvelope className="text-saffron-500" /> {settings.email}</li>
                <li className="flex items-center gap-4 mt-4">
                  <a href={settings.facebook || "#"} target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <FaFacebook className="text-white text-lg" />
                  </a>
                  <a href={settings.instagram || "#"} target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <FaInstagram className="text-white text-lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 font-medium text-sm text-center md:text-left">© 2026 PM सूर्य घर योजना UP | सर्वाधिकार सुरक्षित</p>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><FaLock className="text-emerald-500" /> SSL Secured</span>
              <span>|</span>
              <span>MNRE Approved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <a href={`https://wa.me/${whatsappNumber}?text=मुझे PM सूर्य घर योजना के बारे में जानकारी चाहिए`} target="_blank" className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform group">
        <div className="absolute inset-0 border-2 border-[#25D366] rounded-full animate-ping opacity-75" />
        <FaWhatsapp className="relative z-10" />
      </a>
    </>
  );
}
