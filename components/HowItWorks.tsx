"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Slide In",
    body: "Book via DM or the form below. Tell JoJo what you want, when you want it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Meet Up",
    body: "JoJo pulls up to you — home, office, wherever — or you swing through his spot.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Walk Out Fresh",
    body: "Clean fade, sharp line, full confidence. Pictures for the grid optional.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="font-display tracking-[0.4em] text-gold text-xs mb-6 block">
            ◆ THE PROCESS
          </span>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            How It <em className="not-italic shimmer-text">Works</em>
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Connecting line — desktop horizontal */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-bone/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-gold via-gold/60 to-gold"
            />
          </div>

          {/* Vertical line — mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-10 w-px bg-bone/10">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
              style={{ transformOrigin: "top" }}
              className="w-full bg-gradient-to-b from-gold via-gold/60 to-gold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative pl-24 md:pl-0 md:text-center"
              >
                {/* Node dot */}
                <div className="absolute md:relative left-0 md:left-auto md:mx-auto top-0 md:mb-10">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className="absolute w-20 h-20 rounded-full bg-gold/20 blur-xl"
                    />
                    <div className="relative w-20 h-20 rounded-full bg-ink border border-gold/50 flex items-center justify-center text-gold">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <div className="font-display text-gold/60 text-xs tracking-[0.3em] mb-3">
                  STEP {step.n}
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-bone/60 text-base md:text-base leading-relaxed max-w-xs md:mx-auto">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
