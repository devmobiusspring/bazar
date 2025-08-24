import CryptoJS from "crypto-js";

const SECRET_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY as string;

// Define a function to encrypt a string
export const encryptString = (data: string | object, key?: string): string => {
  const str = convertToString(data);
  const encrypted = CryptoJS.AES.encrypt(str, key || SECRET_KEY);
  return encrypted.toString();
};

// Define a function to decrypt an encrypted string
export const decryptString = (data: string, key?: string): string => {
  const decrypted = CryptoJS.AES.decrypt(data, key || SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const convertToString = (param: string | object): string => {
  if (typeof param === "object" && param !== null) {
    return JSON.stringify(param);
  } else if (typeof param === "string") {
    return param;
  } else {
    throw new Error("Parameter must be an object or a string");
  }
};
