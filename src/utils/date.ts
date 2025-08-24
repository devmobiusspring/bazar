import moment from "moment";

export const formatDateNowToDigits = () => {
  const now = moment(); // Get the current date and time

  // Convert to a digit format, e.g., YYYYMMDDHHmmss
  const digits = now.format("YYYYMMDDHHmmss");

  return digits;
};
