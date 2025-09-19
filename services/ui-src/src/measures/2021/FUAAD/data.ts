import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUA-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of emergency department (ED) visits for beneficiaries age 18 and Older with a principal diagnosis of alcohol or other drug (AOD) abuse or dependence who had a follow-up visit for AOD Abuse or Dependence. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of ED visits for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
      "Percentage of ED visits for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
    ],
    categories,
    qualifiers,
  },
  validations: [
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateAtLeastOneDeviationFieldFilled,
    GV.validateOneCatRateHigherThanOtherCatOMS,
    GV.validateOneCatRateHigherThanOtherCatPM,
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
    GV.validateEqualQualifierDenominatorsOMS,
    GV.validateEqualQualifierDenominatorsPM,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 1,
    },
  },
};
