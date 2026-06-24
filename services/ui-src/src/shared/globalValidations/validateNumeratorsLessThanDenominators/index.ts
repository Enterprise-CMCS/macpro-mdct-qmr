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

interface ValProps extends UVFP {
  locationFunc?: (qualifier: string) => string;
  useRateLabelForQualifier?: boolean;
}

const _validation = ({
  location,
  rateData,
  errorMessage,
  locationFunc,
  qualifiers,
}: ValProps) => {
  const errorArray: FormError[] = [];

  for (const fieldSet of rateData) {
    for (const [i, rate] of fieldSet.entries()) {
      if (
        rate.numerator &&
        rate.denominator &&
        parseFloat(rate.denominator) < parseFloat(rate.numerator)
      ) {
        const qualifierLabel = rate.label ?? qualifiers?.[i]?.label ?? "";
        errorArray.push({
          errorLocation: locationFunc ? locationFunc(qualifierLabel) : location,
          errorMessage: errorMessage!,
        });
      }
    }
  }

  return errorArray;
};

/**
 * Validated OMS sections for numerator being less than denominator
 */
export const validateNumeratorLessThanDenominatorOMS =
  (
    errorMessage?: string,
    useRateLabelForQualifier?: boolean
  ): OmsValidationCallback =>
  ({ categories, qualifiers, rateData, label, locationDictionary }) => {
    return _validation({
      location: "Optional Measure Stratification",
      categories,
      qualifiers,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      locationFunc: (q) =>
        `Optional Measure Stratification: ${locationDictionary([...label, q])}`,
      errorMessage:
        errorMessage ??
        "Numerator cannot be greater than the Denominator for NDR sets.",
      useRateLabelForQualifier,
    });
  };

/**
 * Checks both performance measure and other performance measure for numerator greater than denominator errors
 */
export const validateNumeratorsLessThanDenominatorsPM = (
  performanceMeasureArray: FormRateField[][],
  OPM: any,
  qualifiers: LabelData[],
  errorMessage?: string,
  useRateLabelForQualifier?: boolean
) => {
  const location = `Performance Measure/Other Performance Measure`;
  const rateDataOPM = getOtherPerformanceMeasureRateArray(OPM);
  errorMessage =
    errorMessage ??
    `Numerators must be less than Denominators for all applicable performance measures`;
  const errorArray: FormError[] = [
    ..._validation({
      location,
      qualifiers,
      rateData: performanceMeasureArray,
      errorMessage,
      useRateLabelForQualifier,
    }),
    ..._validation({
      location,
      qualifiers,
      rateData: rateDataOPM,
      errorMessage,
      useRateLabelForQualifier,
    }),
  ];

  return errorArray.length > 0 ? [errorArray[0]] : [];
};
