// Trying to follow the ISO 4217 here:
/* 
References:
https://www.newbridgefx.com/currency-codes-symbols/

*/
export const currencies: { [key: string]: string } = { USD: "$" };

export const formatCurrency = (value: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};
