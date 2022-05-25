import { createContext, useContext } from "react";
import * as Types from "../types";

export type CompFlagType = "DEFAULT" | "IU" | "PCR";

interface ContextProps {
  OPM?: Types.OtherRatesFields[];
  performanceMeasureArray?: Types.RateFields[][];
  IUHHPerformanceMeasureArray?: Types.IUHHRateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  categories: string[];
  qualifiers: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
  numberOfDecimals: number;
  compFlag?: CompFlagType;
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
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
