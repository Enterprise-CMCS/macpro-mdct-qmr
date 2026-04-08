import * as Types from "shared/types";
import {
  OmsValidationCallback,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  getPerfMeasureRateArray,
  convertOmsDataToRateArray,
} from "../dataDrivenTools";

interface ValProps extends UVFP {
  qualIndex: number;
  otherQualIndices: number[];
}

const _validation = ({
  location,
  qualifiers = [],
  rateData,
  qualIndex,
  otherQualIndices,
}: ValProps) => {
  const errorArray: FormError[] = [];
  const maxOtherIndex = Math.max(...otherQualIndices);

  for (const ratefields of rateData) {
    if (!ratefields || ratefields.length <= maxOtherIndex) continue;

    const qualRate = parseFloat(ratefields[qualIndex]?.rate ?? "");
    if (Number.isNaN(qualRate)) continue;

    const failingLabels: string[] = [];
    for (const idx of otherQualIndices) {
      const otherRate = parseFloat(ratefields[idx]?.rate ?? "");
      if (!Number.isNaN(otherRate) && qualRate > otherRate) {
        failingLabels.push(qualifiers[idx]?.label ?? "");
      }
    }

    if (failingLabels.length > 0) {
      const errorMessage = `Combination rate cannot be greater than Influence of ${failingLabels.join(
        " and "
      )} rates`;
      errorArray.push({
        errorLocation: location,
        errorMessage,
      });
    }
  }

  return errorArray;
};

export const validateOneQualRateLessThanOrEqualToOtherQualRatesOMS = (
  qualIndex = 2,
  otherQualIndices = [0, 1]
): OmsValidationCallback => {
  return ({
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
      location: `Optional Measure Stratification: ${locationDictionary(label)}`,
      qualIndex,
      otherQualIndices,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
    });
  };
};

export const validateOneQualRateLessThanOrEqualToOtherQualRatesPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  qualIndex = 2,
  otherQualIndices = [0, 1]
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  return _validation({
    qualifiers: performanceMeasureData.qualifiers,
    qualIndex,
    otherQualIndices,
    rateData: perfMeasure,
    location: "Rate",
  });
};