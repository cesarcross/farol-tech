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
      "Lighting the way forward with websites, apps, and digital solutions that help your business reach more customers.",
      cta_primary: "Start a project",
      cta_secondary: "See our work",
      change_logo: "Change logo",
      logo_preview: "Logo preview",
    },
    /* Services */
    services: {
      tag: "What we do",
      headline: "Full-cycle digital craft.",
      subheading:
        "We guide your project from idea to launch, helping your business grow with confidence.",
      items: [
        {
          title: "Websites",
          description:
            "A modern website that showcases your business and makes it easy for customers to contact you."
        },
        {
          title: "Online Stores",
          description:
            "Start selling your products online with a simple and professional e-commerce website."
        },
        {
          title: "Mobile Apps",
          description:
            "Make it easier for your customers to interact with your business from their phones."
        },
        {
          title: "Business Systems",
          description:
            "Custom solutions to organize processes, save time, and make your daily operations easier."
        },
        {
          title: "Google Visibility",
          description:
            "Help more people find your business when they search online."
        },
        {
          title: "Dedicated Professionals",
          description:
            "Reliable developers ready to support your team and help deliver projects faster."
        },
      ],
    },
    /* Clients */
    clients: {
      tag: "Trusted by",
      headline: "From local businesses to global brands.",
      subheading:
        "We've helped companies of all sizes build their digital presence, from neighborhood businesses to internationally recognized brands.",
      quote:
        "Farol Tech guided us from idea to launch and made every step feel effortless.",
      quote_author:
        "Cristiano S. - Business Owner"
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
        "Whether you have a detailed plan or just an idea, we'd love to hear about your project.",
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
      "Iluminando o caminho para o futuro com sites, aplicativos e soluções digitais que ajudam sua empresa a alcançar mais clientes.",
      cta_primary: "Iniciar projeto",
      cta_secondary: "Ver o nosso trabalho",
      change_logo: "Mudar logo",
      logo_preview: "Pré-visualização do logo",
    },
    services: {
      tag: "O que fazemos",
      headline: "Desenvolvimento digital completo.",
      subheading:
        "Guiamos seu projeto da ideia ao lançamento, ajudando sua empresa a crescer com confiança.",
      items: [
        {
          title: "Landing Pages & Sites",
          description:
            "Landing pages de alta conversão e sites institucionais criados para impressionar e performar.",
        },
        {
          title: "Desenvolvimento Web",
          description:
            "Aplicações web personalizadas com React, Next.js e APIs modernas. Rápidas, fáceis de manter e escaláveis.",
        },
        {
          title: "Aplicações Mobile",
          description:
            "Apps multiplataforma com React Native — experiência nativa, código único, lançamento mais rápido.",
        },
        {
          title: "E-Commerce",
          description:
            "Lojas que convertem. Construídas em Shopify ou totalmente personalizadas, otimizadas para receita.",
        },
        {
          title: "SEO & Performance",
          description:
            "Sites tecnicamente impecáveis, otimizados para motores de busca, Core Web Vitals e conversões reais.",
        },
        {
          title: "Outsourcing",
          description:
            "Podes contar com nossos talentos para ampliar o teu time e ajudar-te a alcançar os teus objetivos.",
        },
      ],
    },
    clients: {
      tag: "Parceiros de confiança",
      headline: "De negócios locais a marcas globais.",
      subheading:
        "Ajudamos empresas de todos os portes a construir sua presença digital, desde negócios de bairro até marcas reconhecidas internacionalmente.",
      quote:
        "A Farol Tech guiou-nos da ideia ao lançamento e tornou cada etapa simples e tranquila.",
      quote_author:
        "Cristiano S. - Empresário"
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
        "Seja um plano detalhado ou apenas uma ideia, gostaríamos de conhecer o seu projeto.",
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
