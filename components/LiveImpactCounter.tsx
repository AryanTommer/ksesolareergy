"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedSection } from "./ui/AnimatedSection";

export function LiveImpactCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const [counts, setCounts] = useState({
    families: 0,
    savings: 0,
    installations: 0,
    states: 0
  });

  useEffect(() => {
    if (!isInView) return;

    const targets = { families: 52847, savings: 200, installations: 31500, states: 36 };
    const duration = 2500;
    const steps = 60;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      
      setCounts({
        families: Math.floor(targets.families * ease),
        savings: Math.floor(targets.savings * ease),
        installations: Math.floor(targets.installations * ease),
        states: Math.floor(targets.states * ease)
      });

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="py-12 md:py-20 bg-white border-b border-gray-100 relative z-20">
      <div className="max-w-5xl mx-auto px-5" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          
          <AnimatedSection direction="up" delay={0.1} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center border-t-4 border-t-saffron-500">
            <div className="text-3xl md:text-4xl font-extrabold text-saffron-600 mb-2 font-outfit">
              {counts.families.toLocaleString('en-IN')}+
            </div>
            <div className="text-sm md:text-base text-slate-500 font-semibold">लाभार्थी परिवार</div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center border-t-4 border-t-emerald-500">
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 mb-2 font-outfit">
              ₹{counts.savings} करोड़+
            </div>
            <div className="text-sm md:text-base text-slate-500 font-semibold">कुल बचत</div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center border-t-4 border-t-blue-500">
            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2 font-outfit">
              {counts.installations.toLocaleString('en-IN')}+
            </div>
            <div className="text-sm md:text-base text-slate-500 font-semibold">सफल इंस्टॉलेशन</div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.4} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center border-t-4 border-t-purple-500">
            <div className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-2 font-outfit">
              {counts.states} राज्य
            </div>
            <div className="text-sm md:text-base text-slate-500 font-semibold">पूरे भारत में</div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
