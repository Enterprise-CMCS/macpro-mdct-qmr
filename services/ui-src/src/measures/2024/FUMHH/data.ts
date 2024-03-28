import { DataDrivenTypes } from "measures/2024/shared/CommonQuestions/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("FUM-HH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of emergency department (ED) visits for health home enrollees age 6 and older with a principal diagnosis of mental illness or intentional self-harm and who had a follow-up visit for mental illness. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of ED visits for which the enrollee received follow-up within 30 days of the ED visit (31 total days)",
    "Percentage of ED visits for which the enrollee received follow-up within 7 days of the ED visit (8 total days)",
  ],
  categories,
  qualifiers,
};
