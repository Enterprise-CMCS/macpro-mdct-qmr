import {
  getMeasureFromTable,
  putCombinedRatesToTable,
} from "../../storage/table";
import { Measure, MeasureParameters } from "../../types";
import { calculateAndPutRate, getDataSources } from "./rateCalculations";

jest.mock("../../storage/table", () => ({
  getMeasureFromTable: jest.fn(),
  putCombinedRatesToTable: jest.fn(),
}));

jest.mock("../../types", () => ({
  ...jest.requireActual("../../types"),
  isCoreSetAbbr: jest.fn().mockReturnValue(true),
}));

describe("Combined Rate Calculations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should not calculate a combined rate for core sets that are already combined", async () => {
    await calculateAndPutRate({ coreSet: "ACS" } as MeasureParameters);
    await calculateAndPutRate({ coreSet: "CCS" } as MeasureParameters);
    await calculateAndPutRate({ coreSet: "HHCS" } as MeasureParameters);

    expect(getMeasureFromTable).not.toHaveBeenCalled();
  });

  it("Should calculate combined rates for separated child core sets", async () => {
    await calculateAndPutRate({ coreSet: "CCSM" } as MeasureParameters);

    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "CCSM" })
    );
    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "CCSC" })
    );
    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      { coreSet: "CCS" },
      expect.any(Object)
    );
  });

  it("Should calculate combined rates for separated asult core sets", async () => {
    await calculateAndPutRate({ coreSet: "ACSC" } as MeasureParameters);

    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "ACSM" })
    );
    expect(getMeasureFromTable).toHaveBeenCalledWith(
      expect.objectContaining({ coreSet: "ACSC" })
    );
    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      { coreSet: "ACS" },
      expect.any(Object)
    );
  });

  it("Should pull data source information out of a measure", async () => {
    const measure = {
      data: {
        DataSource: ["AdministrativeData"],
        DataSourceSelections: {
          AdminstrativeData0: {
            selections: ["MedicaidManagementInformationSystemMMIS"],
          },
        },
        MeasurementSpecification: "NCQA/HEDIS",
      } as Measure["data"],
    } as Measure;

    const dsPayload = getDataSources(measure);

    expect(dsPayload).toEqual({
      DataSource: ["AdministrativeData"],
      DataSourceSelections: {
        AdminstrativeData0: {
          selections: ["MedicaidManagementInformationSystemMMIS"],
        },
      },
      includesHybrid: false,
      isNotApplicable: false,
    });
  });

  it("Should handle data sources for nonexistent measures", async () => {
    const dsPayload = getDataSources(undefined);

    expect(dsPayload).toEqual({
      DataSource: [],
      DataSourceSelections: {},
      includesHybrid: false,
      isNotApplicable: false,
    });
  });

  it("Should treat Admin & EHR as admin data sources", async () => {
    let dsPayload = getDataSources({
      data: {
        DataSource: ["AdministrativeData"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.includesHybrid).toBe(false);
    expect(dsPayload.isNotApplicable).toBe(false);

    dsPayload = getDataSources({
      data: {
        DataSource: ["ElectronicHealthRecords"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.includesHybrid).toBe(false);
    expect(dsPayload.isNotApplicable).toBe(false);
  });

  it("Should treat Hybrid & CMRR as hybrid data sources", async () => {
    let dsPayload = getDataSources({
      data: {
        DataSource: ["HybridAdministrativeandMedicalRecordsData"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.includesHybrid).toBe(true);
    expect(dsPayload.isNotApplicable).toBe(false);

    dsPayload = getDataSources({
      data: {
        DataSource: ["Casemanagementrecordreview"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.includesHybrid).toBe(true);
    expect(dsPayload.isNotApplicable).toBe(false);
  });

  it("Should treat ECDS and Other data sources as unusable for calculations", async () => {
    let dsPayload = getDataSources({
      data: {
        DataSource: ["ElectronicClinicalDataSystemsECDS"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isNotApplicable).toBe(true);

    dsPayload = getDataSources({
      data: {
        DataSource: ["OtherDataSource"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isNotApplicable).toBe(true);
  });

  it("Should treat measures reported with nonstandard specifications as unusable for calculations", async () => {
    let dsPayload = getDataSources({
      data: {
        DataSource: ["AdministrativeData"],
        MeasurementSpecification: "Other",
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isNotApplicable).toBe(true);
  });

  it("Should use the standard formula to combine admin+admin rates", async () => {
    (getMeasureFromTable as jest.Mock)
      .mockResolvedValueOnce({
        coreSet: "ACSM",
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
      } as Measure)
      .mockResolvedValueOnce({
        coreSet: "ACSC",
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
      } as Measure);

    const parameters = {
      state: "CO",
      year: "2024",
      measure: "ZZZ-AD",
      coreSet: "ACSC",
    };

    await calculateAndPutRate(parameters);

    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      { coreSet: "ACS", measure: "ZZZ-AD", state: "CO", year: "2024" },
      {
        AdditionalValues: [],
        DataSources: {
          Medicaid: {
            DataSource: ["AdministrativeData"],
            DataSourceSelections: {},
            includesHybrid: false,
            isNotApplicable: false,
          },
          CHIP: {
            DataSource: ["AdministrativeData", "ElectronicHealthRecords"],
            DataSourceSelections: {},
            includesHybrid: false,
            isNotApplicable: false,
          },
        },
        Rates: [
          {
            uid: "cat0.qual0",
            label: "mock rate",
            CHIP: { denominator: 5, numerator: 3, rate: 60 },
            Medicaid: { denominator: 10, numerator: 2, rate: 20 },
            Combined: { denominator: 15, numerator: 5, rate: 33.3 },
          },
        ],
      }
    );
  });

  it("Should use special transformations for certain measures", async () => {
    const mockMeasure = {
      data: {
        DataSource: ["AdministrativeData"],
        PerformanceMeasure: {
          rates: {
            cat0: [
              {
                uid: "cat0.qual0",
                numerator: "2",
                denominator: "10",
              },
            ],
          },
        },
      },
    };
    // This measure's numerator/denominator = 0.2
    (getMeasureFromTable as jest.Mock).mockResolvedValue(mockMeasure);

    let combinedRate: number | undefined;
    (putCombinedRatesToTable as jest.Mock).mockImplementation(
      (_params, payload) => {
        combinedRate = payload.Rates[0]?.Combined.rate;
      }
    );

    // AAB-AD is expressed as an inverted percentage
    await calculateAndPutRate({ measure: "AAB-AD", coreSet: "ACSC" } as any);
    expect(combinedRate).toBe(80);

    // AAB-CH is also expressed as an inverted percentage
    await calculateAndPutRate({ measure: "AAB-CH", coreSet: "ACSC" } as any);
    expect(combinedRate).toBe(80);

    // AMB-CH is expressed as "per 1,000"
    await calculateAndPutRate({ measure: "AMB-CH", coreSet: "ACSC" } as any);
    expect(combinedRate).toBe(200);

    // PQI-AD is expressed as "per 100,000"
    await calculateAndPutRate({ measure: "PQI-AD", coreSet: "ACSC" } as any);
    expect(combinedRate).toBe(20000);
  });

  it("Should use a weighted calculation for hybrid+hybrid rates", async () => {
    (getMeasureFromTable as jest.Mock)
      .mockResolvedValueOnce({
        coreSet: "ACSM",
        data: {
          DataSource: ["HybridAdministrativeandMedicalRecordsData"],
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
      } as Measure)
      .mockResolvedValueOnce({
        coreSet: "ACSC",
        data: {
          DataSource: ["Casemanagementrecordreview"],
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
      } as Measure);

    const parameters = {
      state: "CO",
      year: "2024",
      measure: "ZZZ-AD",
      coreSet: "ACSC",
    };

    await calculateAndPutRate(parameters);

    expect(putCombinedRatesToTable).toHaveBeenCalledWith(expect.any(Object), {
      AdditionalValues: [],
      DataSources: expect.any(Object),
      Rates: [
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
            denominator: 15,
            numerator: 5,
            population: 7,
            weightedRate: 31.4,
          },
        },
      ],
    });
  });

  it("Should weight the admin rate by its denominator in hybrid+admin calculations", async () => {
    (getMeasureFromTable as jest.Mock)
      .mockResolvedValueOnce({
        coreSet: "ACSM",
        data: {
          DataSource: ["HybridAdministrativeandMedicalRecordsData"],
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
      } as Measure)
      .mockResolvedValueOnce({
        coreSet: "ACSC",
        data: {
          DataSource: ["ElectronicHealthRecords"],
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
      } as Measure);

    const parameters = {
      state: "CO",
      year: "2024",
      measure: "ZZZ-AD",
      coreSet: "ACSC",
    };

    await calculateAndPutRate(parameters);

    expect(putCombinedRatesToTable).toHaveBeenCalledWith(expect.any(Object), {
      AdditionalValues: [],
      DataSources: expect.any(Object),
      Rates: [
        expect.objectContaining({
          CHIP: expect.objectContaining({ population: 5 }),
        }),
      ],
    });
  });

  it("Should calculate additional values for CPU-AD", async () => {
    (getMeasureFromTable as jest.Mock)
      .mockResolvedValueOnce({
        coreSet: "ACSM",
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
      } as Measure)
      .mockResolvedValueOnce({
        coreSet: "ACSC",
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
      } as Measure);

    const parameters = {
      state: "CO",
      year: "2024",
      measure: "CPU-AD",
      coreSet: "ACSC",
    };

    await calculateAndPutRate(parameters);

    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        AdditionalValues: [
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
        ],
      })
    );
  });

  it("Should calculate additional values for PCR-AD", async () => {
    (getMeasureFromTable as jest.Mock)
      .mockResolvedValueOnce({
        coreSet: "ACSM",
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
      } as Measure)
      .mockResolvedValueOnce({
        coreSet: "ACSC",
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
      } as Measure);

    const parameters = {
      state: "CO",
      year: "2024",
      measure: "PCR-AD",
      coreSet: "ACSC",
    };

    await calculateAndPutRate(parameters);

    expect(putCombinedRatesToTable).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        AdditionalValues: [
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
        ],
      })
    );
  });
});
