import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("SFM-CH");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled children who have ever received sealants on permanent first molar teeth by the 10th birthdate: (1) at least one sealant and (2) all four molars sealed.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  custom: {
    showtextbox: true,
  },
};
