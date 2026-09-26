"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageCircle } from "lucide-react";
import ContactStatusModal, {
  type ContactModalVariant,
} from "@/components/ContactStatusModal";
import { useI18n } from "@/context/i18n";

const COOLDOWN_SECONDS = 30;

/* ─── Form schema (dynamic — built from translations in component) ────────── */
const buildSchema = (v: {
  name_required: string;
  name_min: string;
  email_required: string;
  email_invalid: string;
  message_required: string;
  message_min: string;
}) =>
  z.object({
    name: z.string().min(1, v.name_required).min(2, v.name_min),
    email: z
      .string()
      .min(1, v.email_required)
      .email(v.email_invalid),
    phone: z.string().max(30).default(""),
    message: z.string().min(1, v.message_required).min(10, v.message_min),
  });

type FormData = z.infer<ReturnType<typeof buildSchema>>;

type ModalState = {
  variant: ContactModalVariant;
  message: string;
} | null;

/* WhatsApp number — update as needed */
const WA_NUMBER = "351918738888";

function toWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hi! I found you at faroldigital.app and I'd like to discuss a project."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export default function Contact() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [modal, setModal] = useState<ModalState>(null);
  const [cooldown, setCooldown] = useState(0);

  const schema = buildSchema(t.contact.validation);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldown]);

  const startCooldown = (seconds = COOLDOWN_SECONDS) => {
    setCooldown(seconds);
  };

  const openModal = (variant: ContactModalVariant, message: string) => {
    setModal({ variant, message });
  };

  const onSubmit = async (data: FormData) => {
    if (cooldown > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await res.json().catch(() => null)) as {
        error?: string;
        retryAfter?: number;
      } | null;

      if (res.status === 429 || payload?.error === "rate_limit") {
        const retryAfter = payload?.retryAfter ?? COOLDOWN_SECONDS;
        startCooldown(retryAfter);
        openModal("rate_limit", t.contact.form.rate_limit);
        return;
      }

      if (!res.ok) {
        startCooldown();
        openModal("error", t.contact.form.error);
        return;
      }

      startCooldown();
      reset();
      openModal("success", t.contact.form.success);
    } catch {
      startCooldown();
      openModal("error", t.contact.form.error);
    } finally {
      setStatus("idle");
    }
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I found you at faroldigital.app and I'd like to discuss a project.")}`;

  const isSubmitDisabled = status === "loading" || cooldown > 0;

  return (
    <section id="contact" className="section-padding relative">
      <ContactStatusModal
        open={modal !== null}
        variant={modal?.variant ?? "success"}
        message={modal?.message ?? ""}
        closeLabel={t.contact.form.modal_close}
        onClose={() => setModal(null)}
      />

      <div className="divider mb-0" />

      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="hr-amber" />
              <span className="label-tag">{t.contact.tag}</span>
            </div>
            <h2
              className="display-md mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.contact.headline}
            </h2>
            <p className="text-[var(--color-ink-secondary)] text-sm leading-relaxed mb-10">
              {t.contact.subheading}
            </p>

            {/* Info tiles — shared grid so phones align across rows */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-6">
              {t.contact.offices.map((office, index) => {
                const rowClass =
                  index < t.contact.offices.length - 1
                    ? "border-b border-[var(--color-border)] pb-4 mb-4"
                    : "";

                return (
                  <Fragment key={office.city}>
                    <span className={`text-sm text-[var(--color-ink)] ${rowClass}`}>
                      {office.city}
                    </span>
                    <a
                      href={toWhatsAppUrl(office.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm text-[var(--color-ink-subtle)] hover:text-[var(--color-amber)] transition-colors justify-self-center whitespace-nowrap ${rowClass}`}
                    >
                      {office.phone}
                    </a>
                    <span
                      className={`label-tag text-[var(--color-ink-muted)] justify-self-end text-right ${rowClass}`}
                    >
                      {office.detail}
                    </span>
                  </Fragment>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-10 w-full justify-center"
            >
              <MessageCircle size={16} className="text-[var(--color-amber)]" />
              {t.contact.form.whatsapp}
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="border border-[var(--color-border)] bg-[var(--color-surface-1)] p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Name */}
                <div>
                  <label className="form-label">{t.contact.form.name_label}</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={t.contact.form.name_placeholder}
                    className="form-field"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">{t.contact.form.email_label}</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t.contact.form.email_placeholder}
                    className="form-field"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">{t.contact.form.phone_label}</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder={t.contact.form.phone_placeholder}
                    className="form-field"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">{t.contact.form.message_label}</label>
                  <textarea
                    {...register("message")}
                    placeholder={t.contact.form.message_placeholder}
                    rows={5}
                    className="form-field resize-none"
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t.contact.form.sending}
                    </span>
                  ) : cooldown > 0 ? (
                    t.contact.form.wait_seconds.replace(
                      "{{seconds}}",
                      String(cooldown)
                    )
                  ) : (
                    <>
                      {t.contact.form.submit}
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
