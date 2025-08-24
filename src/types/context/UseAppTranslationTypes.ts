import type { i18n, TFunction } from "i18next";

export type TranslationContextType = {
  i18n: i18n;
  currentLanguage: string;
  t: TFunction;
  changeLanguage: (lng: string) => Promise<void>;
  LANGUAGES: Record<string, string>;
};
