import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = [""];
export const categories = [
  "Rate 1 - At Least One Sealant",
  "Rate 2 - All Four Molars Sealed",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children who have ever received sealants on permanent first molar teeth: (1) at least one sealant and (2) all four molars sealed by the 10th birthdate.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
