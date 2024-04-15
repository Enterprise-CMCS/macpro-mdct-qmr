import { LabelData } from "utils";
import { ndrFormula } from "types";
import { PerformanceMeasureData } from "measures/2024/shared/CommonQuestions/PerformanceMeasure/data";

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
