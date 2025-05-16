import { ComponentFlagType } from "shared/commonQuestions/OptionalMeasureStrat/Shared/context";
import { DataDrivenTypes } from "./TypeDataDriven";

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
  coreset: string;
  hybridMeasure?: boolean;
  performanceMeasure: DataDrivenTypes.PerformanceMeasure;
  dataSource?: DataDrivenTypes.DataSource;
  custom?: customData;
  opm?: {
    excludeOptions?: string[];
    componentFlag?: ComponentFlagType;
  };
}
