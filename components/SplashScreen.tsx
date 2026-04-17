"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-0 bg-ink"
          />
          <div className="relative flex items-center gap-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-px bg-gold"
            />
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
              className="font-display text-gold text-xl tracking-[0.3em]"
            >
              CUTZ BY JOJO
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-px bg-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
