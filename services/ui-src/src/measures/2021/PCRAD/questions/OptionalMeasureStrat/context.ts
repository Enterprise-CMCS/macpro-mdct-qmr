import { createContext, useContext } from "react";
import * as Types from "../../../../CommonQuestions/types";

interface ContextProps {
  OPM?: Types.OtherRatesFields[];
  performanceMeasureArray?: Types.RateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  categories: string[];
  qualifiers: string[];
  rateMultiplicationValue?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
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
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
