import { LabelData } from "utils";
import { ndrFormula } from "types";

export interface Props {
  data: PerformanceMeasureData;
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  rateScale?: number;
  customMask?: RegExp;
  hybridMeasure?: boolean;
  showtextbox?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  RateComponent?: RateComp;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

export interface NdrSetProps {
  categories?: LabelData[];
  qualifiers?: LabelData[];
  measureName?: string;
  inputFieldNames?: LabelData[];
  ndrFormulas?: ndrFormula[];
  rateReadOnly: boolean;
  calcTotal: boolean;
  rateScale?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
  RateComponent: RateComp;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

export interface PerformanceMeasureData {
  qualifiers?: LabelData[]; // age ranges, etc
  categories?: LabelData[]; //performance measure descriptions
  measureName?: string;
  inputFieldNames?: LabelData[];
  ndrFormulas?: ndrFormula[];
  customPrompt?: string; // Default: "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
  questionText?: string[];
  questionListItems?: string[];
  questionListOrderedItems?: string[];
  questionListTitles?: string[];
  questionSubtext?: string[];
  questionSubtextTitles?: string[];
}
