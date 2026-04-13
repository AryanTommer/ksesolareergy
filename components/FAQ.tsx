"use client";

import { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaPhoneAlt, FaEnvelope, FaLock, FaWhatsapp } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

const faqs = [
  { q: "💰 क्या सच में मुफ्त में सोलर पैनल लगेगा?", a: "बिल्कुल मुफ्त नहीं, लेकिन सरकार 60% सब्सिडी देती है जो सीधे आपके बैंक खाते में आती है। बाकी 40% आप अपनी जेब से या बैंक लोन से भर सकते हैं। 3 kW सिस्टम पर ₹78,000 तक सब्सिडी मिलती है। कोई छुपी हुई फीस नहीं है।" },
  { q: "🏠 क्या छोटी छत पर भी सोलर लग सकता है?", a: "हाँ! 1 kW सिस्टम के लिए सिर्फ 100 वर्ग फुट (10×10) जगह काफी है। 2 kW के लिए 200 sqft और 3 kW के लिए 300 sqft चाहिए। फ्री सर्वे में टीम आपकी छत चेक करके बताएगी कि कितना बड़ा सिस्टम लग सकता है।" },
  { q: "⏳ सब्सिडी का पैसा कितने दिन में आएगा?", a: "इंस्टॉलेशन और सरकारी इंस्पेक्शन के बाद 2-3 हफ्ते में सब्सिडी सीधे बैंक खाते में आ जाती है। पूरी प्रक्रिया (आवेदन से लेकर सब्सिडी मिलने तक) में लगभग 45-60 दिन लगते हैं।" },
  { q: "🔧 25 साल बाद सोलर पैनल का क्या होगा?", a: "25 साल बाद भी सोलर पैनल काम करते रहते हैं! बस उनकी क्षमता थोड़ी कम (लगभग 80-85%) हो जाती है। यानी 25 साल बाद भी बिजली बनती रहेगी। पैनल की उम्र 30-35 साल तक होती है।" },
  { q: "🌧️ बारिश या बादलों में बिजली बनेगी?", a: "हाँ, बादलों में भी बिजली बनती है, बस थोड़ी कम। बारिश के मौसम में 50-70% बिजली बनती है। और अच्छी बात ये है कि UP में साल में 250+ दिन धूप रहती है, जो सोलर के लिए बहुत अच्छा है!" },
  { q: "🏦 क्या लोन की सुविधा भी मिलती है?", a: "हाँ! SBI, PNB, BOB जैसे सरकारी बैंक सोलर के लिए विशेष लोन देते हैं। ब्याज दर बहुत कम (7-8%) है और EMI ₹800-1,500/महीना पड़ती है — जो आपकी बिजली बचत से कवर हो जाती है। यानी जेब से कुछ नहीं जाता!" },
  { q: "⚡ क्या AC, फ्रिज, मोटर चला सकते हैं?", a: "बिल्कुल! 3 kW सिस्टम से आप आराम से 1 AC + फ्रिज + पंखे + लाइट + वॉशिंग मशीन सब चला सकते हैं। गर्मी में भी कोई दिक्कत नहीं होती। सोलर + ग्रिड दोनों साथ काम करते हैं।" },
  { q: "🤔 क्या यह स्कैम/फ्रॉड नहीं है?", a: "बिल्कुल नहीं! यह भारत सरकार की आधिकारिक योजना है जो PM मोदी जी ने शुरू की है। सब्सिडी सीधे MNRE (Ministry of New & Renewable Energy) से आपके बैंक खाते में आती है। आप pmsuryaghar.gov.in पर सरकारी पोर्टल पर वेरिफाई कर सकते हैं।" }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0); // First one open by default

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-3xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 mb-6 shadow-sm">
            <FaQuestionCircle className="text-blue-500" /> सवाल-जवाब
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            अक्सर पूछे जाने वाले सवाल ❓
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            आपके मन में जो भी सवाल हैं, यहाँ जवाब मिलेंगे
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} direction="up" delay={0.1 * Math.min(i, 5)}>
              <div 
                className={`glass-card overflow-hidden border-2 transition-colors cursor-pointer ${open === i ? 'border-saffron-300 shadow-[0_10px_30px_rgba(255,153,51,0.1)]' : 'border-slate-100'}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="p-5 md:p-6 flex items-center justify-between gap-4">
                  <h4 className="font-extrabold text-slate-800 text-base md:text-lg">{faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${open === i ? 'bg-saffron-100 text-saffron-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <FaChevronDown />
                  </div>
                </div>
                
                <div 
                  className={`px-5 md:px-6 transition-all duration-300 ease-in-out ${open === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <div className="h-px w-full bg-slate-100 mb-4" />
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
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
            <a href="https://wa.me/919999999999?text=PM सूर्य घर योजना के बारे में जानकारी चाहिए" target="_blank" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
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
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaPhoneAlt className="text-emerald-500" /> 1800-XXX-XXXX (टोल फ्री)</li>
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaWhatsapp className="text-emerald-500 text-lg" /> +91 99999-99999</li>
                <li className="flex items-center gap-3 text-slate-400 font-medium"><FaEnvelope className="text-saffron-500" /> info@suryagharup.in</li>
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
      <a href="https://wa.me/919999999999?text=मुझे PM सूर्य घर योजना के बारे में जानकारी चाहिए" target="_blank" className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform group">
        <div className="absolute inset-0 border-2 border-[#25D366] rounded-full animate-ping opacity-75" />
        <FaWhatsapp className="relative z-10" />
      </a>
    </>
  );
}
