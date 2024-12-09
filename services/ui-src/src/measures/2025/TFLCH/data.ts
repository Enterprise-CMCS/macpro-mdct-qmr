import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";
export const { categories, qualifiers } = getCatQualLabels("TFL-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children ages 1 through 20 who received at least two topical fluoride applications as: (1) dental or oral health services, (2) dental services, and (3) oral health services within the measurement year.",
    "For 2025 Child Core Set reporting, the following three rates are required: (1) Dental or oral health services: Total ages 1 through 20; (2) Dental services: Total ages 1 through 20; and (3) Oral health services: Total ages 1 through 20.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
