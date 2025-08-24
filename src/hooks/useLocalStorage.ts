import { UseLocalStorageType } from "../types";
import { crypto } from "@/utils";

export const useLocalStorage = (): UseLocalStorageType => {
  const removeItem = (key: string): void => {
    window.localStorage.removeItem(key);
  };

  const setItemWithEncryption = (key: string, value: string): void => {
    const encryptedValue = crypto.encryptString(
      value,
      process.env.REACT_APP_SECRET_KEY as string
    );
    localStorage.setItem(key, encryptedValue);
  };

  const getItemWithDecryption = (key: string): string | null => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    const decryptedValue = crypto.decryptString(
      encryptedValue,
      process.env.REACT_APP_SECRET_KEY as string
    );
    return decryptedValue;
  };

  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string): string | null => {
    const value = localStorage.getItem(key);
    if (!value) return null;

    return value;
  };

  return {
    removeItem,
    getItem,
    setItem,
    setItemWithEncryption,
    getItemWithDecryption,
  };
};

export default useLocalStorage;
