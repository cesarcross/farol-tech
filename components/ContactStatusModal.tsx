"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Clock, X } from "lucide-react";
import { EASE_OUT } from "@/lib/utils";

export type ContactModalVariant = "success" | "error" | "rate_limit";

interface ContactStatusModalProps {
  open: boolean;
  variant: ContactModalVariant;
  message: string;
  closeLabel: string;
  onClose: () => void;
}

const variantConfig: Record<
  ContactModalVariant,
  { Icon: typeof CheckCircle; iconClass: string; accentClass: string }
> = {
  success: {
    Icon: CheckCircle,
    iconClass: "text-[var(--color-amber)]",
    accentClass: "border-[var(--color-amber)]",
  },
  error: {
    Icon: AlertCircle,
    iconClass: "text-red-400",
    accentClass: "border-red-400/50",
  },
  rate_limit: {
    Icon: Clock,
    iconClass: "text-[var(--color-amber)]",
    accentClass: "border-[var(--color-amber)]/50",
  },
};

export default function ContactStatusModal({
  open,
  variant,
  message,
  closeLabel,
  onClose,
}: ContactStatusModalProps) {
  const { Icon, iconClass, accentClass } = variantConfig[variant];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className={`relative w-full max-w-md border bg-[var(--color-surface-1)] p-8 md:p-10 text-center shadow-2xl ${accentClass}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label={closeLabel}
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface-2)]">
                <Icon size={32} className={iconClass} strokeWidth={1} />
              </div>

              <p
                className="text-[var(--color-ink)] text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {message}
              </p>

              <button type="button" onClick={onClose} className="btn-primary mt-2">
                {closeLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
