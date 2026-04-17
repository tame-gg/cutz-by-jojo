"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TITLE = "CUTZ BY JOJO";

const letterVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: 1.7 + i * 0.045,
      duration: 0.85,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
};

function ScissorsSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="14" cy="46" r="8" />
      <circle cx="50" cy="46" r="8" />
      <path d="M22 40 L58 8" />
      <path d="M42 40 L6 8" />
      <path d="M32 30 L44 18" />
    </svg>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setOffset({ x: dx, y: dy });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gold text-ink font-display tracking-[0.25em] text-lg shadow-gold hover:shadow-gold-strong transition-shadow"
    >
      <span className="relative z-10">BOOK YOUR CUT</span>
      <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: 6 }}
        className="relative z-10 inline-block"
      >
        →
      </motion.span>
      <span className="absolute inset-0 rounded-full bg-gold blur-xl opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden />
    </motion.a>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const taglineY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="mesh-bg" aria-hidden />
      <div className="absolute inset-0 noise-grid opacity-30" aria-hidden />

      {/* Floating scissors motifs */}
      <motion.div
        className="absolute top-[15%] left-[8%] text-gold/30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <ScissorsSVG className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] right-[10%] text-gold/20"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ScissorsSVG className="w-24 h-24" />
      </motion.div>
      <motion.div
        className="absolute top-[40%] right-[20%] text-crimson/25"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <ScissorsSVG className="w-10 h-10" />
      </motion.div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 px-6 md:px-12 py-6 flex justify-between items-center z-10"
      >
        <span className="font-display text-gold tracking-[0.3em] text-sm">◆ EST. 2023</span>
        <span className="font-display text-bone/60 tracking-[0.3em] text-sm hidden md:inline">
          CHARLOTTE, NC
        </span>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-6xl"
      >
        {/* Small kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="font-display text-gold tracking-[0.4em] text-xs md:text-sm">
            JOWXEL × VALENTINE
          </span>
          <span className="h-px w-12 bg-gold" />
        </motion.div>

        {/* Title */}
        <motion.h1
          style={{ y: titleY }}
          className="font-display leading-[0.85] tracking-tight text-[18vw] md:text-[13vw] lg:text-[11vw]"
        >
          {TITLE.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? (
                "\u00A0"
              ) : (
                <motion.span
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.div style={{ y: taglineY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-8 text-lg md:text-2xl text-bone/80 font-body tracking-wide"
          >
            Charlotte&apos;s Mobile Barber.{" "}
            <span className="shimmer-text font-medium">He Comes to You.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.9 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <MagneticButton href="#booking">Book Your Cut</MagneticButton>
            <a
              href="#services"
              className="link-underline font-body tracking-widest text-sm text-bone/70 hover:text-bone transition-colors uppercase"
            >
              See Services
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-display text-xs tracking-[0.4em] text-bone/40">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
