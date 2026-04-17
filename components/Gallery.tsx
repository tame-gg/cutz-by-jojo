"use client";

import { motion } from "framer-motion";

type Item = {
  label: string;
  aspect: string;
  gradient: string;
  span?: string;
};

const ITEMS: Item[] = [
  {
    label: "Skin Fade",
    aspect: "aspect-[3/4]",
    gradient: "from-[#1a1a1a] via-[#2a2420] to-[#0f0d0a]",
    span: "row-span-2",
  },
  {
    label: "Classic Line Up",
    aspect: "aspect-[4/3]",
    gradient: "from-[#1f1612] via-[#2b1f18] to-[#0a0805]",
  },
  {
    label: "Mid Taper",
    aspect: "aspect-square",
    gradient: "from-[#1c1a18] via-[#2d2723] to-[#0d0b09]",
  },
  {
    label: "Beard Sculpt",
    aspect: "aspect-[4/5]",
    gradient: "from-[#231a15] via-[#332820] to-[#100b08]",
  },
  {
    label: "Burst Fade",
    aspect: "aspect-[3/4]",
    gradient: "from-[#1a1512] via-[#2a1f1a] to-[#0b0806]",
  },
  {
    label: "Kid's Fresh",
    aspect: "aspect-square",
    gradient: "from-[#1a1915] via-[#26231d] to-[#0a0907]",
  },
  {
    label: "Low Fade",
    aspect: "aspect-[4/5]",
    gradient: "from-[#1e1814] via-[#2f251f] to-[#0c0907]",
    span: "row-span-2",
  },
  {
    label: "Razor Work",
    aspect: "aspect-[3/2]",
    gradient: "from-[#1b1410] via-[#2a1e18] to-[#0a0805]",
  },
];

function GalleryTile({ item, index }: { item: Item; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.08,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-xl border border-white/5 ${item.aspect} ${item.span ?? ""}`}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
      >
        {/* Simulated texture */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Concentric highlight */}
        <div className="absolute inset-0 bg-gradient-radial opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(201, 168, 76, 0.25), transparent 60%)",
          }}
        />

        {/* Number tag */}
        <div className="absolute top-4 left-4 font-display text-bone/30 text-xs tracking-[0.3em]">
          #{String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-10 h-px bg-gold" />
            <span className="font-display text-gold text-xs tracking-[0.3em]">VIEW</span>
            <span className="w-10 h-px bg-gold" />
          </motion.div>
          <div className="font-display text-2xl md:text-3xl tracking-tight text-bone">
            {item.label}
          </div>
        </div>
      </div>

      {/* Bottom label always visible faintly */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent opacity-60 group-hover:opacity-0 transition-opacity">
        <div className="font-display tracking-[0.2em] text-sm text-bone/80">
          {item.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6"
        >
          <div>
            <span className="font-display tracking-[0.4em] text-gold text-xs mb-6 block">
              ◆ THE WORK
            </span>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
              Recent <em className="not-italic shimmer-text">Cuts</em>
            </h2>
          </div>
          <p className="text-bone/60 max-w-sm md:text-right">
            A few fresh ones. Follow the IG for daily drops and behind-the-chair content.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]">
          {ITEMS.map((item, i) => (
            <GalleryTile key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
