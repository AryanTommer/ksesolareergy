"use client";

import { FaListOl, FaChevronDown } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "ऑनलाइन आवेदन करें",
      time: "3 मिनट",
      timeBg: "from-saffron-500 to-saffron-600 text-white",
      desc: "नीचे दिया गया फॉर्म भरें — बस अपना नाम, मोबाइल नंबर और ज़िला बताएं।",
      icon: "✍️"
    },
    {
      num: "2",
      title: "हमारी टीम कॉल करेगी",
      time: "24 घंटे में",
      timeBg: "from-blue-500 to-blue-600 text-white",
      desc: "हमारी टीम आपको कॉल करके पूरी जानकारी देगी और सवालों के जवाब देगी।",
      icon: "📞"
    },
    {
      num: "3",
      title: "फ्री सर्वे होगा",
      time: "5-10 दिन",
      timeBg: "from-purple-500 to-purple-600 text-white",
      desc: "सरकारी टीम आपकी छत का मुफ्त सर्वे करेगी — कोई शुल्क नहीं, कोई जबरदस्ती नहीं।",
      icon: "📐"
    },
    {
      num: "4",
      title: "सोलर पैनल लगेंगे",
      time: "2-3 हफ्ते",
      timeBg: "from-emerald-500 to-emerald-600 text-white",
      desc: "अप्रूव्ड वेंडर आपकी छत पर सोलर पैनल इंस्टॉल करेगा। पूरा काम प्रोफेशनल तरीके से होगा।",
      icon: "☀️"
    },
    {
      num: "5",
      title: "सब्सिडी + फ्री बिजली शुरू! 🎉",
      time: "फाइनल",
      timeBg: "from-emerald-500 to-emerald-600 text-white",
      desc: "सरकार इंस्पेक्शन के बाद सब्सिडी सीधे बैंक में भेजेगी और आपकी फ्री बिजली शुरू! 25 साल तक आनंद लें।",
      highlight: true,
      icon: "🥳"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full font-bold text-sm border border-emerald-200 mb-6 shadow-sm uppercase tracking-wider">
            <FaListOl className="text-emerald-500" /> पूरी प्रक्रिया
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight text-balance leading-[1.1]">
            कैसे काम करता है? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">5 आसान स्टेप्स 🚀</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            प्रक्रिया बिल्कुल आसान और पारदर्शी है — बस एक फॉर्म भरें, बाकी हम करेंगे!
          </p>
        </AnimatedSection>

        <div className="relative pl-8 md:pl-16">
          {/* Enhanced Glowing Vertical Line */}
          <div className="absolute left-[31px] md:left-[63px] top-8 bottom-12 w-1.5 md:w-2 bg-gradient-to-b from-saffron-500 via-emerald-400 to-emerald-600 rounded-full opacity-60 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

          <div className="flex flex-col gap-8 md:gap-12">
            {steps.map((step, i) => (
              <AnimatedSection key={i} direction="up" delay={0.1 * i} className="relative group">
                {/* 3D Number Bubble */}
                <div className={`absolute -left-[64px] md:-left-[96px] top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-2xl md:text-3xl text-white z-10 transition-transform duration-500 group-hover:scale-110 
                  ${step.highlight ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_10px_30px_rgba(16,185,129,0.6)] border-4 border-white' : 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl border-4 border-white'}`}>
                  {step.num}
                </div>

                <div className={`bg-white rounded-[2rem] p-6 md:p-8 lg:p-10 transition-all duration-300 relative overflow-hidden border-2 
                  ${step.highlight ? 'border-emerald-400 shadow-[0_20px_60px_rgba(16,185,129,0.2)] bg-emerald-50/50 -translate-y-2' : 'border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:-translate-y-1 group-hover:border-slate-100'}`}>
                  
                  {/* Decorative background icon */}
                  <div className="absolute -right-6 -bottom-6 text-8xl opacity-5 pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 relative z-10">
                    <h4 className={`text-xl md:text-2xl font-black ${step.highlight ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {step.title}
                    </h4>
                    <span className={`text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider bg-gradient-to-r shadow-sm ${step.timeBg}`}>
                      ⏳ {step.time}
                    </span>
                  </div>
                  <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
