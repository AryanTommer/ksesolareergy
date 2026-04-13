"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  direction = "up"
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const directions = {
    up: { y: 40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease out cubic
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
