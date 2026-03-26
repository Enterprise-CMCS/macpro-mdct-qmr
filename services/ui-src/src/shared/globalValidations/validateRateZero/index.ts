import * as DC from "dataConstants";
import {
  OmsValidationCallback,
  FormRateField,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  convertOmsDataToRateArray,
  getOtherPerformanceMeasureRateArray,
} from "../dataDrivenTools";
import { LabelData } from "utils";
import { DefaultFormDataLegacy, DefaultFormData } from "shared/types/FormData";

interface ValProps extends UVFP {
  hybridData?: boolean;
}

export const validationRateZero = ({
  location,
  rateData,
  hybridData,
  errorMessage,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const ratefields of rateData) {
    for (const rate of ratefields) {
      if (
        rate &&
        rate.denominator &&
        rate.numerator &&
        rate.rate &&
        parseFloat(rate.numerator) === 0 &&
        parseFloat(rate.denominator) > 0 &&
        parseFloat(rate.rate) !== 0 &&
        !hybridData
      ) {
        errorArray.push({
          errorLocation: location,
          errorMessage:
            errorMessage ??
            "Manually entered rate should be 0 if numerator is 0",
        });
      }
    }
  }

  return errorArray;
};

export const validateRateZeroOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({
    categories,
    qualifiers,
    rateData,
    label,
    locationDictionary,
    dataSource,
  }) => {
    const hybridData = dataSource?.includes(
      DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
    );
    return validationRateZero({
      categories,
      qualifiers,
      hybridData,
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage,
    }).filter((v, i, a) => i === 0 || a[0].errorLocation !== v.errorLocation);
  };

// If a user manually over-rides a rate it must not violate two rules:
// It must be zero if the numerator is zero
export const validateRateZeroPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  _qualifiers: LabelData[],
  data: DefaultFormDataLegacy | DefaultFormData,
  errorMessage?: string
): FormError[] => {
  const errorArray: FormError[] = [];
  const hybridData = data?.[DC.DATA_SOURCE]?.includes(
    DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA
  );
  const location = `Performance Measure/Other Performance Measure`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);

  const errors = [
    ...validationRateZero({
      location,
      rateData: performanceMeasureArray,
      hybridData,
      errorMessage,
    }),
    ...validationRateZero({
      location,
      rateData: rateDataOPM,
      hybridData,
      errorMessage,
    }),
  ];

  if (errors.length > 0) errorArray.push(errors[0]);
  return errorArray;
};
