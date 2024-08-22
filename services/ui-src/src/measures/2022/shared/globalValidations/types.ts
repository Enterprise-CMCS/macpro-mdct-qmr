import { OmsNodes as OMS } from "measures/2022/shared/CommonQuestions/types";
import { LabelData } from "utils";

export interface FormRateField {
  denominator?: string;
  numerator?: string;
  label?: string;
  rate?: string;
  category?: string;
  isTotal?: boolean;
}

export type locationDictionaryFunction = (labels: string[]) => string;

export interface RateData extends OMS.OmsRateFields {
  "pcr-rate"?: { id?: number; value?: string; label?: string }[];
  "iuhh-rate"?: any;
  "aifhh-rate"?: any;
}

export interface UnifiedValFuncProps {
  categories?: LabelData[];
  qualifiers?: LabelData[];
  rateData: FormRateField[][];
  location: string;
  errorMessage?: string;
}

export type UnifiedValidationFunction = (
  props: UnifiedValFuncProps
) => FormError[];

export type OmsValidationCallback = (data: {
  rateData: RateData;
  qualifiers: LabelData[];
  categories: LabelData[];
  label: string[];
  locationDictionary: locationDictionaryFunction;
  isOPM: boolean;
  customTotalLabel?: string;
  dataSource?: string[];
}) => FormError[];
