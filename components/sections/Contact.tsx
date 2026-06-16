"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { useI18n } from "@/context/i18n";

/* ─── Form schema (dynamic — built from translations in component) ────────── */
const buildSchema = (v: {
  name_required: string;
  name_min: string;
  phone_required: string;
  message_required: string;
  message_min: string;
}) =>
  z.object({
    name: z.string().min(1, v.name_required).min(2, v.name_min),
    phone: z.string().min(1, v.phone_required),
    message: z.string().min(1, v.message_required).min(20, v.message_min),
  });

type FormData = z.infer<ReturnType<typeof buildSchema>>;

/* WhatsApp number — update as needed */
const WA_NUMBER = "351918738888"; 

export default function Contact() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = buildSchema(t.contact.validation);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I found you at faroltech.io and I'd like to discuss a project.")}`;

  return (
    <section id="contact" className="section-padding relative">
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

            {/* Info tiles */}
            <div className="space-y-4">
              {t.contact.offices.map((office) => (
                <div
                  key={office.city}
                  className="flex items-center justify-between border-b border-[var(--color-border)] pb-4"
                >
                  <span className="text-sm text-[var(--color-ink)]">{office.city}</span>
                  <span className="label-tag text-[var(--color-ink-muted)]">{office.detail}</span>
                </div>
              ))}
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
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <CheckCircle size={48} className="text-[var(--color-amber)]" strokeWidth={1} />
                  <p className="text-[var(--color-ink)] text-lg" style={{ fontFamily: "var(--font-display)" }}>
                    {t.contact.form.success}
                  </p>
                </div>
              ) : (
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

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="flex items-start gap-3 border border-red-900/50 bg-red-900/10 p-4">
                      <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-400">{t.contact.form.error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <>
                        {t.contact.form.submit}
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
