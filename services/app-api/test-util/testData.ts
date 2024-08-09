import { DataSource } from "../handlers/rate/types";
import { CoreSetAbbr, MeasureStatus, Program } from "../types";

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

export const pcrData = [
  {
    column: Program.C,
    dataSourceSelections: {},
    dataSource: [DataSource.Administrative],
    rates: {
      zcwVcA: [
        {
          uid: "zcwVcA.Z31BMw",
          label: "Count of Index Hospital Stays",
          value: "3",
        },
        {
          uid: "zcwVcA.KdVD0I",
          label: "Count of Observed 30-Day Readmissions",
          value: "12",
        },
        {
          uid: "zcwVcA.GWePur",
          label: "Observed Readmission Rate",
          value: "400.0000",
        },
        {
          uid: "zcwVcA.ciVWdY",
          label: "Count of Expected 30-Day Readmissions",
          value: "3.1222",
        },
        {
          uid: "zcwVcA.qi3Vd7",
          label: "Expected Readmission Rate",
          value: "104.0733",
        },
        {
          uid: "zcwVcA.SczxqV",
          label:
            "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
          value: "3.8434",
        },
        {
          uid: "zcwVcA.Ei65yg",
          label: "Count of Beneficiaries in Medicaid Population",
          value: "11",
        },
        {
          uid: "zcwVcA.pBILL1",
          label: "Number of Outliers",
          value: "23",
        },
        {
          uid: "zcwVcA.Nfe4Cn",
          label:
            "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
          value: "2090.9",
        },
      ],
    },
  },
  {
    column: Program.M,
    dataSourceSelections: {},
    dataSource: [DataSource.Administrative],
    rates: {
      zcwVcA: [
        {
          uid: "zcwVcA.Z31BMw",
          label: "Count of Index Hospital Stays",
          value: "12",
        },
        {
          uid: "zcwVcA.KdVD0I",
          label: "Count of Observed 30-Day Readmissions",
          value: "1",
        },
        {
          uid: "zcwVcA.GWePur",
          label: "Observed Readmission Rate",
          value: "8.3333",
        },
        {
          uid: "zcwVcA.ciVWdY",
          label: "Count of Expected 30-Day Readmissions",
          value: "1.2222",
        },
        {
          uid: "zcwVcA.qi3Vd7",
          label: "Expected Readmission Rate",
          value: "10.1850",
        },
        {
          uid: "zcwVcA.SczxqV",
          label:
            "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
          value: "0.8182",
        },
        {
          uid: "zcwVcA.Ei65yg",
          label: "Count of Beneficiaries in Medicaid Population",
          value: "21",
        },
        {
          uid: "zcwVcA.pBILL1",
          label: "Number of Outliers",
          value: "2",
        },
        {
          uid: "zcwVcA.Nfe4Cn",
          label:
            "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
          value: "95.2",
        },
      ],
    },
  },
];
