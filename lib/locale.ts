export type Locale = "en" | "pt";

export const LOCALE_STORAGE_KEY = "farol-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "pt";
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const languages =
    navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const language of languages) {
    const code = language.toLowerCase().split("-")[0];
    if (code === "pt") return "pt";
  }

  return "en";
}

export function resolveLocale(stored: string | null): Locale {
  if (isLocale(stored)) return stored;
  return detectBrowserLocale();
}
