import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = ["All Women Ages 21 to 44"];
export const categories = [
  "Most effective or moderately effective method of contraception",
  "Long-acting reversible method of contraception (LARC)",
];

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
