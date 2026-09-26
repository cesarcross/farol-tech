"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/context/i18n";

const WORK_ITEMS: { label: string; slug: string }[] = [
  { label: "Work A", slug: "site-de-padaria" },
  { label: "Work B", slug: "site-de-veterinaria" },
  { label: "Work C", slug: "loja-online" },
  { label: "Work D", slug: "app-mobile" },
  { label: "Work E", slug: "sistema-crm" },
  { label: "Work F", slug: "site-corporativo" },
  { label: "Work G", slug: "plataforma-saas" },
  { label: "Work H", slug: "app-fitness" },
  { label: "Work I", slug: "marketplace" },
  { label: "Work J", slug: "portal-educacional" },
];

export default function PortfolioPage() {
  const { t } = useI18n();

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--color-bg)", color: "var(--color-ink)" }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative flex items-center gap-3 overflow-visible group/logo"
              aria-label="Farol Digital home"
            >
              <div className="relative z-10 h-7 w-7 shrink-0">
                <Image
                  src="/rei.png"
                  alt="Farol Digital"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                  priority
                />
              </div>
              <span
                className="relative z-10 font-display text-xl font-light tracking-wide text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Farol Digital
              </span>
            </Link>

            {/* Back link */}
            <Link
              href="/#work"
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              {t.work.see_more === "See more" ? "Back" : "Voltar"}
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="container-custom py-16 md:py-24">
        {/* Page heading */}
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="hr-amber" />
            <span className="label-tag">{t.work.tag}</span>
          </div>
          <h1
            className="display-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Portfolio
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {WORK_ITEMS.map((item, index) => (
            <WorkPlaceholderCard
              key={item.slug}
              label={item.label}
              slug={item.slug}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function WorkPlaceholderCard({
  label,
  slug,
  index,
}: {
  label: string;
  slug: string;
  index: number;
}) {
  const hue = (index * 36) % 360;
  const accentColor = `hsl(${hue}, 55%, 55%)`;

  return (
    <Link
      href={`/portfolio/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden group cursor-pointer"
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-surface-2)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${accentColor}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "200px" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsl(${hue}, 30%, 10%) 0%, var(--color-bg) 100%)`,
          }}
        />
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${accentColor}22 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Centered letter badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center"
            style={{
              width: "64px",
              height: "64px",
              border: `2px solid ${accentColor}`,
              borderRadius: "2px",
              opacity: 0.6,
            }}
          >
            <span
              className="font-mono text-2xl font-light"
              style={{ color: accentColor }}
            >
              {label.slice(-1)}
            </span>
          </div>
        </div>

        {/* Accent top line */}
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

      {/* Card content */}
      <div className="flex items-start justify-between p-5">
        <div>
          <p
            className="font-display text-lg"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            {label}
          </p>
          <p
            className="font-mono text-xs tracking-wider mt-1"
            style={{ color: accentColor, letterSpacing: "0.14em" }}
          >
            {slug}
          </p>
        </div>

        {/* Arrow icon — visible on hover */}
        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 opacity-0 group-hover:opacity-100 mt-0.5"
          style={{
            borderColor: accentColor,
            color: accentColor,
            transform: "translate(4px, -4px)",
          }}
        >
          <ArrowUpRight size={15} strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}
