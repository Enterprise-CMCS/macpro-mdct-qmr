import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("COB-AD");

export const data: MeasureTemplateData = {
  type: "PQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older with concurrent use of prescription opioids and benzodiazepines. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice or palliative care are excluded.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateAtLeastOneDeviationFieldFilled",
    "validateReasonForNotReporting",
    "validateAtLeastOneDataSource",
    "validateAtLeastOneRateComplete",
    "validateRateZeroOMS",
    "validateRateZeroPM",
    "validateRateNotZeroOMS",
    "validateRateNotZeroPM",
    "validateNumeratorLessThanDenominatorOMS",
    "validateNumeratorsLessThanDenominatorsPM",
    "validateBothDatesCompleted",
    "validateEqualQualifierDenominatorsOMS",
    "validateYearFormat",
    "validateDualPopInformationPM",
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
