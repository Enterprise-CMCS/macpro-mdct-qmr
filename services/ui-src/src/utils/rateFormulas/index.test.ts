import { AABRateCalculation, defaultRateCalculation } from "./index";

describe("Testing Rate Calculation Formulas", () => {
  describe("Testing defaultRateCalculation", () => {
    it("should calculate basic rates to three decimals", () => {
      const result = defaultRateCalculation("1", "2", 100, 3);
      expect(result).toBe("50.000");
    });
  });

  describe("Testing AABRateCalculation", () => {
    it("should return calculated rate as a decimal from 1", () => {
      const result = AABRateCalculation("2", "3", 100, 3);
      expect(result).toBe("33.333");
    });
  });
});
