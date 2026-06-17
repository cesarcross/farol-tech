import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/i18n";
import { ThemeProvider } from "@/context/theme";
import { seo, siteConfig } from "@/lib/seo";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/rei.png`,
  description: seo.description,
  email: siteConfig.email,
  areaServed: ["PT", "GB", "EU"],
  knowsAbout: [
    "Web Development",
    "Mobile Applications",
    "E-Commerce",
    "Search Engine Optimization",
    "Digital Strategy",
  ],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Lisbon",
      addressCountry: "PT",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/rei.png", type: "image/png" }],
    apple: [{ url: "/rei.png", type: "image/png" }],
    shortcut: ["/rei.png"],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: seo.headline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            {/* Noise grain overlay for texture */}
            <div className="noise-overlay" aria-hidden="true" />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
