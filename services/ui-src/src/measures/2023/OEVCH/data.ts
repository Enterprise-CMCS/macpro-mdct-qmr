import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("OEV-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children under age 21 who received a comprehensive or periodic oral evaluation within the measurement year.",
  ],
  categories,
  qualifiers,
};
