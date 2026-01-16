import * as DC from "dataConstants";

export interface CombinedRates {
  [DC.COMBINED_RATES]?: typeof DC.YES | typeof DC.NO; // if the user combined rates from multiple reporting units
  [DC.COMBINED_RATES_COMBINED_RATES]?: // if YES in COMBINED_RATES-> the reporting units they combined
    | typeof DC.COMBINED_NOT_WEIGHTED_RATES
    | typeof DC.COMBINED_WEIGHTED_RATES
    | typeof DC.COMBINED_WEIGHTED_RATES_OTHER;
  [DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION]?: string; // if the user selected COMBINED_WEIGHTED_RATES_OTHER -> the explaination of the other weighing factor
}
