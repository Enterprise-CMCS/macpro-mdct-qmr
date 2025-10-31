import {
  yearValues,
  allNumbers,
  monthValues,
  allIntegers,
  allPositiveIntegers,
  integersWithMaxDecimalPlaces,
  positiveNumbersWithMaxDecimalPlaces,
  xNumbersYDecimals,
} from ".";

describe("Testing new regex defaults", () => {
  test("Testing custom generated RegEx: xNumbersYDecimals", () => {
    const testCases = [
      /*
       * [firstParam, secondParam, testString, expectedResult]
       * Base case: 10^2, 1 decimal place
       */
      [undefined, undefined, "", true],
      [undefined, undefined, "100", true], // max number
      [undefined, undefined, "99.9", true], // max decimal
      [undefined, undefined, ".1", true],
      [undefined, undefined, "123", false],
      [undefined, undefined, "1234", false],
      [undefined, undefined, "123.1", false],
      [undefined, undefined, "99.99", false],
      [undefined, undefined, ".12", false],
      [undefined, undefined, "1.12", false],
      [undefined, undefined, "1234.1", false],

      // 10^5, 5 decimals
      [5, 5, "", true],
      [5, 5, "100000", true],
      [5, 5, "12345.12345", true],
      [5, 5, ".99999", true],
      [5, 5, ".123456", false],
      [5, 5, "1.123456", false],
      [5, 5, "123456", false],
      [5, 5, "123456.1", false],
      [5, 5, "123456.123456", false],
    ];
    testCases.forEach((t: any) => {
      expect(xNumbersYDecimals(t[0], t[1]).test(t[2])).toBe(t[3]);
    });
  });

  test("Testing allIntegers regex", () => {
    expect(allIntegers.test("0")).toBeTruthy();
    expect(allIntegers.test("1999")).toBeTruthy();
    expect(allIntegers.test("1234523452345")).toBeTruthy();
    expect(allIntegers.test("234234234234")).toBeTruthy();

    expect(allIntegers.test("-0")).toBeTruthy();
    expect(allIntegers.test("-34")).toBeTruthy();
    expect(allIntegers.test("-234234234234")).toBeTruthy();

    expect(allIntegers.test("0.222")).toBeFalsy();
    expect(allIntegers.test("0.2354234")).toBeFalsy();
    expect(allIntegers.test("-0.2333333333")).toBeFalsy();
    expect(allIntegers.test("-0.212")).toBeFalsy();
  });

  test("Testing allNumbers regex", () => {
    expect(allNumbers.test("0")).toBeTruthy();
    expect(allNumbers.test("1999")).toBeTruthy();
    expect(allNumbers.test("234234234234")).toBeTruthy();
    expect(allNumbers.test("1234523452345")).toBeTruthy();

    expect(allNumbers.test("-0")).toBeTruthy();
    expect(allNumbers.test("-34")).toBeTruthy();
    expect(allNumbers.test("-234234234234")).toBeTruthy();

    expect(allNumbers.test("0.222")).toBeTruthy();
    expect(allNumbers.test("0.2354234")).toBeTruthy();
    expect(allNumbers.test("-0.212")).toBeTruthy();
    expect(allNumbers.test("-0.2333333333")).toBeTruthy();
  });

  test("Testing allPositiveIntegers", () => {
    expect(allPositiveIntegers.test("0")).toBeTruthy();
    expect(allPositiveIntegers.test("1999")).toBeTruthy();
    expect(allPositiveIntegers.test("234234234234")).toBeTruthy();
    expect(allPositiveIntegers.test("1234523452345")).toBeTruthy();

    expect(allPositiveIntegers.test("-0")).toBeFalsy();
    expect(allPositiveIntegers.test("-34")).toBeFalsy();
    expect(allPositiveIntegers.test("-234234234234")).toBeFalsy();

    expect(allPositiveIntegers.test("0.222")).toBeFalsy();
    expect(allPositiveIntegers.test("0.2354234")).toBeFalsy();
    expect(allPositiveIntegers.test("-0.212")).toBeFalsy();
    expect(allPositiveIntegers.test("-0.2333333333")).toBeFalsy();
  });

  test("Testing monthValues", () => {
    expect(monthValues.test("1")).toBeTruthy();
    expect(monthValues.test("8")).toBeTruthy();
    expect(monthValues.test("10")).toBeTruthy();
    expect(monthValues.test("12")).toBeTruthy();

    expect(monthValues.test("0")).toBeFalsy();
    expect(monthValues.test("13")).toBeFalsy();
    expect(monthValues.test("-1")).toBeFalsy();
    expect(monthValues.test("-10")).toBeFalsy();
  });

  test("Testing yearValues", () => {
    expect(yearValues.test("1996")).toBeTruthy();
    expect(yearValues.test("1999")).toBeTruthy();
    expect(yearValues.test("2007")).toBeTruthy();
    expect(yearValues.test("2020")).toBeTruthy();
    expect(yearValues.test("2021")).toBeTruthy();

    expect(yearValues.test("100")).toBeFalsy();
    expect(yearValues.test("3000")).toBeFalsy();
    expect(yearValues.test("-1")).toBeFalsy();
    expect(yearValues.test("-2021")).toBeFalsy();
  });

  test("Testing integersWithMaxDecimalPlaces", () => {
    const maxDecimals = 3;
    expect(integersWithMaxDecimalPlaces(maxDecimals).test("0")).toBeTruthy();
    expect(integersWithMaxDecimalPlaces(maxDecimals).test("1999")).toBeTruthy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("234234234234")
    ).toBeTruthy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("1234523452345")
    ).toBeTruthy();

    expect(integersWithMaxDecimalPlaces(maxDecimals).test("-0")).toBeTruthy();
    expect(integersWithMaxDecimalPlaces(maxDecimals).test("-34")).toBeTruthy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("-234234234234")
    ).toBeTruthy();

    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("0.222")
    ).toBeTruthy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("0.2354234")
    ).toBeFalsy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("-0.212")
    ).toBeTruthy();
    expect(
      integersWithMaxDecimalPlaces(maxDecimals).test("-0.2333333333")
    ).toBeFalsy();
  });

  test("Testing positiveNumbersWithMaxDecimalPlaces", () => {
    const maxDecimals = 3;
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("0")
    ).toBeTruthy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("1999")
    ).toBeTruthy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("234234234234")
    ).toBeTruthy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("1234523452345")
    ).toBeTruthy();

    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("-0")
    ).toBeFalsy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("-34")
    ).toBeFalsy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("-234234234234")
    ).toBeFalsy();

    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("0.222")
    ).toBeTruthy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("0.2354234")
    ).toBeFalsy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("-0.212")
    ).toBeFalsy();
    expect(
      positiveNumbersWithMaxDecimalPlaces(maxDecimals).test("-0.2333333333")
    ).toBeFalsy();
  });
});
