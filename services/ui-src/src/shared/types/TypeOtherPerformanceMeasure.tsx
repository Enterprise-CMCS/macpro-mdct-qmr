import * as DC from "dataConstants";
import { OtherRatesFields } from "./TypeRateFields";

export interface OtherPerformanceMeasure {
  [DC.OPM_EXPLAINATION]: string;
  [DC.OPM_RATES]: OtherRatesFields[];
  [DC.OPM_NOTES]: string;
  [DC.OPM_NOTES_TEXT_INPUT]: string;
  [DC.OPM_HYBRID_EXPLANATION]?: string;
}
