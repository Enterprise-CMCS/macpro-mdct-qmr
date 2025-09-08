import { ComponentFlagType } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { DataDrivenTypes } from "./TypeDataDriven";
import { CoreSetKey } from "./GlobalTypes";

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
  validations: { common: string[]; pm: string[]; oms: string[] };
}
