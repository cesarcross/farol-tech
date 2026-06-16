"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/context/i18n";

const LOGOS = [
  // "/l-1.png",
  "/farol-bg.png",
  // "/l-2.png",
  // "/l-3.png",
  // "/l-4.png",
  // "/l-5.png",
  // "/l-6.png",
  // "/l-7.svg",
] as const;

const MIN_VIEWPORT = 900;

const LOGO_OFFSET_Y = -20;

/**
 * Hero logo glow — tweak here for manual tests.
 * scale: size relative to the logo box (1 = fills the box)
 * offsetX / offsetY: nudge position in px (negative offsetY = up)
 * innerOpacity / midOpacity / outerOpacity: gradient strength (0–100)
 * blur: soft edge in px
 */
const LOGO_GLOW = {
  scale: 1.01,
  offsetX: 0,
  offsetY: -18,
  innerOpacity: 38,
  midOpacity: 20,
  outerOpacity: 8,
  blur: 3,
} as const;

/** Matches .display-xl: 3 lines × line-height 0.95 */
const FALLBACK_HEIGHT = "calc(3 * clamp(3.5rem, 9vw, 8rem) * 0.95)";

interface LogoPlaceholderProps {
  headlineRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<HTMLElement | null>;
  baselineRef: React.RefObject<HTMLElement | null>;
}

interface LayoutMetrics {
  top: number;
  height: number;
}

export default function LogoPlaceholder({ headlineRef, anchorRef, baselineRef }: LogoPlaceholderProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState<LayoutMetrics>({ top: 0, height: 0 });
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  const measure = useCallback(() => {
    const headline = headlineRef.current;
    const anchor = anchorRef.current;
    const baseline = baselineRef.current;
    if (!headline || !anchor || !baseline) return false;

    const headlineRect = headline.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const baselineRect = baseline.getBoundingClientRect();

    if (headlineRect.height <= 0) return false;

    const height = headlineRect.height * 1.2;
    const baselineBottom = baselineRect.bottom - anchorRect.top;

    setMetrics({
      top: baselineBottom - height,
      height,
    });
    setShow(window.innerWidth >= MIN_VIEWPORT);
    setReady(true);
    return true;
  }, [headlineRef, anchorRef, baselineRef]);

  useLayoutEffect(() => {
    let raf = 0;
    let observer: ResizeObserver | null = null;

    const setup = () => {
      if (!measure()) {
        raf = requestAnimationFrame(setup);
        return;
      }

      const headline = headlineRef.current;
      const anchor = anchorRef.current;
      const baseline = baselineRef.current;
      if (!headline || !anchor || !baseline) return;

      observer = new ResizeObserver(measure);
      observer.observe(headline);
      observer.observe(anchor);
      observer.observe(baseline);
    };

    setup();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, headlineRef, anchorRef, baselineRef]);

  const cycleLogo = () => {
    setIndex((prev) => (prev + 1) % LOGOS.length);
  };

  if (!show) return null;

  const logoHeight =
    metrics.height > 0 ? metrics.height : `calc(${FALLBACK_HEIGHT} * 1.2)`;

  return (
    <div
      className="absolute right-0 z-20 flex flex-col items-end gap-2"
      style={{
        top: metrics.height > 0 ? metrics.top + LOGO_OFFSET_Y : undefined,
        width: "clamp(192px, 26.4vw, 384px)",
      }}
    >
      {/* Logo — fills headline height, no visible container */}
      <button
        type="button"
        onClick={cycleLogo}
        aria-label={t.hero.logo_preview}
        className="relative w-full cursor-pointer border-0 bg-transparent p-0"
        style={{ height: logoHeight }}
      >
        {/* Amber glow — centered on logo; see LOGO_GLOW above to tweak */}
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            width: `${LOGO_GLOW.scale * 100}%`,
            aspectRatio: "1",
            top: "50%",
            left: "50%",
            transform: `translate(calc(-50% + ${LOGO_GLOW.offsetX}px), calc(-50% + ${LOGO_GLOW.offsetY}px))`,
            borderRadius: "50%",
            background: `radial-gradient(circle, color-mix(in srgb, var(--color-amber) ${LOGO_GLOW.innerOpacity}%, transparent) 0%, color-mix(in srgb, var(--color-amber) ${LOGO_GLOW.midOpacity}%, transparent) 30%, color-mix(in srgb, var(--color-amber) ${LOGO_GLOW.outerOpacity}%, transparent) 55%, transparent 78%)`,
            filter: `blur(${LOGO_GLOW.blur}px)`,
          }}
        />

        {ready && (
          <AnimatePresence mode="wait">
            <motion.div
              key={LOGOS[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 h-full w-full"
            >
              <Image
                src={LOGOS[index]}
                alt=""
                fill
                className="object-contain object-right object-bottom"
                sizes="384px"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </button>

      {/* Temporary picker control — remove once client chooses a logo */}
      {/* <button
        type="button"
        onClick={cycleLogo}
        className="flex items-center gap-2 border border-[var(--color-amber)] px-4 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-amber)] hover:text-[var(--color-surface-1)] transition-colors"
      >
        <RefreshCw size={16} strokeWidth={2} />
        {t.hero.change_logo}
        <span className="font-mono text-xs tracking-wider opacity-80">
          {index + 1}/{LOGOS.length}
        </span>
      </button> */}
    </div>
  );
}
