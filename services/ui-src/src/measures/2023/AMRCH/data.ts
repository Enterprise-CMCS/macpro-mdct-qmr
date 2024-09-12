import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AMR-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of children and adolescents ages 5 to 18 who were identified as having persistent asthma and had a ratio of controller medications to total asthma medications of 0.50 or greater during the measurement year.",
  ],
  categories,
  qualifiers,
};
