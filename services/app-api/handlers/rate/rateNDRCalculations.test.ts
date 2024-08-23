import { CombinedRatesPayload, Measure } from "../../types";
import { combineRates } from "./rateNDRCalculations";


describe("NDR calculations for Combined Rates", () => {
  it("Should use the standard formula to combine admin+admin rates", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "2",
                denominator: "10",
                rate: "20",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "3",
                denominator: "5",
                rate: "60",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const result = combineRates(
      "ZZZ-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );

    expect(result).toEqual([
      {
        uid: "cat0.qual0",
        label: "mock rate",
        CHIP: { denominator: 5, numerator: 3, rate: 60 },
        Medicaid: { denominator: 10, numerator: 2, rate: 20 },
        Combined: { denominator: 15, numerator: 5, rate: 33.3 },
      },
    ]);
  });

  it("Should use special transformations for certain measures", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        DataSource: ["AdministrativeData"],
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "2",
                denominator: "10",
                rate: "20",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        DataSource: ["AdministrativeData", "ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "3",
                denominator: "5",
                rate: "60",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    // Most measures: percentage
    let result = combineRates(
      "ZZZ-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );
    expect(result[0].Combined.rate).toBe(33.3);

    // AAB-AD: inverted percentage
    result = combineRates("AAB-AD", dataSources, medicaidMeasure, chipMeasure);
    expect(result[0].Combined.rate).toBe(66.7);

    // AAB-CH: inverted percentage
    result = combineRates("AAB-CH", dataSources, medicaidMeasure, chipMeasure);
    expect(result[0].Combined.rate).toBe(66.7);

    // AMB-CH: per thousand
    result = combineRates("AMB-CH", dataSources, medicaidMeasure, chipMeasure);
    expect(result[0].Combined.rate).toBe(333.3);

    // PQI-AD: per hundred thousand
    result = combineRates("PQI-AD", dataSources, medicaidMeasure, chipMeasure);
    expect(result[0].Combined.rate).toBe(33333.3);
  });

  it("Should use a weighted calculation for hybrid+hybrid rates", () => {
    const dataSources = {
      Medicaid: { requiresWeightedCalc: true },
      CHIP: { requiresWeightedCalc: true },
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        HybridMeasurePopulationIncluded: "5",
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "2",
                denominator: "10",
                rate: "20",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        HybridMeasurePopulationIncluded: "2",
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "3",
                denominator: "5",
                rate: "60",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const result = combineRates(
      "ZZZ-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );

    expect(result).toEqual([
      {
        uid: "cat0.qual0",
        label: "mock rate",
        CHIP: {
          denominator: 5,
          numerator: 3,
          rate: 60,
          population: 2,
          weightedRate: 17.1,
        },
        Medicaid: {
          denominator: 10,
          numerator: 2,
          rate: 20,
          population: 5,
          weightedRate: 14.3,
        },
        Combined: {
          population: 7,
          weightedRate: 31.4,
        },
      },
    ]);
  });

  it("Should weight the admin rate by its denominator in hybrid+admin calculations", () => {
    const dataSources = {
      Medicaid: { requiresWeightedCalc: true },
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        HybridMeasurePopulationIncluded: "5",
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "2",
                denominator: "10",
                rate: "20",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                label: "mock rate",
                numerator: "3",
                denominator: "5",
                rate: "60",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const result = combineRates(
      "ZZZ-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );

    expect(result[0].CHIP.population).toBe(5);
    expect(result[0].Combined.weightedRate).toBe(40);
  });
});
