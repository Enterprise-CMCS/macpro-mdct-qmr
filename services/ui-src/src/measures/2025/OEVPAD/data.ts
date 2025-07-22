import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("OEVP-AD");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled persons ages 21 to 44 with live-birth deliveries in the measurement year who received a comprehensive or periodic oral evaluation during pregnancy.",
    ],
    categories,
    qualifiers,
  },
  opm: {
    excludeOptions: ["O8BrOa"],
  },
};
