import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("MSC-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The following components of this measure assess different facets of providing medical assistance with smoking and tobacco use cessation:",
  ],
  questionListItems: [
    "– A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who received advice to quit during the measurement year",
    "– A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who discussed or were recommended cessation medications during the measurement year",
    "– A rolling average represents the percentage of beneficiaries age 18 and Older who were current smokers or tobacco users and who discussed or were provided cessation methods or strategies during the measurement year",
  ],
  questionListTitles: [
    "Advising Smokers and Tobacco Users to Quit",
    "Discussing Cessation Medications",
    "Discussing Cessation Strategies",
  ],
  categories,
  qualifiers,
};
