import { OmsNodes as OMS } from "measures/CommonQuestions/types";

export interface FormRateField {
  denominator?: string;
  numerator?: string;
  label?: string;
  rate?: string;
  isTotal?: string;
}

export type locationDictionaryFunction = (labels: string[]) => string;

export interface RateData extends OMS.OmsRateFields {
  "pcrad-rate"?: { id?: number; value?: string; label?: string }[];
}

export type OmsValidationCallback = (data: {
  rateData: RateData;
  qualifiers: string[];
  categories: string[];
  label: string[];
  locationDictionary: locationDictionaryFunction;
  isOPM: boolean;
  customTotalLabel?: string;
  dataSource?: string[];
}) => FormError[];
