import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("FVA-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 64 who received a flu vaccination between July 1 of the measurement year and the date when the CAHPS 5.1H Adult Survey was completed.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
