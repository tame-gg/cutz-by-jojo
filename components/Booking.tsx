"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormState = {
  name: string;
  phone: string;
  service: string;
  day: string;
  location: "come" | "pullup" | "";
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  service: "",
  day: "",
  location: "",
};

const SERVICES = [
  "Fresh Fade — $25",
  "Line Up — $15",
  "Full Cut + Line Up — $35",
  "Beard Shape — $20",
  "Kid's Cut — $20",
];

export default function Booking() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPulsing(true);
    setTimeout(() => {
      setSent(true);
    }, 600);
  };

  return (
    <section id="booking" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full bg-gold/5 blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="font-display tracking-[0.4em] text-gold text-xs mb-6 block">
            ◆ LOCK IT IN
          </span>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            Book a <em className="not-italic shimmer-text">Cut</em>
          </h2>
          <p className="mt-6 text-bone/60 max-w-md mx-auto">
            Fill this out and JoJo&apos;ll hit you back within the hour. Fastest reply is still a DM.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm p-8 md:p-14"
        >
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.98 }}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FieldGroup label="Name">
                    <input
                      required
                      className="input-field"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup label="Phone">
                    <input
                      required
                      type="tel"
                      className="input-field"
                      placeholder="(704) 555-0100"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </FieldGroup>

                  <FieldGroup label="Service">
                    <select
                      required
                      className="input-field appearance-none pr-8"
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      style={{
                        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 4px center",
                      }}
                    >
                      <option value="" className="bg-ink">Pick a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup label="Preferred Day">
                    <input
                      required
                      className="input-field"
                      placeholder="Friday afternoon, Sat morning…"
                      value={form.day}
                      onChange={(e) => update("day", e.target.value)}
                    />
                  </FieldGroup>
                </div>

                <div>
                  <div className="font-display tracking-[0.3em] text-bone/50 text-xs mb-4">
                    LOCATION PREFERENCE
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RadioCard
                      label="Come to me"
                      sub="JoJo pulls up — home, office, dorm."
                      active={form.location === "come"}
                      onClick={() => update("location", "come")}
                    />
                    <RadioCard
                      label="I'll pull up"
                      sub="Swing through JoJo's spot."
                      active={form.location === "pullup"}
                      onClick={() => update("location", "pullup")}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={pulsing ? { scale: [1, 1.05, 0.95, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative w-full md:w-auto px-12 py-5 rounded-full bg-gold text-ink font-display tracking-[0.25em] text-lg shadow-gold hover:shadow-gold-strong transition-shadow overflow-hidden"
                >
                  <span className="relative z-10">REQUEST APPOINTMENT</span>
                  <motion.span
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/40"
                  />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="mx-auto w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center mb-8"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-gold"
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                  Request <span className="text-gold">Sent</span>
                </h3>
                <p className="text-bone/60 max-w-sm mx-auto">
                  JoJo&apos;ll text you back at {form.phone || "your number"} shortly to confirm. Stay fresh.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-bone/60 mb-6">
            DMs open on IG:{" "}
            <a
              href="https://instagram.com/cuztbyjojo09"
              target="_blank"
              rel="noreferrer"
              className="text-gold link-underline font-medium"
            >
              @cuztbyjojo09
            </a>
          </p>
          <div className="flex items-center justify-center gap-6">
            <SocialIcon
              href="https://instagram.com/cuztbyjojo09"
              label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://tiktok.com/@cuztbyjojo09" label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.45a8.16 8.16 0 0 0 4.77 1.52V6.5a4.85 4.85 0 0 1-1.84.19z" />
              </svg>
            </SocialIcon>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-display tracking-[0.3em] text-bone/50 text-xs mb-3 block">
        {label}
      </span>
      {children}
    </label>
  );
}

function RadioCard({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left p-5 rounded-xl border transition-all duration-300 ${
        active
          ? "border-gold bg-gold/5 shadow-gold"
          : "border-white/10 hover:border-white/25 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
            active ? "border-gold" : "border-bone/30"
          }`}
        >
          <motion.div
            initial={false}
            animate={{ scale: active ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-2 h-2 rounded-full bg-gold"
          />
        </div>
        <div>
          <div className={`font-display tracking-wide text-lg ${active ? "text-gold" : "text-bone"}`}>
            {label}
          </div>
          <div className="text-bone/50 text-sm">{sub}</div>
        </div>
      </div>
    </button>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ y: -3 }}
      className="relative group w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-bone/70 hover:text-gold hover:border-gold transition-colors"
    >
      <span className="absolute inset-0 rounded-full bg-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative">{children}</span>
    </motion.a>
  );
}
