"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";
import { useI18n } from "@/context/i18n";
import { EASE_OUT } from "@/lib/utils";

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
};

export default function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Amber glow orb */}
      <motion.div
        
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          right: "-5%",
          width: "clamp(320px, 45vw, 700px)",
          height: "clamp(320px, 45vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--color-hero-glow-inner) 0%, var(--color-hero-glow-outer) 40%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="container-custom relative z-10 pt-28 pb-20 md:pt-36"
      >
        <div ref={heroAnchorRef} className="relative">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          {/* Tag */}
          <motion.div variants={stagger.item} className="flex items-center gap-3 mb-8">
            <span className="hr-amber" />
            <span className="label-tag">{t.hero.tag}</span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={stagger.item}>
            <h1 ref={headlineRef} className="display-xl mb-8">
              <span className="block">{t.hero.headline1}</span>
              <span className="block italic text-[var(--color-amber)]">
                {t.hero.headline2}
              </span>
              <span className="block">{t.hero.headline3}</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={stagger.item}
            className="text-base md:text-lg text-[var(--color-ink-secondary)] max-w-lg leading-relaxed mb-10"
          >
            {t.hero.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              {t.hero.cta_primary}
              <ArrowRight size={16} />
            </a>
            <a href="#clients" className="btn-ghost">
              {t.hero.cta_secondary}
            </a>
          </motion.div>
        </motion.div>

        <LogoPlaceholder headlineRef={headlineRef} anchorRef={heroAnchorRef} />
        </div>

        {/* Stats row */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="mt-20 md:mt-28 grid grid-cols-3 gap-px border border-[var(--color-border)] max-w-lg"
        >
          {[
            { value: "8+", label: "Years" },
            { value: "60+", label: "Projects" },
            { value: "3", label: "Continents" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={stagger.item}
              className="flex flex-col items-center py-5 bg-[var(--color-surface-1)]"
            >
              <span
                className="font-display text-3xl md:text-4xl font-light text-[var(--color-amber)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </span>
              <span className="label-tag mt-1 text-[var(--color-ink-muted)]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-tag text-[var(--color-ink-muted)]">
          {t.hero.scroll_hint}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-[var(--color-amber)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
