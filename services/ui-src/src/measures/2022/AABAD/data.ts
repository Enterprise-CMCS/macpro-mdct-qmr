import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = ["Ages 18 to 64", "Age 65 and Older"];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter a number for the numerator and the denominator.  The measure is reported as an inverted rate. The formula for the Rate = (1 - (Numerator/Denominator)) x 100",
  questionText: [
    "The percentage of episodes for beneficiaries age 18 and older with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
