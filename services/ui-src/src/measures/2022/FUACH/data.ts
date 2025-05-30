import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUA-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of emergency department (ED) visits for beneficiaries ages 13 to 17 years with a principal diagnosis of alcohol or other drug (AOD) abuse or dependence who had a follow-up visit for AOD abuse or dependence. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of ED visits for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
      "Percentage of ED visits for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
    ],
    categories,
    qualifiers,
  },
};
