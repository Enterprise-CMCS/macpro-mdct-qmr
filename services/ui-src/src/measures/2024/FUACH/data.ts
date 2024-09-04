import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("FUA-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of emergency department (ED) visits for beneficiaries ages 13 to 17 years with a principal diagnosis of substance use disorder (SUD) or any diagnosis of drug overdose, for which there was follow-up. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of ED visits for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
    "Percentage of ED visits for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
  ],
  categories,
  qualifiers,
};
