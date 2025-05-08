import * as DC from "dataConstants";

export type SpecificationType =
  | "ADA-DQA"
  | "AHRQ"
  | "AHRQ-NCQA"
  | "CDC"
  | "CMS"
  | "HEDIS"
  | "HRSA"
  | "JOINT"
  | "NCQA"
  | "OHSU"
  | "OPA"
  | "PQA"
  | "SAMHSA";

type SpecifictionProps = {
  [type in SpecificationType]: {
    displayValue: string;
    value: string;
    children?: JSX.Element[];
  };
};

export const specifications: SpecifictionProps = {
  "ADA-DQA": {
    displayValue:
      "American Dental Association/Dental Quality Alliance (ADA/DQA)",
    value: DC.ADA_DQA,
  },
  AHRQ: {
    displayValue: "Agency for Healthcare Research and Quality (AHRQ)",
    value: DC.AHRQ,
  },
  "AHRQ-NCQA": {
    displayValue:
      "Agency for Healthcare Research and Quality (AHRQ) (survey instrument) and National Committee for Quality Assurance (survey administrative protocol)",
    value: DC.AHRQ_NCQA,
  },
  CDC: {
    displayValue: "Centers for Disease Contol and Prevention (CDC)",
    value: DC.CDC,
  },
  CMS: {
    displayValue: "Centers for Medicare & Medicaid Services (CMS)",
    value: DC.CMS,
  },
  HEDIS: {
    displayValue:
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)",
    value: DC.NCQA,
  },
  HRSA: {
    displayValue: "Health Resources and Services Administration (HRSA)",
    value: DC.HRSA,
  },
  JOINT: {
    displayValue: "The Joint Commission",
    value: DC.JOINT_COMMISSION,
  },
  NCQA: {
    displayValue: "National Committee for Quality Assurance (NCQA)",
    value: DC.NCQA,
  },
  OHSU: {
    displayValue: "Oregon Health and Science University (OHSU)",
    value: DC.OHSU,
  },
  OPA: {
    displayValue: "HHS Office of Population Affairs (OPA)",
    value: DC.OPA,
  },
  PQA: {
    displayValue: "Pharmacy Quality Alliance (PQA)",
    value: DC.PQA,
  },
  SAMHSA: {
    displayValue:
      "Substance Abuse and Mental Health Services Administration (SAMHSA)",
    value: DC.SAMHSA,
  },
};

export interface MeasurementSpecification {
  [DC.MEASUREMENT_SPECIFICATION]: // Selected Measurement Specification
  | typeof DC.NCQA
    | typeof DC.OPA
    | typeof DC.AHRQ
    | typeof DC.CMS
    | typeof DC.OTHER
    | typeof DC.HRSA
    | typeof DC.PQA;
  [DC.MEASUREMENT_SPECIFICATION_HEDIS]: string;
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION]: string; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is the description
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD]: File; // If user selects OTHER in MEASUREMENT_SPECIFICATION -> this is optional file upload
}
