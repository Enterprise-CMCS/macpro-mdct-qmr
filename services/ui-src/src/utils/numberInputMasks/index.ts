export const allIntegers = /^-?\d*$/i;
export const allNumbers = /^-?\d*\.?\d*$/i;
export const allPositiveIntegers = /^\d*$/i;
export const monthValues = /^((1[0-2])|[1-9])?$/i;
export const yearValues = /^((19|20)?\d{0,2})$/i;
export const percentages = /^(?:100|\d{1,2})(?:\.\d{0,1})?$/i;

export const integersWithMaxDecimalPlaces = (maxDecimal: number) =>
  new RegExp(`^-?\\d*\\.?\\d{0,${maxDecimal}}$`);
export const positiveNumbersWithMaxDecimalPlaces = (maxDecimal: number) =>
  new RegExp(`^\\d*\\.?\\d{0,${maxDecimal}}$`);
