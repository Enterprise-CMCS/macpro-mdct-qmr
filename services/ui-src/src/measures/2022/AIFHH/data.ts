import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [];
export const qualifiers = [
  "Ages 18 to 64",
  "Ages 65 to 74",
  "Ages 75 to 84",
  "Age 85 and older",
  "Total",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The number of admissions to an institututional facility among Health Home enrollees age 18 and older residing in the community for at least one month. The number of short-, medium-, or long-term admissions is reported per 1,000 enrollee months. Enrollee months reflect the total number of months each enrollee is enrolled in the program and residing in the community for at least one day of the month.",
  ],
  questionListItems: [
    " The rate of admissions resulting in a short-term stay (1 to 20 days) per 1,000 enrollee months.",
    " The rate of admissions resulting in a medium-term stay (21 to 100 days) per 1,000 enrollee months.",
    " The rate of admissions resulting in a long-term stay (greater than or equal to 101 days) per 1,000 enrollee months.",
  ],
  questionListTitles: ["Short-Term Stay", "Medium-Term Stay", "Long-Term Stay"],
  questionSubtext: [
    "The following three rates are reported across four age groups (ages 18 to 64, ages 65 to 74, ages 75 to 84, and age 85 and older):",
  ],
  categories,
  qualifiers,
};
