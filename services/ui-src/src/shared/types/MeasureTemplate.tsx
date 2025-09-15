import { ComponentFlagType } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { DataDrivenTypes } from "./TypeDataDriven";
import { CoreSetKey } from "./GlobalTypes";
import * as GV from "shared/globalValidations";
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
  GV.validateRequiredRadioButtonForCombinedRates,
  GV.validateAtLeastOneDeviationFieldFilled,
  GV.validateRequiredRadioButtonForCombinedRates,
  GV.validateAtLeastOneDeviationFieldFilled,
  GV.validateReasonForNotReporting,
  GV.validateAtLeastOneDataSource,
  GV.validateBothDatesCompleted,
  GV.validateYearFormat,
  GV.validateAtLeastOneRateComplete,
  GV.validateRateZeroPM,
  GV.validateRateNotZeroPM,
  GV.validateNumeratorsLessThanDenominatorsPM,
  GV.validateOneQualDenomHigherThanOtherDenomPM,
  GV.validateRateZeroOMS,
  GV.validateRateNotZeroOMS,
  GV.validateNumeratorLessThanDenominatorOMS,
  GV.validateOneQualDenomHigherThanOtherDenomOMS,
  GV.validateOMSTotalNDR,
  GV.validateOneCatRateHigherThanOtherCatOMS,
  GV.validateTotalNDR,
  GV.validateEqualQualifierDenominatorsPM,
  GV.validateOneCatRateHigherThanOtherCatPM,
  GV.validateDualPopInformationPM,
  GV.validateEqualCategoryDenominatorsPM,
  GV.ComplexValidateDualPopInformation,
  GV.ComplexAtLeastOneRateComplete,
  GV.ComplexNoNonZeroNumOrDenom,
  GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec,
  GV.ComplexValidateNDRTotals,
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
    deviationFieldFilled?: Function;
    validateTotalNDR?: { category: boolean; errorMessage: boolean };
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
  };
}
