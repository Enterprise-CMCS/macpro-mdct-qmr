import {
  MeasureTemplateData,
  ValidationFunction,
} from "shared/types/MeasureTemplate";

export const testOMSValidations: ValidationFunction[] = [
  "validateNumeratorLessThanDenominatorOMS",
  "validateRateZeroOMS",
  "validateRateNotZeroOMS",
  "validateOneQualDenomHigherThanOtherDenomOMS",
  "validateOMSTotalNDR",
  "validateEqualQualifierDenominatorsOMS",
  "validateOneCatRateHigherThanOtherCatOMS",
  "validateOneQualRateHigherThanOtherQualOMS",
  "validateSameDenominatorSetsOMS",
  "validateEqualCategoryDenominatorsOMS",
];

export const testComplexValidations: ValidationFunction[] = [
  "ComplexValidateDualPopInformation",
  "ComplexAtLeastOneRateComplete",
  "ComplexNoNonZeroNumOrDenom",
  "ComplexValidateNDRTotals",
  "ComplexValueSameCrossCategory",
];

export const legacyTestValidations: ValidationFunction[] = [
  "validateReasonForNotReporting",
  "validateRequiredRadioButtonForCombinedRates",
  "validateBothDatesCompleted",
  "validateYearFormat",
  "validateAtLeastOneDataSource",
  "validateAtLeastOneRateComplete",
  "validateRateZeroPM",
  "validateRateNotZeroPM",
  "validateNumeratorsLessThanDenominatorsPM",
  "validateOneQualDenomHigherThanOtherDenomPM",
  "validateTotalNDR",
  "validateEqualQualifierDenominatorsPM",
  "validateOneCatRateHigherThanOtherCatPM",
  "validateDualPopInformationPM",
  "validateEqualCategoryDenominatorsPM",
  "validateOneQualRateHigherThanOtherQualPM",
  "PCRatLeastOneRateComplete",
  "PCRnoNonZeroNumOrDenom",
  "validateFfsRadioButtonCompletion",
  "validateAtLeastOneDataSourceType",
  "validateDateRangeRadioButtonCompletion",
  "validateDeviationTextFieldFilled",
  "validateOPMRates",
  "validateHedisYear",
  "validateAtLeastOneDeliverySystem",
  "validateAtLeastOneDefinitionOfPopulation",
];

export const testValidations: ValidationFunction[] = [
  "validateReasonForNotReporting",
  "validateRequiredRadioButtonForCombinedRates",
  "validateBothDatesCompleted",
  "validateYearFormat",
  "validateAtLeastOneDataSource",
  "validateAtLeastOneRateComplete",
  "validateRateZeroPM",
  "validateRateNotZeroPM",
  "validateNumeratorsLessThanDenominatorsPM",
  "validateOneQualDenomHigherThanOtherDenomPM",
  "validateTotalNDR",
  "validateEqualQualifierDenominatorsPM",
  "validateOneCatRateHigherThanOtherCatPM",
  "validateDualPopInformationPM",
  "validateEqualCategoryDenominatorsPM",
  "validateOneQualRateHigherThanOtherQualPM",
  "PCRatLeastOneRateComplete",
  "PCRnoNonZeroNumOrDenom",
  "validateFfsRadioButtonCompletion",
  "validateAtLeastOneDataSourceType",
  "validateDateRangeRadioButtonCompletion",
  "validateDeviationTextFieldFilled",
  "validateOPMRates",
  "validateHedisYear",
  "validateAtLeastOneDeliverySystem",
  "validateAtLeastOneDefinitionOfPopulation",
  "validateHybridMeasurePopulation",
];

export const testMeasure: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    qualifiers: [
      {
        label: "Ages 18 to 64",
        text: "Ages 18 to 64",
        id: "lL2f0N",
      },
      {
        label: "Ages 65 to 85",
        text: "Ages 65 to 85",
        id: "SynTm5",
      },
    ],
    categories: [{ id: "qyic1D", label: "", text: "" }],
  },
  validations: [],
};
