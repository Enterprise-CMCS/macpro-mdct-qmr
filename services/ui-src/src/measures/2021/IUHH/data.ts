import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

const measureName = "IUHH";

const inputFieldNames = [
  "Number of Enrollee Months",
  "Discharges",
  "Discharges per 1,000 Enrollee Months",
  "Days",
  "Days per 1,000 Enrollee Months",
  "Average Length of Stay",
];

// Rate structure by index in row
const ndrFormulas = [
  // Discharges per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    num: 3,
    denom: 1,
    rate: 5,
    mult: 1,
  },
];

export const categories = [
  "Inpatient",
  "Maternity",
  "Mental and Behavioral Disorders",
  "Surgery",
  "Medicine",
];
export const qualifiers = [
  "Ages 0 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Ages unknown",
  "Total",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter the appropriate data below. Completion of at least one set of Numerator/Denominator/Rate (numeric entry, other than zero) is required.",
  questionText: [
    "Rate of acute inpatient care and services (total, maternity, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among Health Home enrollees.",
  ],
  questionListItems: [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  categories,
  qualifiers,
};
