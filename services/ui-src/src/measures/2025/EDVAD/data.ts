import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("EDV-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [""],
  categories,
  qualifiers,
};
