import { ComponentFlagType } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { DataDrivenTypes } from "./TypeDataDriven";
import { CoreSetKey } from "./GlobalTypes";
import { LabelData } from "utils";

export interface customData {
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  customTotalLabel?: string;
  rateScale?: number;
  customMask?: RegExp;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  allowNumeratorGreaterThanDenominator?: boolean;
  showtextbox?: boolean;
  dataSrcRadio?: boolean;
  removeLessThan30?: boolean;
  rateCalc?: RateFormula;
  customPrompt?: string;
  RateComponent?: RateComp;
  populationSampleSize?: boolean;
  notCollectingOMS?: boolean;
}

export const validationFunctions = [
  "validateRequiredRadioButtonForCombinedRates",
  "validateAtLeastOneDeviationFieldFilled",
  "validateReasonForNotReporting",
  "validateAtLeastOneDataSource",
  "validateBothDatesCompleted",
  "validateYearFormat",
  "validateAtLeastOneRateComplete",
  "validateRateZeroPM",
  "validateRateNotZeroPM",
  "validateNumeratorsLessThanDenominatorsPM",
  "validateOneQualDenomHigherThanOtherDenomPM",
  "validateRateZeroOMS",
  "validateRateNotZeroOMS",
  "validateNumeratorLessThanDenominatorOMS",
  "validateOneQualDenomHigherThanOtherDenomOMS",
  "validateOMSTotalNDR",
  "validateOneCatRateHigherThanOtherCatOMS",
  "validateTotalNDR",
  "validateEqualQualifierDenominatorsPM",
  "validateOneCatRateHigherThanOtherCatPM",
  "validateDualPopInformationPM",
  "validateEqualCategoryDenominatorsPM",
  "ComplexValidateDualPopInformation",
  "ComplexAtLeastOneRateComplete",
  "ComplexNoNonZeroNumOrDenom",
  "ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec",
  "ComplexValidateNDRTotals",
  "validateSameDenominatorSetsOMS",
  "PCRatLeastOneRateComplete",
  "PCRnoNonZeroNumOrDenom",
  "PCRvalidateAtLeastOneNDRInDeviationOfMeasureSpec",
  "validateEqualQualifierDenominatorsOMS",
  "validateOneQualRateHigherThanOtherQualOMS",
  "validateEqualCategoryDenominatorsOMS",
  "validateOneQualRateHigherThanOtherQualPM",
  "ComplexValueSameCrossCategory",
  "validateFfsRadioButtonCompletion",
  "validateAtLeastOneDataSourceType",
  "validateDateRangeRadioButtonCompletion",
  "validateDeviationTextFieldFilled",
  "validateOPMRates",
  "validateHedisYear",
  "validateAtLeastOneDeliverySystem",
  "validateAtLeastOneDefinitionOfPopulation",
  "validateSameDenominatorSets",
  "validateHybridMeasurePopulation",
  "validateEqualQualifierOfCategoryDenominatorsOMS",
  "validateEqualQualifierOfCategoryDenominatorsPM",
  "validateCollecting",
] as const;

export type ValidationFunction = typeof validationFunctions[number];

export interface MeasureTemplateData {
  type: string;
  coreset: CoreSetKey;
  hybridMeasure?: boolean;
  performanceMeasure: DataDrivenTypes.PerformanceMeasure;
  dataSource?: DataDrivenTypes.DataSource;
  custom?: customData;
  opm?: {
    excludeOptions?: string[];
    componentFlag?: ComponentFlagType;
  };
  validations?: ValidationFunction[]; //TO DO: remove question mark (?) once refactoring is finished
  override?: {
    validateAtLeastOneDeviationFieldFilled?: Function;
    validateTotalNDR?: { categories: LabelData[]; errorMessage: boolean };
    validateEqualQualifierDenominatorsPM?: {
      category: boolean;
      errorMessage: boolean;
    };
    validateOneCatRateHigherThanOtherCatPM?: {
      increment: number;
    };
    validateDualPopInformationPM?: {
      dualPopInfoArray?: boolean;
      ageIndex: number;
      errorLabel?: string;
    };
    validateEqualCategoryDenominatorsPM?: {
      qualifiers?: LabelData[];
    };
    validateOneCatRateHigherThanOtherCatOMS?: {
      increment?: number;
    };
    validateOneQualRateHigherThanOtherQual?: {
      higherIndex?: number;
      lowerIndex?: number;
    };
    omsValidations?: {
      dataSource: boolean;
    };
  };
}
