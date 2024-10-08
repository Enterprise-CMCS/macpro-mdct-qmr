import * as validateAtLeastOneDataSource from "shared/globalValidations/validateAtLeastOneDataSource";
import * as validateAtLeastOneDeviationFieldFilled from "shared/globalValidations/validateAtLeastOneDeviationFieldFilled";
import * as validateAtLeastOneRateComplete from "shared/globalValidations/validateAtLeastOneRateComplete";
import * as validateBothDatesInRange from "shared/globalValidations/validateBothDatesInRange";
import * as validateDualPopInformation from "shared/globalValidations/validateDualPopInformation";
import * as validateEqualCategoryDenominators from "shared/globalValidations/validateEqualCategoryDenominators";
import * as validateEqualQualifierDenominators from "shared/globalValidations/validateEqualQualifierDenominators";
import * as validateRateZero from "shared/globalValidations/validateRateZero";
import * as validateRateNotZero from "shared/globalValidations/validateRateNotZero";
import * as validateNumeratorsLessThanDenominators from "shared/globalValidations/validateNumeratorsLessThanDenominators";
import * as validateOneCatRateHigherThanOtherCat from "shared/globalValidations/validateOneCatRateHigherThanOtherCat";
import * as validateOneQualDenomHigherThanOtherDenomOMS from "shared/globalValidations/validateOneQualDenomHigherThanOtherDenomOMS";
import * as validateOneQualRateHigherThanOtherQual from "shared/globalValidations/validateOneQualRateHigherThanOtherQual";
import * as validateReasonForNotReporting from "shared/globalValidations/validateReasonForNotReporting";
import * as validateRequiredRadioButtonForCombinedRates from "shared/globalValidations/validateRequiredRadioButtonForCombinedRates";
import * as validateTotals from "shared/globalValidations/validateTotals";
import * as PCRatLeastOneRateComplete from "shared/globalValidations/PCRValidations/PCRatLeastOneRateComplete";
import * as PCRnoNonZeroNumOrDenom from "shared/globalValidations/PCRValidations/PCRnoNonZeroNumOrDenom";
import * as PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec from "shared/globalValidations/PCRValidations/PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec"; //pragma: allowlist secret
import * as ComplexAtLeastOneRateComplete from "shared/globalValidations/ComplexValidations/ComplexAtLeastOneRateComplete";
import * as ComplexNoNonZeroNumOrDenom from "shared/globalValidations/ComplexValidations/ComplexNoNonZeroNumOrDenom";
import * as ComplexValueSameCrossCategory from "shared/globalValidations/ComplexValidations/ComplexValueSameCrossCategory";
import * as ComplexValidateNDRTotals from "shared/globalValidations/ComplexValidations/ComplexValidateNDRTotals";
import * as ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec from "shared/globalValidations/ComplexValidations/ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec"; //pragma: allowlist secret
import * as ComplexValidateDualPopInformation from "shared/globalValidations/ComplexValidations/ComplexValidateDualPopInformation";
import { DefaultFormDataLegacy as DefaultFormData } from "shared/types/FormData";

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
  PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec: jest.spyOn(
    PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec,
    "PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec"
  ),
  ComplexAtLeastOneRateComplete: jest.spyOn(
    ComplexAtLeastOneRateComplete,
    "ComplexAtLeastOneRateComplete"
  ),
  ComplexNoNonZeroNumOrDenom: jest.spyOn(
    ComplexNoNonZeroNumOrDenom,
    "ComplexNoNonZeroNumOrDenom"
  ),
  ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec: jest.spyOn(
    ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec,
    "ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec"
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
