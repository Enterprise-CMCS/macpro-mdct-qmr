import { DataDrivenTypes } from "measures/2024/shared/CommonQuestions/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("TFL-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For FFY 2024 Child Core Set reporting, the following three rates are required: (1) Dental or oral health services: Total ages 1 through 20; (2) Dental services: Total ages 1 through 20; and (3) Oral health services: Total ages 1 through 20.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
