export const allIntegers = /^-?\d*$/i;
export const allNumbers = /^-?\d*\.?\d*$/i;
export const eightNumbersOneDecimal = /^\d{0,8}((\.\d)?|(\.)?)$/i;
export const sixteenNumbersFourDecimal = /^\d{0,16}((\.\d{0,4})?|(\.)?)$/i;
export const allPositiveIntegers = /^\d*$/i;
export const allPositiveIntegersWith3Digits = /^\d{0,3}$/i;
export const allPositiveIntegersWith8Digits = /^\d{0,8}$/i;
export const allPositiveIntegersWith10Digits = /^\d{0,10}$/i;
export const monthValues = /^((1[0-2])|[1-9])?$/i;
export const yearValues = /^((19|20)?\d{0,2})$/i;
export const rateThatAllowsFourDecimals =
  /^((?:99|\d{1,2})(?:\.\d{0,4})?|(100\.?))$/i;
export const rateThatAllowsTwoDecimals =
  /^((?:99|\d{1,2})(?:\.\d{0,2})?|(100\.?))$/i;
export const rateThatAllowsOneDecimal =
  /^((?:99|\d{1,2})(?:\.\d{0,1})?|(100\.?))$/i;
export const percentageAllowOneDecimalMax =
  /^((?:99|\d{1,2})(?:\.\d{0,1})?|(100))$/i;
export const integersWithMaxDecimalPlaces = (maxDecimal: number) =>
  new RegExp(`^-?\\d*\\.?\\d{0,${maxDecimal}}$`);
export const positiveNumbersWithMaxDecimalPlaces = (maxDecimal: number) =>
  new RegExp(`^\\d*\\.?\\d{0,${maxDecimal}}$`);

/*
 * Generates a RegEx mask of custom params
 *
 * For the RegExp returned by this call: xNumbersYDecimals(2, 1)
 *   - The greatest possible match for these params would be 100
 *   - The greatest possible match with a decimal would be 99.9
 */
export const xNumbersYDecimals = (
  tenPower: number = 2,
  decimalPlaces: number = 1
) => {
  const greatestNumber = Math.pow(10, tenPower);
  return new RegExp(
    `^((?:${greatestNumber - 1}|\\d{0,${tenPower}})${
      decimalPlaces > 0 ? `(?:\\.\\d{0,${decimalPlaces}})` : ``
    }?|(${greatestNumber}?))$`,
    "i"
  );
};
