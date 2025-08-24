"use client";
import React, { useEffect, useState, createContext, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "next-i18next";
import i18n from "@/core/i18n";
import tokens from "@/config/tokens";
import { useLocalStorage } from "@/hooks";
import { TranslationContextType } from "../types";

// ** Defaults
const defaultTFunction: TFunction = ((key: string) => key) as TFunction;
const defaultProvider: TranslationContextType = {
  i18n,
  currentLanguage: i18n.language,
  t: defaultTFunction,
  changeLanguage: () => Promise.resolve(),
  LANGUAGES: {},
};

const TranslationContext =
  createContext<TranslationContextType>(defaultProvider);

type TranslationProviderProps = {
  children: ReactNode;
};

const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  /* Hooks */
  const { t } = useTranslation();
  const localStorage = useLocalStorage();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
  const LANGUAGES = { en: t("english"), es: t("spanish") };

  // useEffect(() => {
  //   const lng = localStorage.getItem(tokens.Lng);
  //   if (lng) {
  //     // await i18n.changeLanguage(lng);
  //     // setCurrentLanguage(lng);
  //     changeLanguage(lng);
  //   }
  // }, []);

  const changeLanguage = async (lng: string = "en") => {
    await i18n.changeLanguage(lng);
    localStorage.setItem(tokens.Lng, lng);
    setCurrentLanguage(lng);
  };

  const values: TranslationContextType = {
    LANGUAGES,
    i18n,
    t,
    changeLanguage,
    currentLanguage,
  };

  return (
    <TranslationContext.Provider value={values}>
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationContext, TranslationProvider };
