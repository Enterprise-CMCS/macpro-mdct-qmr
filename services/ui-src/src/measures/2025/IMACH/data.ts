import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("IMA-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of adolescents age 13 who had one dose of meningococcal vaccine, one tetanus, diphtheria toxoids and acellular pertussis (Tdap) vaccine, and have completed  the human papillomavirus (HPV) vaccine series by their 13th birthday. The measure calculates a rate for each vaccine and two combination rates.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: DC.ADMINISTRATIVE_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.IMMUNIZATION_REGISTRY_INFORMATION_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
        ],
      },
      {
        value: DC.HYBRID_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.IMMUNIZATION_REGISTRY_INFORMATION_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
            options: [{ value: DC.EHR_DATA }, { value: DC.PAPER }],
          },
        ],
      },
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        description: true,
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
      },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
};
