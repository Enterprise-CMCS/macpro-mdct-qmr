import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("FUH-HH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Percentage of discharges for health home enrollees age 6 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
    ],
    questionListItems: [
      "Percentage of discharges for which the enrollee received follow-up within 30 days after discharge",
      "Percentage of discharges for which the enrollee received follow-up within 7 days after discharge",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    customTotalLabel: qualifiers[3].label,
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
    GV.validateOMSTotalNDR,
    GV.validateTotalNDR,
    GV.validateEqualQualifierDenominatorsOMS,
    GV.validateEqualQualifierDenominatorsPM,
    GV.validateYearFormat,
    GV.validateDualPopInformationPM,
  ],
  override: {
    validateDualPopInformationPM: {
      ageIndex: 2,
    },
  },
};
