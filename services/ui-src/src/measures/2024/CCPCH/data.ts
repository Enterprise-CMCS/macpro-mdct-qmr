import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("CCP-CH");

export const data: MeasureTemplateData = {
  type: "OPA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Among women ages 15 to 20 who had a live birth, the percentage that:",
    ],
    questionListOrderedItems: [
      "Were provided a most effective or moderately effective method of contraception within 3 days of delivery and within 90 days of delivery",
      "Were provided a long-acting reversible method of contraception (LARC) within 3 days of delivery and within 90 days of delivery",
    ],
    categories,
    qualifiers,
  },
  opm: {
    excludeOptions: ["O8BrOa"],
  },
};
