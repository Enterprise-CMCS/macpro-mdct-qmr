import * as validateAtLeastOneDataSource from "measures/2022/globalValidations/validateAtLeastOneDataSource";
import * as validateAtLeastOneDeviationFieldFilled from "measures/2022/globalValidations/validateAtLeastOneDeviationFieldFilled";
import * as validateAtLeastOneRateComplete from "measures/2022/globalValidations/validateAtLeastOneRateComplete";
import * as validateBothDatesInRange from "measures/2022/globalValidations/validateBothDatesInRange";
import * as validateDualPopInformation from "measures/2022/globalValidations/validateDualPopInformation";
import * as validateEqualCategoryDenominators from "measures/2022/globalValidations/validateEqualCategoryDenominators";
import * as validateEqualQualifierDenominators from "measures/2022/globalValidations/validateEqualQualifierDenominators";
import * as validateRateNotZero from "measures/2022/globalValidations/validateRateNotZero";
import * as validateRateZero from "measures/2022/globalValidations/validateRateZero";
import * as validateNumeratorsLessThanDenominators from "measures/2022/globalValidations/validateNumeratorsLessThanDenominators";
import * as validateOneCatRateHigherThanOtherCat from "measures/2022/globalValidations/validateOneCatRateHigherThanOtherCat";
import * as validateOneQualDenomHigherThanOtherDenomOMS from "measures/2022/globalValidations/validateOneQualDenomHigherThanOtherDenomOMS";
import * as validateOneQualRateHigherThanOtherQual from "measures/2022/globalValidations/validateOneQualRateHigherThanOtherQual";
import * as validateReasonForNotReporting from "measures/2022/globalValidations/validateReasonForNotReporting";
import * as validateRequiredRadioButtonForCombinedRates from "measures/2022/globalValidations/validateRequiredRadioButtonForCombinedRates";
import * as validateTotals from "measures/2022/globalValidations/validateTotals";
import * as PCRatLeastOneRateComplete from "measures/2022/globalValidations/PCRValidations/PCRatLeastOneRateComplete";
import * as PCRnoNonZeroNumOrDenom from "measures/2022/globalValidations/PCRValidations/PCRnoNonZeroNumOrDenom";
import * as PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec from "measures/2022/globalValidations/PCRValidations/PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec"; //pragma: allowlist secret
import * as ComplexAtLeastOneRateComplete from "measures/2022/globalValidations/ComplexValidations/ComplexAtLeastOneRateComplete";
import * as ComplexNoNonZeroNumOrDenom from "measures/2022/globalValidations/ComplexValidations/ComplexNoNonZeroNumOrDenom";
import * as ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec from "measures/2022/globalValidations/ComplexValidations/ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec"; //pragma: allowlist secret
import * as ComplexValidateNDRTotals from "measures/2022/globalValidations/ComplexValidations/ComplexValidateNDRTotals";
import * as ComplexValidateDualPopInformation from "measures/2022/globalValidations/ComplexValidations/ComplexValidateDualPopInformation";
import * as ComplexValueSameCrossCategory from "measures/2022/globalValidations/ComplexValidations/ComplexValueSameCrossCategory";
import { DefaultFormData } from "measures/2022/CommonQuestions/types";

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
