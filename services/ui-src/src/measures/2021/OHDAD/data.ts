import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("OHD-AD");

export const data: MeasureTemplateData = {
  type: "PQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "The percentage of beneficiaries age 18 and older who received prescriptions for opioids with an average daily dosage greater than or equal to 90 morphine milligram equivalents (MME) over a period of 90 days or more. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice are excluded.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateAtLeastOneRateComplete,
    GV.validateRateZeroOMS,
    GV.validateRateZeroPM,
    GV.validateRateNotZeroOMS,
    GV.validateRateNotZeroPM,
    GV.validateNumeratorLessThanDenominatorOMS,
    GV.validateNumeratorsLessThanDenominatorsPM,
    GV.validateBothDatesCompleted,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
