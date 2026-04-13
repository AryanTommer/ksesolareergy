"use client";

import { useState } from "react";
import { FaClipboardCheck, FaArrowDown, FaWhatsapp } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function EligibilityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    { id: "up", text: "🏠 क्या आप उत्तर प्रदेश में रहते हैं?", failResult: "fail_location" },
    { id: "roof", text: "🏗️ क्या आपके पास अपनी पक्की छत है?", failResult: "fail_roof" },
    { id: "electricity", text: "🔌 क्या आपके पास बिजली का कनेक्शन है?", failResult: "fail_electricity" },
    { id: "firstTime", text: "📋 क्या आपने पहले कभी सोलर सब्सिडी नहीं ली है?", passResult: "pass", failResult: "fail_previous" }
  ];

  const handleOption = (val: boolean) => {
    const currentQ = questions[step];
    
    // update answers
    setAnswers({ ...answers, [currentQ.id]: val });

    if (!val) {
      if (currentQ.id === "firstTime") {
        setResult("fail_previous");
      } else {
        setResult(currentQ.failResult);
      }
    } else {
      if (step === questions.length - 1) {
        setResult("pass");
      } else {
        setStep(step + 1);
      }
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-200 mb-6 shadow-sm">
            <FaClipboardCheck className="text-blue-500" /> पात्रता जाँच
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            क्या आपको सब्सिडी मिलेगी? 🤔
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            बस 4 सवालों के जवाब दें — 30 सेकंड में पता चल जाएगा!
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="glass-card p-8 md:p-12 border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center min-h-[300px] flex flex-col justify-center transition-all duration-300">
            
            {/* Progress Bar */}
            {!result && (
              <div className="flex gap-2 mb-10 w-full justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded-full transition-all duration-500 max-w-16 ${i <= step ? "bg-gradient-to-r from-saffron-400 to-saffron-500" : "bg-slate-100"}`} 
                  />
                ))}
              </div>
            )}

            {/* Questions */}
            {!result && (
              <div className="w-full flex-grow flex flex-col justify-center animate-fade-in">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                  {questions[step].text}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleOption(true)}
                    className="py-4 px-6 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all active:scale-95"
                  >
                    ✅ हाँ {step === 3 && "(पहली बार)"}
                  </button>
                  <button 
                    onClick={() => handleOption(false)}
                    className="py-4 px-6 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-all active:scale-95"
                  >
                    ❌ नहीं {step === 3 && "(ले चुका/चुकी हूँ)"}
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {result === "pass" && (
              <div className="animate-fade-in flex flex-col items-center">
                <div className="text-7xl mb-6 drop-shadow-xl animate-bounce-slow">🎉</div>
                <h3 className="text-3xl font-black text-emerald-600 mb-4">बधाई हो! आप पात्र हैं!</h3>
                <p className="text-slate-600 font-medium mb-8 max-w-md">
                  आप PM सूर्य घर योजना की सब्सिडी पाने के योग्य हैं। अभी नीचे फॉर्म भरें और अपना आवेदन शुरू करें!
                </p>
                <a href="#apply-form" className="btn-premium w-full flex justify-center items-center gap-2 mb-4">
                  <FaArrowDown /> अभी फॉर्म भरें
                </a>
                <button onClick={resetQuiz} className="text-slate-400 font-semibold hover:text-slate-600 underline underline-offset-4 text-sm mt-4">
                  दोबारा जाँचें
                </button>
              </div>
            )}

            {result && result.startsWith("fail") && (
              <div className="animate-fade-in flex flex-col items-center">
                <div className="text-7xl mb-6 drop-shadow-xl opacity-80">😔</div>
                <h3 className="text-2xl font-black text-rose-600 mb-4">
                  {result === 'fail_location' && "यह योजना अभी UP के लिए है"}
                  {result === 'fail_roof' && "पक्की छत ज़रूरी है"}
                  {result === 'fail_electricity' && "बिजली कनेक्शन ज़रूरी है"}
                  {result === 'fail_previous' && "एक बार ही सब्सिडी मिलती है"}
                </h3>
                <p className="text-slate-600 font-medium mb-8 max-w-md">
                  चिंता न करें! हमारी टीम से बात करें, शायद कोई और विकल्प मिल सके।
                </p>
                <a href="https://wa.me/919999999999?text=मुझे PM सूर्य घर योजना के बारे में जानकारी चाहिए" target="_blank" className="btn-premium w-full flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/50 mb-4">
                  <FaWhatsapp className="text-xl" /> WhatsApp पर बात करें
                </a>
                <button onClick={resetQuiz} className="text-slate-400 font-semibold hover:text-slate-600 underline underline-offset-4 text-sm mt-4">
                  दोबारा जाँचें
                </button>
              </div>
            )}

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
