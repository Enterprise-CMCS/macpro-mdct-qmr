import { createContext, useContext } from "react";
import { Measure } from "../../validation/types";

interface ContextProps {
  OPM?: Measure.OtherRatesFields[];
  performanceMeasureArray?: Measure.RateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
}

const PerformanceMeasureContext = createContext<ContextProps>({
  OPM: [],
  performanceMeasureArray: [[]],
  rateReadOnly: true,
  calcTotal: false,
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
