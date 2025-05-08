import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("PDS-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "The percentage of deliveries in which beneficiaries were screened for clinical depression during the postpartum period, and if screened positive, received follow-up care.",
    ],
    questionListTitles: [
      "Depression Screening. ",
      "Follow-Up on Positive Screen. ",
    ],
    questionListItems: [
      "The percentage of deliveries in which beneficiaries were screened for clinical depression using a standardized instrument during the postpartum period.",
      "The percentage of deliveries in which beneficiaries received follow-up care within 30 days of a positive depression screen finding.",
    ],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        subOptions: [
          {
            options: [
              { value: DC.ELECTRONIC_HEALTH_RECORDS_PERSONAL_HEALTH_REGISTRY },
              { value: DC.HEALTH_INFORMATION_EXCHANGE_CLINICAL_REGISTRY },
              { value: DC.CASE_MANAGEMENT_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA },
            ],
          },
        ],
        description: true,
      },
    ],
  },
};
