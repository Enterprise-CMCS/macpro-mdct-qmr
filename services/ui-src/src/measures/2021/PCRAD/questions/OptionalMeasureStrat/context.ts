import { createContext, useContext } from "react";
import * as Types from "../../../CommonQuestions/types";

interface ContextProps {
  OPM?: Types.OtherRatesFields[];
  performanceMeasureArray?: Types.RateFields[][];
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  performanceMeasureDescriptions: string[];
  ageGroups: string[];
}

const PerformanceMeasureContext = createContext<ContextProps>({
  OPM: [],
  performanceMeasureArray: [[]],
  rateReadOnly: true,
  calcTotal: false,
  performanceMeasureDescriptions: [],
  ageGroups: [],
});

export const usePerformanceMeasureContext = () =>
  useContext(PerformanceMeasureContext);

export const PerformanceMeasureProvider = PerformanceMeasureContext.Provider;
