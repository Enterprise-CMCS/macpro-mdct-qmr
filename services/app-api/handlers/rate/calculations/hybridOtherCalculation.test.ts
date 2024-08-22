import { testData } from "../../../test-util/testData";
import { formatMeasureData } from "../shared/calculateAndPutRate";
import { HybridOtherCalculation } from "./hybridOtherCalculation";
import { DataSource } from "./types";

const hybridData = [
  {
    DataSource: [DataSource.Administrative],
    DataSourceSelections: [],
    PerformanceMeasure: {
      rates: {
        DFukSh: [
          {
            uid: "DFukSh.g91VU9",
            label: "Ages 18 to 64",
            category: "Effective Acute Phase Treatment",
            rate: "60.1",
            numerator: "247",
            denominator: "411",
          },
        ],
      },
    },
    HybridMeasurePopulationIncluded: "10000",
  },
  {
    DataSource: [DataSource.Administrative, DataSource.Hybrid, DataSource.EHR],
    DataSourceSelections: [],
    PerformanceMeasure: {
      rates: {
        DFukSh: [
          {
            uid: "DFukSh.g91VU9",
            label: "Ages 18 to 64",
            category: "Effective Acute Phase Treatment",
            rate: "80.0",
            numerator: "329",
            denominator: "411",
          },
        ],
      },
    },
    HybridMeasurePopulationIncluded: "25000",
  },
];

describe("Test hybrid calculation class", () => {
  it("With no matching data source & no MEP", () => {
    const hybridCalc = new HybridOtherCalculation("IMA-CH");
    testData.map((item) => {
      item.data.DataSource = [];
    });

    const combinedRates = hybridCalc.calculate(formatMeasureData(testData));
    expect(hybridCalc.check(formatMeasureData(testData))).toBe(false);

    expect(combinedRates.rates[0]).not.toHaveProperty("rate");
    expect(combinedRates.rates[0]).not.toHaveProperty("numerator");
    expect(combinedRates.rates[0]).not.toHaveProperty("denominator");
    expect(combinedRates.rates[0]["weighted rate"]).toBe("");
  });

  //order matters when running these test
  describe("With hybrid data source", () => {
    it("With both hybrid data source and MEP filled", () => {
      testData.map((item, idx) => {
        item.data = hybridData[idx];
      });
      const hybridCalc = new HybridOtherCalculation("IMA-CH");
      expect(hybridCalc.check(formatMeasureData(testData))).toBe(true);
      const combinedRates = hybridCalc.calculate(formatMeasureData(testData));
      expect(combinedRates.rates[0]).not.toHaveProperty("rate");
      expect(combinedRates.rates[0]).not.toHaveProperty("numerator");
      expect(combinedRates.rates[0]).not.toHaveProperty("denominator");
      expect(combinedRates.rates[0]["weighted rate"]).toBe("74.3");
    });

    it("With both hybrid data source and one MEP filled", () => {
      hybridData[1].HybridMeasurePopulationIncluded = "";
      const hybridCalc = new HybridOtherCalculation("IMA-CH");
      expect(hybridCalc.check(formatMeasureData(testData))).toBe(true);
      const combinedRates = hybridCalc.calculate(formatMeasureData(testData));
      expect(combinedRates.rates[0]).not.toHaveProperty("rate");
      expect(combinedRates.rates[0]).not.toHaveProperty("numerator");
      expect(combinedRates.rates[0]).not.toHaveProperty("denominator");
      expect(combinedRates.rates[0]["weighted rate"]).toBe("");
    });

    it("With one hybrid data source and one MEP filled", () => {
      //remove the second array so that there is only 1 measure to be checked
      testData.pop();

      //set the test data to a hybrid measure
      testData[0].data = hybridData[0];
      const hybridCalc = new HybridOtherCalculation("IMA-CH");
      expect(hybridCalc.check(formatMeasureData(testData))).toBe(true);
      const combinedRates = hybridCalc.calculate(formatMeasureData(testData));
      expect(combinedRates.rates[0].numerator).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].numerator
      );
      expect(combinedRates.rates[0].denominator).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].denominator
      );
      expect(combinedRates.rates[0].rate).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].rate
      );
      expect(combinedRates.rates[0]["weighted rate"]).toBe("60.1");
    });

    it("With one hybrid data source and no MEP filled", () => {
      //clear out the mep data
      hybridData[0].HybridMeasurePopulationIncluded = "";
      //set the test data to a hybrid measure
      testData[0].data = hybridData[0];

      const hybridCalc = new HybridOtherCalculation("IMA-CH");
      expect(hybridCalc.check(formatMeasureData(testData))).toBe(true);
      const combinedRates = hybridCalc.calculate(formatMeasureData(testData));
      expect(combinedRates.rates[0].numerator).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].numerator
      );
      expect(combinedRates.rates[0].denominator).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].denominator
      );
      expect(combinedRates.rates[0].rate).toBe(
        hybridData[0].PerformanceMeasure.rates.DFukSh[0].rate
      );
      expect(combinedRates.rates[0]["weighted rate"]).toBe("");
    });
  });
});
