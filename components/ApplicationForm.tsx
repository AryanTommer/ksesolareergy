"use client";

import { useState } from "react";
import { FaFileSignature, FaArrowRight, FaArrowLeft, FaPaperPlane, FaWhatsapp, FaLock, FaShieldAlt, FaUserShield, FaCheck } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", mobile: "", district: "", roofType: "", consumerId: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // validation variables
  const isStep1Valid = formData.name.trim() !== "" && formData.mobile.length === 10;
  const isStep2Valid = formData.district !== "" && formData.roofType !== "";

  return (
    <section id="apply-form" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-saffron-50 to-white">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-saffron-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-saffron-100 text-saffron-700 px-4 py-2 rounded-full font-bold text-sm border border-saffron-200 mb-6 shadow-sm">
            <FaFileSignature className="text-saffron-600" /> आवेदन फॉर्म
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight text-balance">
            अभी आवेदन करें — बिल्कुल मुफ्त! 📝
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-md mx-auto">
            सिर्फ 3 आसान स्टेप्स <span className="mx-2 text-slate-300">·</span> कोई शुल्क नहीं <span className="mx-2 text-slate-300">·</span> 3 मिनट में पूरा
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          {!submitted ? (
            <div className="glass-card bg-white/90 p-6 md:p-10 border-2 border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative">
              
              {/* Process Tracker */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? (step > 1 ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-saffron-500 text-white shadow-saffron-500/30') : 'bg-slate-100 text-slate-400'}`}>
                  {step > 1 ? <FaCheck /> : 1}
                </div>
                <div className={`h-1.5 w-12 md:w-16 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? (step > 2 ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-saffron-500 text-white shadow-saffron-500/30') : 'bg-slate-100 text-slate-400'}`}>
                  {step > 2 ? <FaCheck /> : 2}
                </div>
                <div className={`h-1.5 w-12 md:w-16 rounded-full transition-colors ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-saffron-500 text-white shadow-saffron-500/30' : 'bg-slate-100 text-slate-400'}`}>
                  3
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="animate-fade-in animate-slide-in-right">
                  <h4 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">👤 स्टेप 1: अपनी जानकारी दें</h4>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">आपका नाम *</label>
                      <input 
                        type="text" 
                        placeholder="जैसे: राम प्रकाश"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/10 transition-all text-slate-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">मोबाइल नंबर *</label>
                      <input 
                        type="tel" 
                        maxLength={10}
                        placeholder="जैसे: 9876543210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g,'')})}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/10 transition-all text-slate-800 font-medium tracking-wider"
                      />
                    </div>
                    <button 
                      onClick={() => isStep1Valid && setStep(2)}
                      disabled={!isStep1Valid}
                      className={`mt-4 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isStep1Valid ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-[0_10px_25px_rgba(255,107,0,0.3)] hover:scale-[1.02]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                      आगे बढ़ें <FaArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="animate-fade-in animate-slide-in-right">
                  <h4 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">🏠 स्टेप 2: घर की जानकारी</h4>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">आपका ज़िला *</label>
                      <select 
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/10 transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.2em"}}
                      >
                        <option value="">-- ज़िला चुनें --</option>
                        {["लखनऊ","कानपुर","गोरखपुर","वाराणसी","आगरा","प्रयागराज","मेरठ","बरेली","अन्य"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">छत का प्रकार *</label>
                      <select 
                        value={formData.roofType}
                        onChange={(e) => setFormData({...formData, roofType: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/10 transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                        style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.2em"}}
                      >
                        <option value="">-- चुनें --</option>
                        <option>पक्की छत (RCC/कंक्रीट)</option>
                        <option>टिन शेड</option>
                        <option>अन्य</option>
                      </select>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 px-2 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        <FaArrowLeft /> पीछे
                      </button>
                      <button 
                        onClick={() => isStep2Valid && setStep(3)}
                        disabled={!isStep2Valid}
                        className={`flex-[2] py-4 px-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isStep2Valid ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-[0_10px_25px_rgba(255,107,0,0.3)] hover:scale-[1.02]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      >
                        आगे बढ़ें <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="animate-fade-in animate-slide-in-right">
                  <h4 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">✅ स्टेप 3: पुष्टि करें</h4>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">बिजली उपभोक्ता संख्या (वैकल्पिक)</label>
                      <input 
                        type="text" 
                        placeholder="बिल पर लिखी संख्या (अगर पता हो)"
                        value={formData.consumerId}
                        onChange={(e) => setFormData({...formData, consumerId: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-saffron-500 focus:outline-none focus:ring-4 focus:ring-saffron-500/10 transition-all text-slate-800 font-medium"
                      />
                    </div>

                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-sm text-slate-500 font-bold mb-3 uppercase tracking-wider">आपकी जानकारी</p>
                      <ul className="space-y-2 text-slate-700 font-medium">
                        <li>👤 {formData.name}</li>
                        <li>📱 {formData.mobile}</li>
                        <li>📍 {formData.district}</li>
                        <li>🏠 {formData.roofType}</li>
                      </ul>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100/50">
                      <FaLock className="text-emerald-500 mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium text-emerald-800 leading-relaxed">
                        आपकी जानकारी 256-bit इंक्रिप्शन के साथ पूरी तरह सुरक्षित है। हम इसे कभी किसी से शेयर नहीं करेंगे।
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 px-2 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                      >
                        <FaArrowLeft /> पीछे
                      </button>
                      <button 
                        onClick={() => setSubmitted(true)}
                        className="flex-[2.5] py-4 px-2 rounded-xl text-lg font-black flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
                      >
                        <FaPaperPlane /> आवेदन जमा करें
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success State */
            <div className="glass-card bg-emerald-50/90 p-8 md:p-12 border-2 border-emerald-300 text-center shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] animate-fade-in relative z-10">
              <div className="text-7xl mb-6 mx-auto animate-bounce-slow drop-shadow-xl">🎉</div>
              <h3 className="text-2xl md:text-3xl font-black text-emerald-700 mb-4 tracking-tight">
                बधाई हो! आवेदन सफल!
              </h3>
              <p className="text-emerald-800/80 font-semibold mb-8 text-lg leading-relaxed">
                <strong className="text-emerald-900 border-b border-emerald-300">{formData.name}</strong> जी, आपका आवेदन सफलतापूर्वक जमा हो गया है।<br/>
                हमारी टीम <strong className="text-emerald-900">24 घंटे के अंदर</strong> आपको कॉल करेगी।
              </p>

              <div className="flex flex-col gap-4">
                <a href="https://wa.me/919999999999?text=मैंने PM सूर्य घर योजना के लिए आवेदन किया है।" target="_blank" className="py-4 px-6 rounded-2xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                  <FaWhatsapp className="text-2xl" /> WhatsApp पर पुष्टि प्राप्त करें
                </a>
                <a href="https://wa.me/919999999999?text=मुझे PM सूर्य घर WhatsApp ग्रुप में जोड़ें" target="_blank" className="py-4 px-6 rounded-2xl font-bold bg-white text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                  <FaWhatsapp className="text-xl" /> WhatsApp ग्रुप से जुड़ें
                </a>
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* Global Security Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 relative z-10 opacity-70">
          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-wide uppercase"><FaLock className="text-slate-400" /> SSL एन्क्रिप्टेड</span>
          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-wide uppercase"><FaShieldAlt className="text-slate-400" /> सरकार प्रमाणित</span>
          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-wide uppercase"><FaUserShield className="text-slate-400" /> डेटा सुरक्षित</span>
        </div>
      </div>
    </section>
  );
}
