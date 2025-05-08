import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("OEVP-CH");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled persons ages 15 to 20 with live-birth deliveries in the measurement year who received a comprehensive or periodic oral evaluation during pregnancy. ",
    ],
    categories,
    qualifiers,
  },
};
