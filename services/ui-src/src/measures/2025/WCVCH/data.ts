import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("WCV-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children ages 3 to 21 who had at least one comprehensive well-care visit with a primary care practitioner (PCP) or an obstetrician/gynecologist (OB/GYN) during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
