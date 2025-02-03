import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("COB-AD");

export const data: MeasureTemplateData = {
  type: "PQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older with concurrent use of prescription opioids and benzodiazepines. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice are excluded.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
};
