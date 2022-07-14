import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children ages 3 to 21 who had at least one comprehensive well-care visit with a primary care practitioner (PCP) or an obstetrician/gynecologist (OB/GYN) during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
