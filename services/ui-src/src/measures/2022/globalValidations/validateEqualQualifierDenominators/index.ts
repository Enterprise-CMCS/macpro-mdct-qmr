import {
  OmsValidationCallback,
  FormRateField,
  UnifiedValFuncProps as UVFP,
} from "../types";
import { convertOmsDataToRateArray } from "../dataDrivenTools";

interface ValProps extends UVFP {
  locationFunc?: (qualifier: string) => string;
  errorMessageFunc?: (qualifier: string) => string;
}

const validateEqualQualifierDenominatorsErrorMessage = (qualifier: string) => {
  return `Denominators must be the same for each category of performance measures for ${qualifier}`;
};

const _validation = ({
  rateData,
  qualifiers,
  location,
  errorMessage,
  locationFunc,
  errorMessageFunc = validateEqualQualifierDenominatorsErrorMessage,
}: ValProps): FormError[] => {
  const errorArray: FormError[] = [];

  for (const [i, qual] of qualifiers!.entries()) {
    const denominators: (string | undefined)[] = [];
    for (const rateSet of rateData) {
      if (rateSet && rateSet[i] && rateSet[i].denominator) {
        denominators.push(rateSet[i].denominator);
      }
    }

    const error = !denominators.every((v) => !v || v === denominators[0]);
    if (error) {
      errorArray.push({
        errorLocation: locationFunc ? locationFunc(qual) : location,
        errorMessage: errorMessage ?? errorMessageFunc(qual),
      });
    }
  }

  return errorArray;
};

/**
 * All qualifiers need to have the same denominator
 */
export const validateEqualQualifierDenominatorsOMS: OmsValidationCallback = ({
  rateData,
  categories,
  qualifiers,
  label,
  locationDictionary,
  isOPM,
}) => {
  if (isOPM) return [];
  return _validation({
    qualifiers,
    location: "Optional Measure Stratification",
    locationFunc: (qual) =>
      `Optional Measure Stratification: ${locationDictionary([
        ...label,
        qual,
      ])}`,
    rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
    errorMessage: "Denominators must be the same for each category.",
  });
};

/**
 * All qualifiers need to have the same denominator
 */
export const validateEqualQualifierDenominatorsPM = (
  performanceMeasureArray: FormRateField[][],
  qualifiers: string[],
  explicitErrorMessage?: string,
  errorMessageFunc?: (qualifier: string) => string
) => {
  return _validation({
    location: "Performance Measure",
    errorMessage: explicitErrorMessage,
    qualifiers,
    rateData: performanceMeasureArray,
    errorMessageFunc,
  });
};
