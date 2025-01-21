import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("TFL-CH");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled children ages 1 through 20 who received at least two topical fluoride applications as: (1) dental or oral health services, (2) dental services, and (3) oral health services within the measurement year.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
};
