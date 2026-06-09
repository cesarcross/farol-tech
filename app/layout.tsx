import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/context/i18n";
import { ThemeProvider } from "@/context/theme";

export const metadata: Metadata = {
  title: "Farol Tech — Digital Agency · Lisbon & London",
  description:
    "Farol Tech builds high-performance web apps, SEO-optimised websites, and mobile experiences for ambitious brands. Based in Lisbon and London.",
  keywords: [
    "digital agency",
    "web development",
    "Next.js",
    "React",
    "SEO",
    "mobile apps",
    "Lisbon",
    "London",
    "Portugal",
  ],
  openGraph: {
    title: "Farol Tech — Digital Agency",
    description: "We build digital products that shine.",
    url: "https://faroltech.io",
    siteName: "Farol Tech",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farol Tech — Digital Agency",
    description: "We build digital products that shine.",
  },
  robots: {
    index: true,
    follow: true,
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
