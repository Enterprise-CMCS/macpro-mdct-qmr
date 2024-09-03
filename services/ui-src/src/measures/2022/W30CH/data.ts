import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("W30-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children who had the following number of well-child visits with a primary care practitioner (PCP) during the last 15 months. The following rates are reported:",
  ],
  questionListItems: [
    " Children who turned age 15 months during the measurement year: Six or more well-child visits.",
    " Children who turned age 30 months during the measurement year: Two or more well-child visits.",
  ],
  questionListTitles: [
    "Well-Child Visits in the First 15 Months.",
    "Well-Child Visits for Age 15 Months-30 Months.",
  ],
  categories,
  qualifiers,
};
