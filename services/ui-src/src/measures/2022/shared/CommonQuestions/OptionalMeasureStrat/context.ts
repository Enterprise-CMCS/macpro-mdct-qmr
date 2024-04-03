import { createContext, useContext } from "react";
import * as Types from "../types";
import { ndrFormula } from "types";

export type ComponentFlagType = "DEFAULT" | "AIF" | "IU" | "PCR";

interface ContextProps {
  OPM?: Types.OtherRatesFields[];
  performanceMeasureArray?: Types.RateFields[][];
  IUHHPerformanceMeasureArray?: Types.complexRateFields[][];
  AIFHHPerformanceMeasureArray?: Types.complexRateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  categories: string[];
  qualifiers: string[];
  measureName?: string;
  inputFieldNames?: string[];
  ndrFormulas?: ndrFormula[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
  numberOfDecimals: number;
  componentFlag?: ComponentFlagType;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  customPrompt?: string;
  rateCalculation?: RateFormula;
}

const PerformanceMeasureContext = createContext<ContextProps>({
  OPM: [],
  performanceMeasureArray: [[]],
  rateReadOnly: true,
  calcTotal: false,
  categories: [],
  qualifiers: [],
  measureName: "",
  inputFieldNames: [],
  ndrFormulas: [],
  rateMultiplicationValue: undefined,
  customMask: undefined,
  allowNumeratorGreaterThanDenominator: false,
  numberOfDecimals: 1,
  componentFlag: "DEFAULT",
  customNumeratorLabel: "Numerator",
  customDenominatorLabel: "Denominator",
  customRateLabel: "Rate",
  customPrompt: undefined,
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
