//this function is copied from in ui-src/utils/rateFormulas/index.ts, we should merge this into a shared file if we ever figure it out
export const fixRounding = (value: number, numbersAfterDecimal: number) => {
  return (
    Math.round((value + Number.EPSILON) * Math.pow(10, numbersAfterDecimal)) /
    Math.pow(10, numbersAfterDecimal)
  );
};

/**
 * Parse the given string as a number.
 *
 * Returns `undefined` for empty or undefined strings.
 */
export const parseQmrNumber = (str: string | undefined) => {
  if (str === undefined) return undefined;
  if (str === "") return undefined;
  return Number(str);
};

// The following `*safely()` functions can work with missing data:
// If you perform a series of calculations safely,
// if numbers are missing along the way,
// the result will become undefined.
// This is preferable to defaulting to zero (which is a real number),
// and to letting the result become NaN, Infinity, or whatever else.

/**
 * Add the two numbers.
 *
 * If one is undefined, it is treated as zero.
 *
 * If both are undefined, the sum is undefined.
 */
export const addSafely = (x: number | undefined, y: number | undefined) => {
  if (x === undefined && y === undefined) return undefined;
  if (x === undefined) return y;
  if (y === undefined) return x;
  return x + y;
};

/**
 * Divide the first number by the second.
 *
 * If either number is undefined, the result is undefined.
 *
 * If the result would be `NaN` or `Infinity`, the result is undefined instead.
 */
export const divideSafely = (x: number | undefined, y: number | undefined) => {
  if (x === undefined || y === undefined) return undefined;
  if (y === 0) return undefined;
  return x / y;
};

/**
 * Multiply the two numbers.
 *
 * If either number is undefined, the product is undefined.
 */
export const multiplySafely = (
  x: number | undefined,
  y: number | undefined
) => {
  if (x === undefined || y === undefined) return undefined;
  return x * y;
};

/**
 * Round the number to the given number of decimal places.
 *
 * If the number is undefined, the result is undefined.
 */
export const roundSafely = (
  x: number | undefined,
  numbersAfterDecimal: number
) => {
  if (x === undefined) return undefined;
  return fixRounding(x, numbersAfterDecimal);
};
