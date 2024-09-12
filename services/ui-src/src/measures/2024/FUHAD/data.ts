import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("FUH-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of discharges for beneficiaries age 18 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of discharges for which the beneficiary received follow-up within 30 days after discharge",
    "Percentage of discharges for which the beneficiary received follow-up within 7 days after discharge",
  ],
  categories,
  qualifiers,
};
