"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

type Service = {
  name: string;
  price: string;
  blurb: string;
  duration: string;
};

const SERVICES: Service[] = [
  {
    name: "Fresh Fade",
    price: "25",
    blurb: "Skin, low, mid, or high. Blended clean, edged crisp.",
    duration: "~45 min",
  },
  {
    name: "Line Up",
    price: "15",
    blurb: "Sharp hairline and edge-up. Quick, clean, precise.",
    duration: "~20 min",
  },
  {
    name: "Full Cut + Line Up",
    price: "35",
    blurb: "The whole package. Fade, shape, and a razor-clean line.",
    duration: "~60 min",
  },
  {
    name: "Beard Shape",
    price: "20",
    blurb: "Trimmed, lined, and contoured to your face.",
    duration: "~25 min",
  },
  {
    name: "Kid's Cut",
    price: "20",
    blurb: "Patient hands, fresh styles. 12 and under.",
    duration: "~30 min",
  },
];

function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="[perspective:1000px]"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden transition-transform duration-200 ease-out will-change-transform h-full"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(201, 168, 76, 0.12), transparent 40%), linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        }}
      >
        {/* Gold glow ring on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-gold/40 shadow-gold" />

        <div className="relative flex items-baseline justify-between mb-6">
          <span className="font-display text-bone/40 text-xs tracking-[0.3em]">
            0{index + 1}
          </span>
          <span className="font-display text-bone/30 text-xs tracking-[0.2em]">
            {service.duration}
          </span>
        </div>

        <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-4 group-hover:text-gold transition-colors duration-500">
          {service.name}
        </h3>

        <p className="text-bone/60 text-sm md:text-base leading-relaxed mb-8 min-h-[3em]">
          {service.blurb}
        </p>

        <div className="flex items-end justify-between pt-6 border-t border-white/10">
          <div className="flex items-baseline">
            <span className="font-display text-gold text-xl">$</span>
            <span className="font-display text-gold text-6xl leading-none ml-1">
              {service.price}
            </span>
          </div>
          <motion.a
            href="#booking"
            className="text-bone/60 group-hover:text-gold transition-colors font-body tracking-widest text-xs uppercase"
            whileHover={{ x: 4 }}
          >
            Book →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-crimson/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-28"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 rounded-full border border-gold/40 text-gold font-display tracking-[0.3em] text-xs mb-8"
          >
            MOBILE & IN-HOUSE AVAILABLE
          </motion.span>

          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            The <span className="shimmer-text">Menu</span>
          </h2>
          <p className="mt-6 text-bone/60 max-w-xl mx-auto text-base md:text-lg">
            Straight prices. No hidden fees. Mobile visits within Charlotte add a flat travel fee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <TiltCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
