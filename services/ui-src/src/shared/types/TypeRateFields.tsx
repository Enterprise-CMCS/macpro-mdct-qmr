import * as DC from "dataConstants";

export interface RateFields {
  [DC.LABEL]?: string;
  [DC.NUMERATOR]?: string;
  [DC.DENOMINATOR]?: string;
  [DC.RATE]?: string;
  [DC.UID]?: string;
}

export interface complexRateFields {
  [DC.LABEL]?: string;
  [DC.UID]?: string;
  fields?: { [DC.LABEL]?: string; value: string | undefined }[];
}

export interface OtherRatesFields {
  [DC.DESCRIPTION]?: string;
  [DC.RATE]?: RateFields[];
}
