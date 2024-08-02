import { testData } from "../../../test-util/testData";
import { formatMeasureData } from "../shared/calculateAndPutRate";
import { AdminstrativeCalculation } from "./adminstrativeCalculation";
import { DataSource } from "./types";

describe("Test administrative calculation class", () => {
  it("Test default rate calculation", () => {
    const adminCalc = new AdminstrativeCalculation("BCS-AD");
    const combinedRates = adminCalc.calculate(formatMeasureData(testData));
    expect(combinedRates.rates[0].numerator).toBe("6");
    expect(combinedRates.rates[0].denominator).toBe("8");
    expect(combinedRates.rates[0].rate).toBe("75.0");
  });
  it("Test rate calculation if measure is AMB", () => {
    const adminCalc = new AdminstrativeCalculation("AMB-AD");
    const combinedRates = adminCalc.calculate(formatMeasureData(testData));
    expect(combinedRates.rates[0].numerator).toBe("6");
    expect(combinedRates.rates[0].denominator).toBe("8");
    expect(combinedRates.rates[0].rate).toBe("750.0");
  });
  it("Test rate calculation if measure is PQI", () => {
    const adminCalc = new AdminstrativeCalculation("PQI01-AD");
    const combinedRates = adminCalc.calculate(formatMeasureData(testData));
    expect(combinedRates.rates[0].numerator).toBe("6");
    expect(combinedRates.rates[0].denominator).toBe("8");
    expect(combinedRates.rates[0].rate).toBe("75000.0");
  });
  it("Test rate calculation if measure is AAB", () => {
    const adminCalc = new AdminstrativeCalculation("AAB-AD");
    const combinedRates = adminCalc.calculate(formatMeasureData(testData));
    expect(combinedRates.rates[0].numerator).toBe("6");
    expect(combinedRates.rates[0].denominator).toBe("8");
    expect(combinedRates.rates[0].rate).toBe("25.0");
  });
  it("Return true if data source is administrative/EHR & not hybrid", () => {
    const adminCalc = new AdminstrativeCalculation("AAB-AD");
    const check = adminCalc.check(formatMeasureData(testData));
    expect(check).toBe(true);
  });
  it("Return false if data source has a hybrid", () => {
    const adminCalc = new AdminstrativeCalculation("AAB-AD");
    testData[0].data?.DataSource!.push(DataSource.Hybrid);
    const check = adminCalc.check(formatMeasureData(testData));
    expect(check).toBe(false);
  });
});
