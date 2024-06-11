import { testData } from "../../../test-util/testData";
import { formatMeasureData } from "../shared/calculateAndPutRate";
import { AdminstrativeCalculation } from "./adminstrativeCalculation";
import { DataSource } from "./types";

describe("Test administrative calculation class", () => {
  it("Test default rate calculation", () => {
    const adminCalc = new AdminstrativeCalculation();
    const combinedRates = adminCalc.calculate(
      "BCS-AD",
      formatMeasureData(testData).map((data: any) => data.rates)
    );
    expect(combinedRates.rates[0].numerator).toBe(6);
    expect(combinedRates.rates[0].denominator).toBe(8);
    expect(combinedRates.rates[0].rate).toBe("75.0");
  });
  it("Test rate calculation if measure is AMB", () => {
    const adminCalc = new AdminstrativeCalculation();
    const combinedRates = adminCalc.calculate(
      "AMB-AD",
      formatMeasureData(testData).map((data: any) => data.rates)
    );
    expect(combinedRates.rates[0].numerator).toBe(6);
    expect(combinedRates.rates[0].denominator).toBe(8);
    expect(combinedRates.rates[0].rate).toBe("750.0");
  });
  it("Test rate calculation if measure is PQI", () => {
    const adminCalc = new AdminstrativeCalculation();
    const combinedRates = adminCalc.calculate(
      "PQI01-AD",
      formatMeasureData(testData).map((data: any) => data.rates)
    );
    expect(combinedRates.rates[0].numerator).toBe(6);
    expect(combinedRates.rates[0].denominator).toBe(8);
    expect(combinedRates.rates[0].rate).toBe("75000.0");
  });
  it("Test rate calculation if measure is AAB", () => {
    const adminCalc = new AdminstrativeCalculation();
    const combinedRates = adminCalc.calculate(
      "AAB-AD",
      formatMeasureData(testData).map((data: any) => data.rates)
    );
    expect(combinedRates.rates[0].numerator).toBe(6);
    expect(combinedRates.rates[0].denominator).toBe(8);
    expect(combinedRates.rates[0].rate).toBe("25.0");
  });
  it("Return true if data source is administrative/EHR & not hybrid", () => {
    const adminCalc = new AdminstrativeCalculation();
    const check = adminCalc.check(formatMeasureData(testData));
    expect(check).toBe(true);
  });
  it("Return false if data source has a hybrid", () => {
    const adminCalc = new AdminstrativeCalculation();
    testData[0].data.DataSource.push(DataSource.Hybrid);
    const check = adminCalc.check(formatMeasureData(testData));
    expect(check).toBe(false);
  });
});
