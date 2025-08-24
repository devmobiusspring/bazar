"use client";
import { useContext } from "react";
import { TranslationContext } from "@/context/AppTranslationContext";
import { TranslationContextType } from "../../types";

export const useAppTranslation = (): TranslationContextType =>
  useContext(TranslationContext);

export default useAppTranslation;
