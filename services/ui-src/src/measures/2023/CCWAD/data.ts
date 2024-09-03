import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("CCW-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Among women ages 21 to 44 at risk of unintended pregnancy, the percentage that:",
  ],
  questionListItems: [
    "Were provided a most effective or moderately effective method of contraception",
    "Were provided a long-acting reversible method of contraception (LARC)",
  ],
  categories,
  qualifiers,
};
