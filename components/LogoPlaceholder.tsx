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

/** Matches .display-xl: 3 lines × line-height 0.95 */
const FALLBACK_HEIGHT = "calc(3 * clamp(3.5rem, 9vw, 8rem) * 0.95)";

interface LogoPlaceholderProps {
  headlineRef: React.RefObject<HTMLElement | null>;
  anchorRef: React.RefObject<HTMLElement | null>;
}

interface LayoutMetrics {
  top: number;
  height: number;
}

export default function LogoPlaceholder({ headlineRef, anchorRef }: LogoPlaceholderProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState<LayoutMetrics>({ top: 0, height: 0 });
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  const measure = useCallback(() => {
    const headline = headlineRef.current;
    const anchor = anchorRef.current;
    if (!headline || !anchor) return false;

    const headlineRect = headline.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    if (headlineRect.height <= 0) return false;

    setMetrics({
      top: headlineRect.top - anchorRect.top,
      height: headlineRect.height,
    });
    setShow(window.innerWidth >= MIN_VIEWPORT);
    setReady(true);
    return true;
  }, [headlineRef, anchorRef]);

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
      if (!headline || !anchor) return;

      observer = new ResizeObserver(measure);
      observer.observe(headline);
      observer.observe(anchor);
    };

    setup();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, headlineRef, anchorRef]);

  const cycleLogo = () => {
    setIndex((prev) => (prev + 1) % LOGOS.length);
  };

  if (!show) return null;

  const logoHeight =
    metrics.height > 0
      ? metrics.height * 1.2
      : `calc(${FALLBACK_HEIGHT} * 1.2)`;

  return (
    <div
      className="absolute right-0 z-20 flex flex-col items-end gap-2"
      style={{
        top: metrics.top > 0 ? metrics.top : undefined,
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
        {ready && (
          <AnimatePresence mode="wait">
            <motion.div
              key={LOGOS[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full"
            >
              <Image
                src={LOGOS[index]}
                alt=""
                fill
                className="object-contain object-right"
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
