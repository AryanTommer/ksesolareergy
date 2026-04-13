"use client";

import { FaStar, FaUsers, FaCheckCircle } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Testimonials() {
  const reviews = [
    {
      initial: "र",
      name: "राम प्रकाश जी",
      location: "कानपुर (KESCO) · 3 kW सिस्टम",
      gradient: "from-saffron-500 to-saffron-600",
      quote: "पहले ₹5,200 का बिल आता था, अब ₹0! सब्सिडी भी बैंक में आ गई। बहुत अच्छी योजना है, सबको लगवानी चाहिए।"
    },
    {
      initial: "स",
      name: "सुनीता देवी जी",
      location: "लखनऊ (LESA) · 2 kW सिस्टम",
      gradient: "from-emerald-500 to-emerald-600",
      quote: "मुझे लगता था ये सब फ्रॉड होता है, लेकिन सच में सब्सिडी मिली! ₹60,000 बैंक में आ गए। बच्चों को भी गर्मी में पंखा चलाने की चिंता नहीं।"
    },
    {
      initial: "म",
      name: "मोहन लाल वर्मा जी",
      location: "गोरखपुर · 3 kW सिस्टम",
      gradient: "from-blue-500 to-blue-600",
      quote: "गर्मी में AC चलाने का बिल ₹8,000 आता था। अब सोलर से AC भी चलता है और बिल भी ₹200 से कम। ऊपर से एक्स्ट्रा बिजली बेचकर ₹1,200 कमा रहा हूँ!"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-200 mb-6 shadow-sm">
            <FaStar className="text-emerald-500" /> लोगों का अनुभव
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            उत्तर प्रदेश के परिवारों की कहानियाँ ❤️
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            जिन्होंने सोलर लगवाया, वो क्या कह रहे हैं?
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, i) => (
            <AnimatedSection key={i} direction="up" delay={0.1 * (i + 1)}>
              <div className="glass-card p-6 md:p-8 h-full flex flex-col hover:border-saffron-200 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rev.gradient} flex items-center justify-center text-white font-black text-2xl shadow-lg`}>
                    {rev.initial}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg leading-tight">{rev.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{rev.location}</div>
                  </div>
                </div>
                
                <div className="flex text-amber-400 text-sm mb-4">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium italic mb-6 flex-grow">
                  "{rev.quote}"
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 text-sm" />
                  <span className="text-xs font-bold text-emerald-700">प्रमाणित लाभार्थी</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Global Trust Stats */}
        <AnimatedSection direction="up" delay={0.4} className="mt-16 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm">
            <FaStar className="text-amber-500 text-lg" />
            <span className="font-bold text-emerald-800 text-sm md:text-base">4.8/5 औसत रेटिंग</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-saffron-50 border border-saffron-100 rounded-full shadow-sm">
            <FaUsers className="text-saffron-500 text-lg" />
            <span className="font-bold text-saffron-800 text-sm md:text-base">50,000+ खुश परिवार</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
