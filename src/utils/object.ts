export const pickProperties = (obj: any, keys: string[]) => {
  const result: any = {};
  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};
