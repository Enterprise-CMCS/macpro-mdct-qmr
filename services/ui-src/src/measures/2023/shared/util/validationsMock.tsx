import * as validateAtLeastOneDataSource from "shared/globalValidations/validateAtLeastOneDataSource";
import * as validateAtLeastOneDefinitionOfPopulation from "shared/globalValidations/validateAtLeastOneDefinitionOfPopulation";
import * as validateAtLeastOneDataSourceType from "measures/2023/shared/globalValidations/validateAtLeastOneDataSourceType";
import * as validateAtLeastOneDeliverySystem from "shared/globalValidations/validateAtLeastOneDeliverySystem";
import * as validateAtLeastOneDeviationFieldFilled from "shared/globalValidations/validateDeviationTextFieldFilled";
import * as validateAtLeastOneRateComplete from "shared/globalValidations/validateAtLeastOneRateComplete";
import * as validateBothDatesInRange from "shared/globalValidations/validateBothDatesInRange";
import * as validateDualPopInformation from "shared/globalValidations/validateDualPopInformation";
import * as validateEqualCategoryDenominators from "shared/globalValidations/validateEqualCategoryDenominators";
import * as validateEqualQualifierDenominators from "shared/globalValidations/validateEqualQualifierDenominators";
import * as validateRateZero from "shared/globalValidations/validateRateZero";
import * as validateFfsRadioButtonCompletion from "shared/globalValidations/validateFfsRadioButtonCompletion";
import * as validateRateNotZero from "shared/globalValidations/validateRateNotZero";
import * as validateNumeratorsLessThanDenominators from "shared/globalValidations/validateNumeratorsLessThanDenominators";
import * as validateOneCatRateHigherThanOtherCat from "shared/globalValidations/validateOneCatRateHigherThanOtherCat";
import * as validateOneQualDenomHigherThanOtherDenomOMS from "shared/globalValidations/validateOneQualDenomHigherThanOtherDenomOMS";
import * as validateOneQualRateHigherThanOtherQual from "shared/globalValidations/validateOneQualRateHigherThanOtherQual";
import * as validateReasonForNotReporting from "shared/globalValidations/validateReasonForNotReporting";
import * as validateRequiredRadioButtonForCombinedRates from "shared/globalValidations/validateRequiredRadioButtonForCombinedRates";
import * as validateTotals from "measures/2023/shared/globalValidations/validateTotals";
import * as PCRatLeastOneRateComplete from "shared/globalValidations/PCRValidations/PCRatLeastOneRateComplete";
import * as PCRnoNonZeroNumOrDenom from "shared/globalValidations/PCRValidations/PCRnoNonZeroNumOrDenom";
import * as ComplexAtLeastOneRateComplete from "shared/globalValidations/ComplexValidations/ComplexAtLeastOneRateComplete";
import * as ComplexNoNonZeroNumOrDenom from "measures/2023/shared/globalValidations/ComplexValidations/ComplexNoNonZeroNumOrDenom";
import * as ComplexValidateNDRTotals from "shared/globalValidations/ComplexValidations/ComplexValidateNDRTotals";
import * as ComplexValidateDualPopInformation from "shared/globalValidations/ComplexValidations/ComplexValidateDualPopInformation";
import * as ComplexValueSameCrossCategory from "measures/2023/shared/globalValidations/ComplexValidations/ComplexValueSameCrossCategory";
import { DefaultFormData } from "shared/types/FormData";

/**
 * Replicate the behavior of the validateAndSetErrors() function in the MeasureWrapper
 */
export const mockValidateAndSetErrors = (
  validationFunctions: any,
  data: DefaultFormData | {} = {}
) => {
  validationFunctions.reduce((_a: any, current: any) => current(data), []);
};

export const clearMocks = () => {
  for (const mock in validationsMockObj) {
    validationsMockObj[mock].mockClear();
  }
};

/**
 * Spies for all the validation functions in the globalValidations folder
 */
export const validationsMockObj: any = {
  validateAtLeastOneDataSource: jest.spyOn(
    validateAtLeastOneDataSource,
    "validateAtLeastOneDataSource"
  ),
  validateAtLeastOneDefinitionOfPopulation: jest.spyOn(
    validateAtLeastOneDefinitionOfPopulation,
    "validateAtLeastOneDefinitionOfPopulation"
  ),
  validateAtLeastOneDataSourceType: jest.spyOn(
    validateAtLeastOneDataSourceType,
    "validateAtLeastOneDataSourceType"
  ),
  validateAtLeastOneDeliverySystem: jest.spyOn(
    validateAtLeastOneDeliverySystem,
    "validateAtLeastOneDeliverySystem"
  ),
  validateAtLeastOneDeviationFieldFilled: jest.spyOn(
    validateAtLeastOneDeviationFieldFilled,
    "validateAtLeastOneDeviationFieldFilled"
  ),
  validateAtLeastOneRateComplete: jest.spyOn(
    validateAtLeastOneRateComplete,
    "validateAtLeastOneRateComplete"
  ),
  validateBothDatesCompleted: jest.spyOn(
    validateBothDatesInRange,
    "validateBothDatesCompleted"
  ),
  validateDualPopInformationPM: jest.spyOn(
    validateDualPopInformation,
    "validateDualPopInformationPM"
  ),
  validateEqualCategoryDenominatorsPM: jest.spyOn(
    validateEqualCategoryDenominators,
    "validateEqualCategoryDenominatorsPM"
  ),
  validateEqualCategoryDenominatorsOMS: jest.spyOn(
    validateEqualCategoryDenominators,
    "validateEqualCategoryDenominatorsOMS"
  ),
  validateEqualQualifierDenominatorsPM: jest.spyOn(
    validateEqualQualifierDenominators,
    "validateEqualQualifierDenominatorsPM"
  ),
  validateEqualQualifierDenominatorsOMS: jest.spyOn(
    validateEqualQualifierDenominators,
    "validateEqualQualifierDenominatorsOMS"
  ),
  validateFfsRadioButtonCompletion: jest.spyOn(
    validateFfsRadioButtonCompletion,
    "validateFfsRadioButtonCompletion"
  ),
  validateRateNotZeroPM: jest.spyOn(
    validateRateNotZero,
    "validateRateNotZeroPM"
  ),
  validateRateNotZeroOMS: jest.spyOn(
    validateRateNotZero,
    "validateRateNotZeroOMS"
  ),
  validateRateZeroPM: jest.spyOn(validateRateZero, "validateRateZeroPM"),
  validateRateZeroOMS: jest.spyOn(validateRateZero, "validateRateZeroOMS"),
  validateNumeratorsLessThanDenominatorsPM: jest.spyOn(
    validateNumeratorsLessThanDenominators,
    "validateNumeratorsLessThanDenominatorsPM"
  ),
  validateNumeratorLessThanDenominatorOMS: jest.spyOn(
    validateNumeratorsLessThanDenominators,
    "validateNumeratorLessThanDenominatorOMS"
  ),
  validateOneCatRateHigherThanOtherCatPM: jest.spyOn(
    validateOneCatRateHigherThanOtherCat,
    "validateOneCatRateHigherThanOtherCatPM"
  ),
  validateOneCatRateHigherThanOtherCatOMS: jest.spyOn(
    validateOneCatRateHigherThanOtherCat,
    "validateOneCatRateHigherThanOtherCatOMS"
  ),
  validateOneQualDenomHigherThanOtherDenomOMS: jest.spyOn(
    validateOneQualDenomHigherThanOtherDenomOMS,
    "validateOneQualDenomHigherThanOtherDenomOMS"
  ),
  validateOneQualRateHigherThanOtherQualPM: jest.spyOn(
    validateOneQualRateHigherThanOtherQual,
    "validateOneQualRateHigherThanOtherQualPM"
  ),
  validateOneQualRateHigherThanOtherQualOMS: jest.spyOn(
    validateOneQualRateHigherThanOtherQual,
    "validateOneQualRateHigherThanOtherQualOMS"
  ),
  validateReasonForNotReporting: jest.spyOn(
    validateReasonForNotReporting,
    "validateReasonForNotReporting"
  ),
  validateRequiredRadioButtonForCombinedRates: jest.spyOn(
    validateRequiredRadioButtonForCombinedRates,
    "validateRequiredRadioButtonForCombinedRates"
  ),
  validateTotalNDR: jest.spyOn(validateTotals, "validateTotalNDR"),
  validateOMSTotalNDR: jest.spyOn(validateTotals, "validateOMSTotalNDR"),
  PCRatLeastOneRateComplete: jest.spyOn(
    PCRatLeastOneRateComplete,
    "PCRatLeastOneRateComplete"
  ),
  PCRnoNonZeroNumOrDenom: jest.spyOn(
    PCRnoNonZeroNumOrDenom,
    "PCRnoNonZeroNumOrDenom"
  ),
  ComplexAtLeastOneRateComplete: jest.spyOn(
    ComplexAtLeastOneRateComplete,
    "ComplexAtLeastOneRateComplete"
  ),
  ComplexNoNonZeroNumOrDenom: jest.spyOn(
    ComplexNoNonZeroNumOrDenom,
    "ComplexNoNonZeroNumOrDenom"
  ),
  ComplexValidateNDRTotals: jest.spyOn(
    ComplexValidateNDRTotals,
    "ComplexValidateNDRTotals"
  ),
  ComplexValidateDualPopInformation: jest.spyOn(
    ComplexValidateDualPopInformation,
    "ComplexValidateDualPopInformation"
  ),
  ComplexValueSameCrossCategory: jest.spyOn(
    ComplexValueSameCrossCategory,
    "ComplexValueSameCrossCategory"
  ),
};
