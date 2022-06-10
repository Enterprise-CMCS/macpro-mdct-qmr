import { createContext, useContext } from "react";
import * as Types from "../types";

export type CompFlagType = "DEFAULT" | "IU" | "PCR" | "AIF";

interface ContextProps {
  OPM?: Types.OtherRatesFields[];
  performanceMeasureArray?: Types.RateFields[][];
  IUHHPerformanceMeasureArray?: Types.IUHHRateFields[][];
  AIFHHPerformanceMeasureArray?: Types.AIFHHRateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  categories: string[];
  qualifiers: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
  numberOfDecimals: number;
  compFlag?: CompFlagType;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
}

const PerformanceMeasureContext = createContext<ContextProps>({
  OPM: [],
  performanceMeasureArray: [[]],
  rateReadOnly: true,
  calcTotal: false,
  categories: [],
  qualifiers: [],
  rateMultiplicationValue: undefined,
  customMask: undefined,
  allowNumeratorGreaterThanDenominator: false,
  numberOfDecimals: 1,
  compFlag: "DEFAULT",
  customNumeratorLabel: "Numerator",
  customDenominatorLabel: "Denominator",
  customRateLabel: "Rate",
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
