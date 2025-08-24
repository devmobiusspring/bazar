import { decryptString } from "./crypto";

export const getItemWithDecryption = (key: string) => {
  const encryptedValue = sessionStorage.getItem(key);
  if (!encryptedValue) return null;

  const decryptedValue = decryptString(
    encryptedValue,
    process.env.NEXT_PUBLIC_SECRET_KEY
  );
  return JSON.parse(decryptedValue);
};
