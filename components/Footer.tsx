"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-6xl tracking-tight"
          >
            CUTZ BY <span className="text-gold">JOJO</span>
          </motion.div>
          <p className="mt-3 text-bone/40 text-sm tracking-widest uppercase">
            Charlotte, NC • Mobile Barber
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3 text-sm">
          <p className="text-bone/40">© 2026 Cutz by JoJo — Charlotte, NC</p>
          <a
            href="https://tame.gg"
            target="_blank"
            rel="noreferrer"
            className="link-underline text-bone/30 hover:text-gold transition-colors tracking-wider text-xs uppercase"
          >
            Site by tame.gg Web Services
          </a>
        </div>
      </div>
    </footer>
  );
}
