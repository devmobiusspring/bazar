export type UseLocalStorageType = {
    removeItem: (key: string) => void;
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    setItemWithEncryption: (key: string, value: string) => void;
    getItemWithDecryption: (key: string) => string | null;
  };
  