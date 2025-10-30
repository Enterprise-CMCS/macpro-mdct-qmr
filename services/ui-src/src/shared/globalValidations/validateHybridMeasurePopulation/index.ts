import {
  CASE_MANAGEMENT_RECORD_REVIEW_DATA,
  HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA,
} from "dataConstants";
import { FormError } from "error";
import { DefaultFormData } from "shared/types/FormData";

export const validateHybridMeasurePopulation = (
  data: DefaultFormData,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (
    data.DataSource?.includes(HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA) ||
    data.DataSource?.includes(CASE_MANAGEMENT_RECORD_REVIEW_DATA)
  ) {
    if (!data.HybridMeasurePopulationIncluded) {
      errorArray.push({
        errorLocation: "Definition of Population",
        errorMessage:
          errorMessage ?? "Size of the measure-eligible population is required",
      });
    }
  }
  return errorArray;
};
