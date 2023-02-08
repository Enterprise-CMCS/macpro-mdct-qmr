import { OmsNodes as OMS } from "measures/2022/CommonQuestions/types";

export interface FormRateField {
  denominator?: string;
  numerator?: string;
  label?: string;
  rate?: string;
  isTotal?: string;
}

export type locationDictionaryFunction = (labels: string[]) => string;

export interface RateData extends OMS.OmsRateFields {
  "pcr-rate"?: { id?: number; value?: string; label?: string }[];
  "iuhh-rate"?: any;
  "aifhh-rate"?: any;
}

export interface UnifiedValFuncProps {
  categories?: string[];
  qualifiers?: string[];
  rateData: FormRateField[][];
  location: string;
  errorMessage?: string;
}

export type UnifiedValidationFunction = (
  props: UnifiedValFuncProps
) => FormError[];

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
