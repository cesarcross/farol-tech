"use client";

import React, { createContext, useContext, useState } from "react";

export type Locale = "en" | "pt";

/* ─── Translation dictionary ─────────────────────────────────────────────── */
const translations = {
  en: {
    /* Navbar */
    nav: {
      services: "Services",
      work: "Work",
      clients: "Clients",
      contact: "Contact",
      cta: "Get in touch",
      toggleTheme: "Toggle theme",
    },
    /* Hero */
    hero: {
      tag: "Digital Agency · Lisbon & London",
      headline1: "We build",
      headline2: "digital products",
      headline3: "that shine.",
      subheading:
        "Farol Tech is a software agency crafting high-performance web apps, SEO-optimised websites, and mobile experiences for ambitious brands.",
      cta_primary: "Start a project",
      cta_secondary: "See our work",
      scroll_hint: "Scroll to explore",
    },
    /* Services */
    services: {
      tag: "What we do",
      headline: "Full-cycle digital craft.",
      subheading:
        "From pixel-perfect interfaces to scalable backends — we cover the entire product lifecycle.",
      items: [
        {
          title: "Web Development",
          description:
            "Custom web applications built with React, Next.js, and modern APIs. Fast, maintainable, scalable.",
        },
        {
          title: "SEO & Performance",
          description:
            "Technically flawless sites optimised for search engines, Core Web Vitals, and real-world conversions.",
        },
        {
          title: "Mobile Applications",
          description:
            "Cross-platform apps with React Native — native feel, single codebase, launched faster.",
        },
        {
          title: "CRM & Integrations",
          description:
            "We connect your tools. HubSpot, Salesforce, custom CRMs — we make your data work for you.",
        },
        {
          title: "E-Commerce",
          description:
            "Storefronts that convert. Built on Shopify or fully custom, optimised for revenue.",
        },
        {
          title: "Landing Pages & Sites",
          description:
            "High-converting landing pages and institutional websites crafted to impress and perform.",
        },
      ],
    },
    /* Clients */
    clients: {
      tag: "Trusted by",
      headline: "Built for industry leaders.",
      subheading:
        "We've delivered for global brands across entertainment, finance, and media.",
    },
    /* Work */
    work: {
      tag: "Selected Work",
      headline: "Projects we're proud of.",
      subtitle: "A sample of recent work across web, mobile, and SaaS.",
      cases: {
        "kahu-pet": {
          headline:
            "A companion app that keeps pet owners connected to their animal's health and happiness.",
        },
        "trail-log": {
          headline:
            "GPS trail tracking and community platform for hikers, with offline-first architecture.",
        },
        "crumble-bakery": {
          headline:
            "A conversion-optimised online storefront and order management system for an artisan bakery.",
        },
        "autoparts-crm": {
          headline:
            "A custom CRM built for auto parts distributors — inventory, leads, and sales pipeline in one place.",
        },
      },
    },
    /* Contact */
    contact: {
      tag: "Let's talk",
      headline: "Tell us about your project.",
      subheading:
        "Whether you have a fully-formed brief or just a seed of an idea — we'd love to hear from you.",
      offices: [
        { city: "Lisbon", detail: "CET / WEST" },
        { city: "London", detail: "GMT / BST" },
        { city: "São Paulo", detail: "BRT" },
      ],
      form: {
        name_label: "Your name",
        name_placeholder: "Jane Smith",
        phone_label: "Phone / WhatsApp",
        phone_placeholder: "+351 910 000 000",
        message_label: "Tell us about your project",
        message_placeholder:
          "Describe what you're looking to build, your timeline, and anything else that's important…",
        submit: "Send message",
        whatsapp: "Chat on WhatsApp",
        success: "Message sent! We'll be in touch within 24 hours.",
        error: "Something went wrong. Please try again or message us on WhatsApp.",
      },
      validation: {
        name_required: "Name is required",
        name_min: "Name must be at least 2 characters",
        phone_required: "Phone number is required",
        message_required: "Message is required",
        message_min: "Tell us a bit more (at least 20 characters)",
      },
    },
    /* Footer */
    footer: {
      tagline: "Lighting the way forward.",
      offices: "Offices",
      lisbon: "Lisbon, Portugal",
      london: "London, United Kingdom",
      sao_paulo: "São Paulo, Brazil",
      links_label: "Navigation",
      legal: "All rights reserved.",
      privacy: "Privacy Policy",
    },
  },

  pt: {
    nav: {
      services: "Serviços",
      work: "Projetos",
      clients: "Clientes",
      contact: "Contacto",
      cta: "Fale connosco",
      toggleTheme: "Alternar tema",
    },
    hero: {
      tag: "Agência Digital · Lisboa & Londres",
      headline1: "Criamos",
      headline2: "produtos digitais",
      headline3: "que brilham.",
      subheading:
        "A Farol Tech é uma agência de software que desenvolve aplicações web de alto desempenho, sites otimizados para SEO e experiências mobile para marcas ambiciosas.",
      cta_primary: "Iniciar projeto",
      cta_secondary: "Ver o nosso trabalho",
      scroll_hint: "Explorar",
    },
    services: {
      tag: "O que fazemos",
      headline: "Desenvolvimento digital completo.",
      subheading:
        "Desde interfaces perfeitas ao pixel a backends escaláveis — cobrimos todo o ciclo de vida do produto.",
      items: [
        {
          title: "Desenvolvimento Web",
          description:
            "Aplicações web personalizadas com React, Next.js e APIs modernas. Rápidas, fáceis de manter e escaláveis.",
        },
        {
          title: "SEO & Performance",
          description:
            "Sites tecnicamente impecáveis, otimizados para motores de busca, Core Web Vitals e conversões reais.",
        },
        {
          title: "Aplicações Mobile",
          description:
            "Apps multiplataforma com React Native — experiência nativa, código único, lançamento mais rápido.",
        },
        {
          title: "CRM & Integrações",
          description:
            "Conectamos as suas ferramentas. HubSpot, Salesforce, CRMs personalizados — fazemos os seus dados trabalhar para si.",
        },
        {
          title: "E-Commerce",
          description:
            "Lojas que convertem. Construídas em Shopify ou totalmente personalizadas, otimizadas para receita.",
        },
        {
          title: "Landing Pages & Sites",
          description:
            "Landing pages de alta conversão e sites institucionais criados para impressionar e performar.",
        },
      ],
    },
    clients: {
      tag: "Parceiros de confiança",
      headline: "Construído para líderes da indústria.",
      subheading:
        "Entregámos para marcas globais no entretenimento, finanças e media.",
    },
    work: {
      tag: "Projetos em destaque",
      headline: "Projetos de que nos orgulhamos.",
      subtitle: "Uma amostra de trabalho recente em web, mobile e SaaS.",
      cases: {
        "kahu-pet": {
          headline:
            "Uma app companheira que mantém os donos de animais ligados à saúde e bem-estar dos seus pets.",
        },
        "trail-log": {
          headline:
            "Plataforma de rastreamento GPS de trilhos e comunidade para caminhantes, com arquitetura offline-first.",
        },
        "crumble-bakery": {
          headline:
            "Loja online otimizada para conversão e sistema de gestão de encomendas para uma padaria artesanal.",
        },
        "autoparts-crm": {
          headline:
            "CRM personalizado para distribuidores de peças automóveis — inventário, leads e pipeline de vendas num só lugar.",
        },
      },
    },
    contact: {
      tag: "Vamos conversar",
      headline: "Conte-nos sobre o seu projeto.",
      subheading:
        "Seja um briefing completo ou apenas uma ideia — adoraríamos ouvi-lo.",
      offices: [
        { city: "Lisboa", detail: "CET / WEST" },
        { city: "Londres", detail: "GMT / BST" },
        { city: "São Paulo", detail: "BRT" },
      ],
      form: {
        name_label: "O seu nome",
        name_placeholder: "João Silva",
        phone_label: "Telefone / WhatsApp",
        phone_placeholder: "+351 910 000 000",
        message_label: "Conte-nos sobre o projeto",
        message_placeholder:
          "Descreva o que quer construir, o prazo e qualquer detalhe importante…",
        submit: "Enviar mensagem",
        whatsapp: "Falar no WhatsApp",
        success: "Mensagem enviada! Entraremos em contacto em 24 horas.",
        error: "Algo correu mal. Por favor tente novamente ou contacte-nos pelo WhatsApp.",
      },
      validation: {
        name_required: "Nome é obrigatório",
        name_min: "O nome deve ter pelo menos 2 caracteres",
        phone_required: "Número de telefone é obrigatório",
        message_required: "Mensagem é obrigatória",
        message_min: "Diga-nos um pouco mais (pelo menos 20 caracteres)",
      },
    },
    footer: {
      tagline: "Iluminando o caminho.",
      offices: "Escritórios",
      lisbon: "Lisboa, Portugal",
      london: "Londres, Reino Unido",
      sao_paulo: "São Paulo, Brasil",
      links_label: "Navegação",
      legal: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];
export type WorkCaseSlug = keyof (typeof translations)["en"]["work"]["cases"];

/* ─── Context ────────────────────────────────────────────────────────────── */
interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: translations[locale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
