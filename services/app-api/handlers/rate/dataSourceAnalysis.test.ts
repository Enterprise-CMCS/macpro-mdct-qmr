import { Measure } from "../../types";
import { collectDataSourcesForMeasure } from "./dataSourceAnalysis";

describe("Data source analysis for Combined Rates", () => {
  it("Should pull data source information out of a measure", () => {
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

    const dsPayload = collectDataSourcesForMeasure(measure);

    expect(dsPayload).toEqual({
      DataSource: ["AdministrativeData"],
      DataSourceSelections: {
        AdminstrativeData0: {
          selections: ["MedicaidManagementInformationSystemMMIS"],
        },
      },
      requiresWeightedCalc: false,
      isUnusableForCalc: false,
    });
  });

  it("Should handle data sources for nonexistent measures", () => {
    const dsPayload = collectDataSourcesForMeasure(undefined);

    expect(dsPayload).toEqual({
      DataSource: [],
      DataSourceSelections: {},
      requiresWeightedCalc: false,
      isUnusableForCalc: false,
    });
  });

  it("Should treat Admin & EHR as admin data sources", () => {
    let dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["AdministrativeData"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.requiresWeightedCalc).toBe(false);
    expect(dsPayload.isUnusableForCalc).toBe(false);

    dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["ElectronicHealthRecords"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.requiresWeightedCalc).toBe(false);
    expect(dsPayload.isUnusableForCalc).toBe(false);
  });

  it("Should treat Hybrid & CMRR as hybrid data sources", () => {
    let dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["HybridAdministrativeandMedicalRecordsData"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.requiresWeightedCalc).toBe(true);
    expect(dsPayload.isUnusableForCalc).toBe(false);

    dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["Casemanagementrecordreview"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.requiresWeightedCalc).toBe(true);
    expect(dsPayload.isUnusableForCalc).toBe(false);
  });

  it("Should treat ECDS and Other data sources as unusable for calculations", () => {
    let dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["ElectronicClinicalDataSystemsECDS"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isUnusableForCalc).toBe(true);

    dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["OtherDataSource"],
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isUnusableForCalc).toBe(true);
  });

  it("Should treat measures reported with nonstandard specifications as unusable for calculations", () => {
    let dsPayload = collectDataSourcesForMeasure({
      data: {
        DataSource: ["AdministrativeData"],
        MeasurementSpecification: "Other",
      } as Measure["data"],
    } as Measure);
    expect(dsPayload.isUnusableForCalc).toBe(true);
  });
});
