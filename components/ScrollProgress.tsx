"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] hidden md:flex flex-col items-center gap-3 pointer-events-none">
      <div className="relative w-px h-40 bg-bone/15 overflow-hidden">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 bg-gold"
        />
      </div>
      <span className="font-display text-xs tracking-[0.3em] text-bone/40 rotate-90 mt-8">
        SCROLL
      </span>
    </div>
  );
}
