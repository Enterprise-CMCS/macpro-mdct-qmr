import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("CCW-CH");

export const data: MeasureTemplateData = {
  type: "OPA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Among women ages 15 to 20 at risk of unintended pregnancy, the percentage that:",
    ],
    questionListOrderedItems: [
      "Were provided a most effective or moderately effective method of contraception",
      "Were provided a long-acting reversible method of contraception (LARC)",
    ],
    categories,
    qualifiers,
  },
  opm: {
    excludeOptions: ["O8BrOa"],
  },
};
