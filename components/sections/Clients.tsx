"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/context/i18n";

/* SVG logos for major brands */
const LOGO_FONT: React.SVGProps<SVGTextElement> = {
  fontFamily: "Georgia, serif",
  fontSize: "28",
  fontStyle: "italic",
  fontWeight: "700",
  fill: "currentColor",
};

const logos = [
  {
    name: "Disney",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>Disney</text>
      </svg>
    ),
  },
  {
    name: "Paramount",
    svg: (
      <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>Paramount</text>
      </svg>
    ),
  },
  {
    name: "Sky",
    svg: (
      <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>Sky</text>
      </svg>
    ),
  },
  {
    name: "Johnson & Johnson",
    svg: (
      <svg viewBox="0 0 310 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>Johnson &amp; Johnson</text>
      </svg>
    ),
  },
  {
    name: "CNN",
    svg: (
      <svg viewBox="0 0 75 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>CNN</text>
      </svg>
    ),
  },

  {
    name: "DirecTV",
    svg: (
      <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
        <text x="0" y="30" {...LOGO_FONT}>DirecTV</text>
      </svg>
    ),
  },
];

/* Duplicate for seamless scroll */
const doubledLogos = [...logos, ...logos];

export default function Clients() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" className="section-padding relative">
      {/* Top border */}
      <div className="divider mb-0" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">{t.clients.tag}</span>
            <span className="hr-amber" style={{ marginRight: 0, marginLeft: "0.75rem" }} />
          </div>
          <h2
            className="display-md mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.clients.headline}
          </h2>
          <p className="text-[var(--color-ink-secondary)] text-sm max-w-md mx-auto">
            {t.clients.subheading}
          </p>
        </motion.div>
      </div>

      {/* Marquee — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track py-6">
          {doubledLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center mx-10 md:mx-16 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300 select-none"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Featured quote */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="container-custom mt-16"
      >
        <div className="border border-[var(--color-border)] bg-[var(--color-surface-1)] p-8 md:p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
          {/* Decorative amber corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-amber)] opacity-40" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-amber)] opacity-40" />

          <p
            className="font-display text-xl md:text-2xl font-light italic text-[var(--color-ink)] leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;{t.clients.quote}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[var(--color-amber)]" />
            <span className="label-tag text-[var(--color-ink-secondary)]">
              {t.clients.quote_author}
            </span>
            <div className="w-8 h-px bg-[var(--color-amber)]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
