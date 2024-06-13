export type Program = "CHIP" | "Medicaid";
export type DataSource = "AdministrativeData" | "ElectronicHealthRecords" | "HybridAdministrativeandMedicalRecordsData";
export type CategoryId = string;
export type QualifierId = string;

export type RateDataShape = {
  uid: `${CategoryId}.${QualifierId}`;
  label: string;
  category?: string;
  numerator?: string;
  denominator?: string;
  rate?: string;
}

export type RateCategoryMap = {
  [key: CategoryId]: RateDataShape[];
}

export type SeparatedData = {
  column: Program;
  dataSource: DataSource[];
  rates: RateCategoryMap;
};

export type CombinedData = {
  column: "Combined Rate";
  rates: RateDataShape[];
}

export type CombinedRatePayload = {
  compoundKey: string;
  measure: string;
  state: string;
  year: string;
  lastAltered: number;
  data: (SeparatedData | CombinedData)[];
}

export const json: CombinedRatePayload = {
  "compoundKey": "MA2024ACSAMM-AD",
  "measure": "AMM-AD",
  "state": "MA",
  "data": [
    {
      "column": "CHIP",
      "dataSource": ["AdministrativeData"],
      "rates": {
        "JjQeAC": [
          {
            "uid": "JjQeAC.g91VU9",
            "label": "Ages 18 to 64",
            "category": "Effective Continuation Phase Treatment",
            "rate": "80.0",
            "numerator": "4",
            "denominator": "5"
          },
          {
            "uid": "JjQeAC.Gjknmo",
            "label": "Age 65 and older",
            "category": "Effective Continuation Phase Treatment",
            "rate": "40.0",
            "numerator": "2",
            "denominator": "5"
          }
        ],
        "DFukSh": [
          {
            "uid": "DFukSh.g91VU9",
            "label": "Ages 18 to 64",
            "category": "Effective Acute Phase Treatment",
            "rate": "50.0",
            "numerator": "2",
            "denominator": "4"
          },
          {
            "uid": "DFukSh.Gjknmo",
            "label": "Age 65 and older",
            "category": "Effective Acute Phase Treatment",
            "rate": "50.0",
            "numerator": "1",
            "denominator": "2"
          }
        ]
      }
    },
    {
      "column": "Medicaid",
      "dataSource": ["AdministrativeData"],
      "rates": {
        "JjQeAC": [
          {
            "category": "Effective Continuation Phase Treatment",
            "uid": "JjQeAC.g91VU9",
            "label": "Ages 18 to 64"
          },
          {
            "category": "Effective Continuation Phase Treatment",
            "uid": "JjQeAC.Gjknmo",
            "label": "Age 65 and older"
          }
        ],
        "DFukSh": [
          {
            "uid": "DFukSh.g91VU9",
            "label": "Ages 18 to 64",
            "category": "Effective Acute Phase Treatment",
            "rate": "80.0",
            "numerator": "4",
            "denominator": "5"
          },
          {
            "uid": "DFukSh.Gjknmo",
            "label": "Age 65 and older",
            "category": "Effective Acute Phase Treatment",
            "rate": "50.0",
            "numerator": "1",
            "denominator": "2"
          }
        ]
      }
    },
    {
      "column": "Combined Rate",
      "rates": [
        {
          "uid": "JjQeAC.g91VU9",
          "label": "Ages 18 to 64",
          "category": "Effective Continuation Phase Treatment",
          "rate": "80.0",
          "numerator": "4",
          "denominator": "5"
        },
        {
          "uid": "JjQeAC.Gjknmo",
          "label": "Age 65 and older",
          "category": "Effective Continuation Phase Treatment",
          "rate": "40.0",
          "numerator": "2",
          "denominator": "5"
        },
        {
          "uid": "DFukSh.g91VU9",
          "label": "Ages 18 to 64",
          "category": "Effective Acute Phase Treatment",
          "rate": "66.7",
          "numerator": "6",
          "denominator": "9"
        },
        {
          "uid": "DFukSh.Gjknmo",
          "label": "Age 65 and older",
          "category": "Effective Acute Phase Treatment",
          "rate": "50.0",
          "numerator": "2",
          "denominator": "4"
        }
      ]
    }
  ],
  "year": "2024",
  "lastAltered": 1718128067775
}
