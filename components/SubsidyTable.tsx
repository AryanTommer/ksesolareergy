"use client";

import { FaRupeeSign, FaInfoCircle } from "react-icons/fa";
import { AnimatedSection } from "./ui/AnimatedSection";

export function SubsidyTable() {
  const tableData = [
    { size: "1 kW", subsidy: "₹30,000", total: "₹60,000 - 70,000", cost: "₹30,000 - 40,000" },
    { size: "2 kW", subsidy: "₹60,000", total: "₹1,20,000 - 1,40,000", cost: "₹60,000 - 80,000" },
    { size: "3 kW", popular: true, subsidy: "₹78,000", total: "₹1,80,000 - 2,10,000", cost: "₹1,02,000 - 1,32,000" },
    { size: "4 kW+", subsidy: "₹78,000", total: "₹2,40,000+", cost: "₹1,62,000+" },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <AnimatedSection direction="up" delay={0.1} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-saffron-50 text-saffron-600 px-4 py-2 rounded-full font-bold text-sm border border-saffron-200 mb-6 shadow-sm">
            <FaRupeeSign className="text-saffron-500" /> सब्सिडी विवरण
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight text-balance">
            आपको कितनी सब्सिडी मिलेगी? 💸
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            सिस्टम के साइज़ के अनुसार सरकारी सब्सिडी का पूरा विवरण
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="glass-card overflow-hidden border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white">
                    <th className="p-4 md:p-5 font-bold text-sm md:text-base whitespace-nowrap">सोलर सिस्टम</th>
                    <th className="p-4 md:p-5 font-bold text-sm md:text-base whitespace-nowrap">सब्सिडी राशि</th>
                    <th className="p-4 md:p-5 font-bold text-sm md:text-base whitespace-nowrap hidden sm:table-cell">कुल खर्च (अनुमानित)</th>
                    <th className="p-4 md:p-5 font-bold text-sm md:text-base whitespace-nowrap">आपका खर्च</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row, i) => (
                    <tr key={i} className={`transition-colors hover:bg-saffron-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="p-4 md:p-5 font-bold text-slate-900 flex flex-col items-center justify-center gap-1">
                        {row.size}
                        {row.popular && (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            लोकप्रिय
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-5 font-black text-emerald-600 font-outfit text-lg">{row.subsidy}</td>
                      <td className="p-4 md:p-5 font-semibold text-slate-500 hidden sm:table-cell font-outfit">{row.total}</td>
                      <td className="p-4 md:p-5 font-black text-saffron-600 font-outfit text-lg">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 p-4 md:p-5 bg-amber-50 rounded-2xl flex items-start gap-3 border border-amber-100/50 shadow-sm">
            <FaInfoCircle className="text-amber-500 flex-shrink-0 mt-0.5 text-lg" />
            <p className="text-sm text-amber-900 font-medium leading-relaxed">
              <strong>ध्यान दें:</strong> 3 kW तक के सिस्टम पर सबसे ज़्यादा सब्सिडी मिलती है। अधिकांश परिवारों के लिए 2-3 kW का सिस्टम पर्याप्त होता है। सब्सिडी सीधे आपके बैंक अकाउंट में आती है।
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
