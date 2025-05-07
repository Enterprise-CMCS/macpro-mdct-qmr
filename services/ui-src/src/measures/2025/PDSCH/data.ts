import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PDS-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "The percentage of deliveries in which beneficiaries were screened for clinical depression during the postpartum period, and if screened positive, received follow-up care.",
    ],
    questionListItems: [
      "Depression Screening. The percentage of deliveries in which beneficiaries were screened for clinical depression using a standardized instrument during the postpartum period.",
      "Follow-Up on Positive Screen. The percentage of deliveries in which beneficiaries received follow-up care within 30 days of a positive depression screen finding.",
    ],
    categories,
    qualifiers,
  },
};
