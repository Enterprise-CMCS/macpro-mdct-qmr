import { decimalMask } from './masks'

describe("Test Decimal Mask Function", () => {
    test("Check that decimal mask returns same value if it follows the rules", () => {
      expect(decimalMask('1234.567')).toBe('1234.567');
    })
    test("Test that the decimal gets cut off", () => {
        expect(decimalMask('1234.567899')).toBe('1234.56789');
    })
    test("Test that the function fails if a non number is passed in", () => {
        expect(decimalMask('abcd')).toBe('NaN');
    })
});
