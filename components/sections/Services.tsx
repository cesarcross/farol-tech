"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Search,
  Smartphone,
  ShoppingBag,
  Layout,
  User
} from "lucide-react";
import { useI18n } from "@/context/i18n";
import { EASE_OUT } from "@/lib/utils";

const ICONS = [Layout, ShoppingBag, Smartphone, Globe, Search, User];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE_OUT },
  }),
};

export default function Services() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Subtle left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-amber)] to-transparent opacity-30" />

      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">{t.services.tag}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-md max-w-lg" style={{ fontFamily: "var(--font-display)" }}>
              {t.services.headline}
            </h2>
            <p className="text-[var(--color-ink-secondary)] max-w-sm text-sm leading-relaxed">
              {t.services.subheading}
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="service-card group p-8 md:p-10 cursor-default"
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  (e.currentTarget as HTMLElement).style.setProperty("--mx", `${x}%`);
                  (e.currentTarget as HTMLElement).style.setProperty("--my", `${y}%`);
                }}
              >
        
                {/* Icon */}
                <div className="mb-5 w-10 h-10 flex items-center justify-center border border-[var(--color-border-strong)] group-hover:border-[var(--color-amber)] transition-colors">
                  <Icon size={18} className="text-[var(--color-amber)]" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-medium text-[var(--color-ink)] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {/* Arrow hint */}
                <div className="mt-6 flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--color-ink-muted)] group-hover:text-[var(--color-amber)] transition-colors">
                  <span className="inline-block w-5 h-px bg-current transition-all group-hover:w-8" />
                  <span>Learn more</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
