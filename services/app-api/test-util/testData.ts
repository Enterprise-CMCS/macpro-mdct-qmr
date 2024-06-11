import { DataSource } from "../handlers/rate/calculations/types";

export const testData = [
  {
    createdAt: 1718052652781,
    compoundKey: "MA2024ACSCAMM-AD",
    measure: "AMM-AD",
    data: {
      DataSourceSelections: [],
      PerformanceMeasure: {
        rates: {
          DFukSh: [
            {
              uid: "DFukSh.g91VU9",
              label: "Ages 18 to 64",
              category: "Effective Acute Phase Treatment",
              rate: "50.0",
              numerator: "1",
              denominator: "2",
            },
          ],
        },
      },
      MeasurementSpecification: "NCQA/HEDIS",
      DataSource: [DataSource.Administrative, DataSource.EHR],
    },
    year: 2024,
    lastAltered: 1718052665862,
    coreSet: "ACSC",
    state: "MA",
    lastAlteredBy: "Sammy States",
    reporting: null,
    status: "incomplete",
  },
  {
    createdAt: 1718052653044,
    compoundKey: "MA2024ACSMAMM-AD",
    measure: "AMM-AD",
    data: {
      DataSourceSelections: [],
      PerformanceMeasure: {
        rates: {
          DFukSh: [
            {
              uid: "DFukSh.g91VU9",
              label: "Ages 18 to 64",
              category: "Effective Acute Phase Treatment",
              rate: "83.3",
              numerator: "5",
              denominator: "6",
            },
          ],
        },
      },
      MeasurementSpecification: "NCQA/HEDIS",
      DataSource: [DataSource.EHR],
    },
    year: 2024,
    lastAltered: 1718052680450,
    coreSet: "ACSM",
    state: "MA",
    lastAlteredBy: "Sammy States",
    reporting: null,
    status: "incomplete",
  },
];
