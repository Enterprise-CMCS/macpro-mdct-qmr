import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("OEV-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children under age 21 who received a comprehensive or periodic oral evaluation within the measurement year. For FFY 2024 Child Core Set reporting, the following rate is required: Total ages < 1 to 20.",
  ],
  categories,
  qualifiers,
};
