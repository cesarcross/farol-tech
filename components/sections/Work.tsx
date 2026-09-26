"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  ShoppingBag,
  PawPrint,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useI18n, type WorkCaseSlug } from "@/context/i18n";
import { EASE_OUT } from "@/lib/utils";

/* ─── Case data (sector & tags stay in English) ─────────────────────────── */
const casesMeta: {
  slug: WorkCaseSlug;
  client: string;
  sector: string;
  tags: string[];
  Icon: LucideIcon;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  href?: string;
}[] = [
  {
    slug: "kahu-pet",
    client: "Kahu Pet",
    href: "https://kahupet.vercel.app/",
    sector: "Pet Care · Mobile App",
    tags: ["Next.js", "Node.js", "Push Notifications"],
    Icon: PawPrint,
    accentColor: "#F5A623",
    bgFrom: "#1A1200",
    bgTo: "#0A0A0A",
    imageSrc: "/kahu.png",
    imageWidth: 529,
    imageHeight: 220,
  },
  {
    slug: "trail-log",
    client: "Trail Log",
    sector: "Outdoor · Web App",
    tags: ["React Native", "Mapbox", "GPS"],
    Icon: Globe,
    accentColor: "#5DB075",
    bgFrom: "#001A0E",
    bgTo: "#0A0A0A",
    imageSrc: "/trail.png",
    imageWidth: 529,
    imageHeight: 220,
  },
  {
    slug: "crumble-bakery",
    client: "Crumble Bakery",
    sector: "Food & Beverage · E-Commerce",
    tags: ["Next.js", "E-commerce", "SEO"],
    Icon: ShoppingBag,
    accentColor: "#E8A87C",
    bgFrom: "#1A0A00",
    bgTo: "#0A0A0A",
    imageSrc: "/crumble.png",
    imageWidth: 1408,
    imageHeight: 768,
    imageFit: "contain",
    imageBg: "#F8EDE3",
  },
  {
    slug: "autoparts-crm",
    client: "AutoParts CRM",
    sector: "Automotive · SaaS",
    tags: ["React", "Supabase", "TypeScript"],
    Icon: Wrench,
    accentColor: "#4A90D9",
    bgFrom: "#00101A",
    bgTo: "#0A0A0A",
    imageSrc: "/auto.png",
    imageWidth: 1408,
    imageHeight: 768,
    imageFit: "contain",
    imageBg: "#EBEFEF",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Work() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="section-padding" style={{ background: "var(--color-surface-1)" }}>
      <div className="container-custom" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">{t.work.tag}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="display-md"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.work.headline}
            </h2>
            <p className="text-sm text-[var(--color-ink-secondary)] max-w-xs">
              {t.work.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {casesMeta.map((c, i) => (
            <WorkCard
              key={c.slug}
              {...c}
              headline={t.work.cases[c.slug].headline}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* TODO: See more button with new projects */}
        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
          className="flex justify-center mt-10"
        >
          <Link href="/portfolio" className="btn-ghost flex items-center gap-2">
            {t.work.see_more}
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </motion.div> */}

      </div>
    </section>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
interface WorkCardProps {
  client: string;
  sector: string;
  headline: string;
  tags: string[];
  Icon: LucideIcon;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  href?: string;
  index: number;
  inView: boolean;
}

function WorkCard({
  client,
  sector,
  headline,
  tags,
  Icon,
  accentColor,
  bgFrom,
  bgTo,
  imageSrc,
  imageWidth,
  imageHeight,
  imageFit = "cover",
  imageBg,
  href,
  index,
  inView,
}: WorkCardProps) {
  const CardWrapper = href ? motion.a : motion.article;

  return (
    <CardWrapper
      {...(href
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
      className={`group flex flex-col overflow-hidden${href ? " cursor-pointer" : ""}`}
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-2)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${accentColor}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "220px",
          background: imageBg ?? `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
        }}
      >
        {imageSrc && imageWidth && imageHeight ? (
          imageFit === "contain" ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image
                src={imageSrc}
                alt={client}
                width={imageWidth}
                height={imageHeight}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="max-h-full max-w-full object-contain"
                priority={false}
              />
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={client}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority={false}
            />
          )
        ) : (
          <>
            {/* Subtle dot-grid texture */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, ${accentColor}22 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Centered icon placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex flex-col items-center gap-3"
                style={{ opacity: 0.55 }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    border: `2px solid ${accentColor}`,
                    borderRadius: "2px",
                  }}
                >
                  <Icon size={28} strokeWidth={1.5} color={accentColor} />
                </div>
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: accentColor, letterSpacing: "0.18em" }}
                >
                  {client}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Accent corner line */}
        <div
          className="absolute top-0 left-0 w-12 h-1"
          style={{ background: accentColor }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: `${accentColor}10` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p
              className="font-display text-xl text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
            >
              {client}
            </p>
            <p className="label-tag mt-0.5" style={{ color: accentColor }}>
              {sector}
            </p>
          </div>
          {href && (
            <div
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{
                borderColor: accentColor,
                color: accentColor,
                transform: "translate(4px, -4px)",
              }}
            >
              <ArrowUpRight size={15} strokeWidth={2} />
            </div>
          )}
        </div>

        {/* Headline */}
        <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed flex-1 mb-5">
          {headline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs tracking-wider px-2.5 py-1"
              style={{
                background: `${accentColor}12`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
                letterSpacing: "0.1em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}
