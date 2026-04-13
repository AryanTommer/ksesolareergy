"use client";

import { FaListOl } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "ऑनलाइन आवेदन करें",
      time: "3 मिनट",
      timeBg: "bg-saffron-100 text-saffron-700",
      desc: "नीचे दिया गया फॉर्म भरें — बस अपना नाम, मोबाइल नंबर और ज़िला बताएं।"
    },
    {
      num: "2",
      title: "हमारी टीम कॉल करेगी",
      time: "24 घंटे में",
      timeBg: "bg-blue-100 text-blue-700",
      desc: "हमारी टीम आपको कॉल करके पूरी जानकारी देगी और सवालों के जवाब देगी।"
    },
    {
      num: "3",
      title: "फ्री सर्वे होगा",
      time: "5-10 दिन",
      timeBg: "bg-blue-100 text-blue-700",
      desc: "सरकारी टीम आपकी छत का मुफ्त सर्वे करेगी — कोई शुल्क नहीं, कोई जबरदस्ती नहीं।"
    },
    {
      num: "4",
      title: "सोलर पैनल लगेंगे",
      time: "2-3 हफ्ते",
      timeBg: "bg-emerald-100 text-emerald-700",
      desc: "अप्रूव्ड वेंडर आपकी छत पर सोलर पैनल इंस्टॉल करेगा। पूरा काम प्रोफेशनल तरीके से होगा।"
    },
    {
      num: "5",
      title: "सब्सिडी + फ्री बिजली शुरू! 🎉",
      time: "फाइनल",
      timeBg: "bg-emerald-100 text-emerald-700",
      desc: "सरकार इंस्पेक्शन के बाद सब्सिडी सीधे बैंक में भेजेगी और आपकी फ्री बिजली शुरू! 25 साल तक आनंद लें।",
      highlight: true
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-3xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-200 mb-6 shadow-sm">
            <FaListOl className="text-emerald-500" /> प्रक्रिया
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            कैसे काम करता है? (5 आसान स्टेप्स) 🚀
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            प्रक्रिया बिल्कुल आसान है — बस एक फॉर्म भरें, बाकी हम करेंगे!
          </p>
        </AnimatedSection>

        <div className="relative pl-6 md:pl-10">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-[39px] top-4 bottom-12 w-1 bg-gradient-to-b from-saffron-500 to-emerald-500 rounded-full opacity-30" />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <AnimatedSection key={i} direction="left" delay={0.1 * i} className="relative">
                {/* Dot */}
                <div className={`absolute -left-[54px] md:-left-[70px] top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-black text-xl text-white shadow-lg z-10 ${step.highlight ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 scale-110 shadow-emerald-500/40' : 'bg-gradient-to-br from-saffron-500 to-saffron-600 shadow-saffron-500/40'}`}>
                  {step.num}
                </div>

                <div className={`glass-card p-6 md:p-8 ml-2 ${step.highlight ? 'border-2 border-emerald-400 bg-emerald-50/30' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className={`text-lg md:text-xl font-extrabold ${step.highlight ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {step.title}
                    </h4>
                    <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide ${step.timeBg}`}>
                      {step.time}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
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
