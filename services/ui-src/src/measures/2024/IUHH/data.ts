import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("IU-HH");

const measureName = "IUHH";

const inputFieldNames = [
  {
    label: "Number of Enrollee Months",
    text: "Number of Enrollee Months",
    id: "G3AVs1",
  },
  { label: "Discharges", text: "Discharges", id: "MwGkaA" },
  {
    label: "Discharges per 1,000 Enrollee Months",
    text: "Discharges per 1,000 Enrollee Months",
    id: "CGEK9m",
  },
  { label: "Days", text: "Days", id: "jSSEHA" },
  {
    label: "Days per 1,000 Enrollee Months",
    text: "Days per 1,000 Enrollee Months",
    id: "qjHhDk",
  },
  {
    label: "Average Length of Stay",
    text: "Average Length of Stay",
    id: "coDyWU",
  },
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

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter the appropriate data below. Completion of at least one set of Numerator/Denominator/Rate (numeric entry, other than zero) is required.",
  questionText: [
    "Rate of acute inpatient care and services (total and mental and behavioral disorders) per 1,000 enrollee months among health home enrollees.",
  ],
  questionListItems: [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  categories,
  qualifiers,
};
