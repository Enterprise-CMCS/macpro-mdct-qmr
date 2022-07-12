import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = [
  "Total Rate",
  "Buprenorphine",
  "Oral naltrexone",
  "Long-acting, injectable naltrexone",
  "Methadone",
];
export const categories: string[] = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of Medicaid enrollees ages 18 to 64 with an opioid use disorder (OUD) who filled a prescription for or were administered or dispensed an FDA-approved medication for the disorder during the measurement year. Five rates are reported:",
    "A total (overall) rate capturing any medications used in medication assisted treatment of opioid dependence and addiction (Rate 1)",
    "Four separate rates representing the following types of FDA-approved drug products:",
  ],
  questionListItems: [
    "Buprenorphine (Rate 2)",
    "Oral naltrexone (Rate 3)",
    "Long-acting, injectable naltrexone (Rate 4)",
    "Methadone (Rate 5)",
  ],
  categories,
  qualifiers,
};
