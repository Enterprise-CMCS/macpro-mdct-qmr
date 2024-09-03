import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("SFM-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children who have ever received sealants on permanent first molar teeth: (1) at least one sealant and (2) all four molars sealed by the 10th birthdate.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
