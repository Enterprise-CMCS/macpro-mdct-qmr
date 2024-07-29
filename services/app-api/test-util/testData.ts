import { DataSource } from "../handlers/rate/calculations/types";
import { CoreSetAbbr, Measure, MeasureStatus } from "../types";

export const testData = [
  {
    createdAt: 1718052652781,
    compoundKey: "MA2024ACSCAMM-AD",
    measure: "AMM-AD",
    data: {
      DataSource: [DataSource.Administrative],
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
    },
    year: 2024,
    lastAltered: 1718052665862,
    coreSet: CoreSetAbbr.ACSC,
    state: "MA",
    lastAlteredBy: "Sammy States",
    status: MeasureStatus.INCOMPLETE,
  },
  {
    createdAt: 1718052653044,
    compoundKey: "MA2024ACSMAMM-AD",
    measure: "AMM-AD",
    data: {
      DataSource: [DataSource.Administrative, DataSource.EHR],
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
    },
    year: 2024,
    lastAltered: 1718052680450,
    coreSet: CoreSetAbbr.ACSM,
    state: "MA",
    lastAlteredBy: "Sammy States",
    status: MeasureStatus.INCOMPLETE,
  },
];
