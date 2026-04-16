import * as Types from "shared/types";
import {
  OmsValidationCallback,
  UnifiedValFuncProps as UVFP,
} from "../../types/TypeValidations";
import {
  getPerfMeasureRateArray,
  convertOmsDataToRateArray,
} from "../dataDrivenTools";

const DEFAULT_ERROR_MESSAGE =
  "Combination rate cannot be greater than the Influenza or Tdap rates";

interface ValProps extends UVFP {
  qualIndex?: number;
  otherQualIndices: number[];
}

const resolveQualifierIndex = (
  qualifiers: UVFP["qualifiers"],
  qualId?: string,
  qualIndex?: number
) => {
  if (qualId && qualifiers?.length) {
    const index = qualifiers.findIndex((qualifier) => qualifier.id === qualId);
    if (index !== -1) return index;
  }

  return qualIndex;
};

const resolveQualifierIndices = (
  qualifiers: UVFP["qualifiers"],
  qualIds?: string[],
  qualIndices: number[] = []
) => {
  if (qualIds?.length && qualifiers?.length) {
    const indices = qualIds
      .map((qualId) =>
        qualifiers.findIndex((qualifier) => qualifier.id === qualId)
      )
      .filter((index) => index !== -1);

    if (indices.length > 0) return indices;
  }

  return qualIndices;
};

const _validation = ({
  location,
  rateData,
  qualIndex,
  otherQualIndices,
  errorMessage = DEFAULT_ERROR_MESSAGE,
}: ValProps) => {
  const errorArray: FormError[] = [];
  if (qualIndex === undefined || otherQualIndices.length === 0)
    return errorArray;

  const maxOtherIndex = Math.max(...otherQualIndices);

  for (const ratefields of rateData) {
    if (!ratefields || ratefields.length <= maxOtherIndex) continue;

    const qualRate = parseFloat(ratefields[qualIndex]?.rate ?? "");
    if (Number.isNaN(qualRate)) continue;

    const hasLowerOtherRate = otherQualIndices.some((idx) => {
      const otherRate = parseFloat(ratefields[idx]?.rate ?? "");
      return !Number.isNaN(otherRate) && qualRate > otherRate;
    });

    if (hasLowerOtherRate) {
      errorArray.push({
        errorLocation: location,
        errorMessage: `${errorMessage}`,
      });
    }
  }

  return errorArray;
};

export const validateOneQualRateLessThanOrEqualToOtherQualRatesOMS = (
  qualIndex = 2,
  otherQualIndices = [0, 1],
  errorMessage?: string,
  qualId?: string,
  otherQualIds?: string[]
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
      qualIndex: resolveQualifierIndex(qualifiers, qualId, qualIndex),
      otherQualIndices: resolveQualifierIndices(
        qualifiers,
        otherQualIds,
        otherQualIndices
      ),
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage,
    });
  };
};

export const validateOneQualRateLessThanOrEqualToOtherQualRatesPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  qualIndex = 2,
  otherQualIndices = [0, 1],
  errorMessage?: string,
  qualId?: string,
  otherQualIds?: string[]
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  return _validation({
    qualifiers: performanceMeasureData.qualifiers,
    qualIndex: resolveQualifierIndex(
      performanceMeasureData.qualifiers,
      qualId,
      qualIndex
    ),
    otherQualIndices: resolveQualifierIndices(
      performanceMeasureData.qualifiers,
      otherQualIds,
      otherQualIndices
    ),
    rateData: perfMeasure,
    location: "Rate",
    errorMessage,
  });
};
