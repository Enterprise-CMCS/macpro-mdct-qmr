import { CombinedRatesPayload, Measure } from "../../types";
import { calculateAdditionalValues } from "./rateValueCalculations";

describe("Additional Value calculations for Combined Rates", () => {
  it("Should calculate additional values for CPU-AD", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            HLXNLW: [
              {
                uid: "HLXNLW.7dC1vt",
                label: "Unreachable",
                value: "2",
              },
              {
                uid: "HLXNLW.6zIwnx",
                label: "Refusal",
                value: "8",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            HLXNLW: [
              {
                uid: "HLXNLW.7dC1vt",
                label: "Unreachable",
                value: "4",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const result = calculateAdditionalValues(
      "CPU-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );

    expect(result).toEqual([
      {
        uid: "HLXNLW.7dC1vt",
        label: "Unreachable",
        Medicaid: 2,
        CHIP: 4,
        Combined: 6,
      },
      {
        uid: "HLXNLW.6zIwnx",
        label: "Refusal",
        Medicaid: 8,
        Combined: 8,
      },
    ]);
  });

  it("Should copy the values of one CPU-AD measure, if the other is unusable", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];
    const measure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            HLXNLW: [
              {
                uid: "HLXNLW.7dC1vt",
                label: "Unreachable",
                value: "4",
              },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    dataSources.CHIP.isUnusableForCalc = true;
    let result = calculateAdditionalValues(
      "CPU-AD",
      dataSources,
      measure,
      undefined,
    );
    expect(result[0].Combined).toBe(4); // Copied from Medicaid
    
    dataSources.CHIP.isUnusableForCalc = false;
    dataSources.Medicaid.isUnusableForCalc = true;
    result = calculateAdditionalValues(
      "CPU-AD",
      dataSources,
      undefined,
      measure,
    );
    expect(result[0].Combined).toBe(4); // Copied from CHIP
  });

  it("Should calculate additional values for PCR-AD", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];

    const medicaidMeasure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            zcwVcA: [
              { uid: "zcwVcA.Z31BMw", value: "10", label: "stay count" },
              { uid: "zcwVcA.KdVD0I", value: "1", label: "observed reads" },
              { uid: "zcwVcA.GWePur", value: "10", label: "observed rate" },
              { uid: "zcwVcA.ciVWdY", value: "2", label: "expected reads" },
              { uid: "zcwVcA.qi3Vd7", value: "20", label: "expected rate" },
              { uid: "zcwVcA.SczxqV", value: "0.5000", label: "O/E ratio" },
              { uid: "zcwVcA.Ei65yg", value: "20", label: "beneficiaries" },
              { uid: "zcwVcA.pBILL1", value: "3", label: "outliers" },
              { uid: "zcwVcA.Nfe4Cn", value: "150", label: "outlier rate" },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const chipMeasure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            zcwVcA: [
              { uid: "zcwVcA.Z31BMw", value: "5", label: "stay count" },
              { uid: "zcwVcA.KdVD0I", value: "2", label: "observed reads" },
              { uid: "zcwVcA.GWePur", value: "40", label: "observed rate" },
              { uid: "zcwVcA.ciVWdY", value: "1", label: "expected reads" },
              { uid: "zcwVcA.qi3Vd7", value: "20", label: "expected rate" },
              { uid: "zcwVcA.SczxqV", value: "4.0000", label: "O/E ratio" },
              { uid: "zcwVcA.Ei65yg", value: "10", label: "beneficiaries" },
              { uid: "zcwVcA.pBILL1", value: "3", label: "outliers" },
              { uid: "zcwVcA.Nfe4Cn", value: "300", label: "outlier rate" },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    const result = calculateAdditionalValues(
      "PCR-AD",
      dataSources,
      medicaidMeasure,
      chipMeasure
    );

    expect(result).toEqual([
      expect.objectContaining({
        label: "stay count",
        Medicaid: 10,
        CHIP: 5,
        Combined: 15,
      }),
      expect.objectContaining({
        label: "observed reads",
        Medicaid: 1,
        CHIP: 2,
        Combined: 3,
      }),
      expect.objectContaining({
        label: "observed rate",
        Medicaid: 10,
        CHIP: 40,
        Combined: 20,
      }),
      expect.objectContaining({
        label: "expected reads",
        Medicaid: 2,
        CHIP: 1,
        Combined: 3,
      }),
      expect.objectContaining({
        label: "expected rate",
        Medicaid: 20,
        CHIP: 20,
        Combined: 20,
      }),
      expect.objectContaining({
        label: "O/E ratio",
        Medicaid: 0.5,
        CHIP: 4,
        Combined: 1,
      }),
      expect.objectContaining({
        label: "beneficiaries",
        Medicaid: 20,
        CHIP: 10,
        Combined: 30,
      }),
      expect.objectContaining({
        label: "outliers",
        Medicaid: 3,
        CHIP: 3,
        Combined: 6,
      }),
      expect.objectContaining({
        label: "outlier rate",
        Medicaid: 150,
        CHIP: 300,
        Combined: 200,
      }),
    ]);
  });

  it("Should copy the values of one PCR-AD measure, if the other is unusable", () => {
    const dataSources = {
      Medicaid: {},
      CHIP: {},
    } as CombinedRatesPayload["DataSources"];
    const measure = {
      data: {
        DataSource: ["ElectronicHealthRecords"],
        PerformanceMeasure: {
          rates: {
            HLXNLW: [
              { uid: "zcwVcA.Z31BMw", value: "5", label: "stay count" },
            ],
          },
        },
      } as Measure["data"],
    } as Measure;

    dataSources.CHIP.isUnusableForCalc = true;
    let result = calculateAdditionalValues(
      "PCR-AD",
      dataSources,
      measure,
      undefined,
    );
    expect(result[0].Combined).toBe(5); // Copied from Medicaid
    
    dataSources.CHIP.isUnusableForCalc = false;
    dataSources.Medicaid.isUnusableForCalc = true;
    result = calculateAdditionalValues(
      "PCR-AD",
      dataSources,
      undefined,
      measure,
    );
    expect(result[0].Combined).toBe(5); // Copied from CHIP
  });
});
