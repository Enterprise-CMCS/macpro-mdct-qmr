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

interface ValidationOptions {
  errorMessage?: string;
  qualId?: string;
  otherQualIds?: string[];
}

interface ValProps extends UVFP {
  qualId?: string;
  otherQualIds?: string[];
}

const getQualifierIdFromUid = (uid?: string) => {
  if (!uid) return undefined;
  const segments = uid.split(".");
  return segments.at(-1) ?? uid;
};

const findRateFieldByQualifier = (
  ratefields: UVFP["rateData"][number],
  qualId?: string
) => {
  if (qualId) {
    const matchedField = ratefields.find(
      (ratefield) =>
        ratefield?.uid === qualId ||
        getQualifierIdFromUid(ratefield?.uid) === qualId
    );

    if (matchedField) return matchedField;
  }

  return undefined;
};

const findRateFieldsByQualifiers = (
  ratefields: UVFP["rateData"][number],
  qualIds: string[] = []
) => {
  if (qualIds.length > 0) {
    const matchedFields = qualIds
      .map((qualId) => findRateFieldByQualifier(ratefields, qualId))
      .filter(
        (
          ratefield
        ): ratefield is NonNullable<UVFP["rateData"][number][number]> =>
          ratefield != null
      );

    if (matchedFields.length > 0) return matchedFields;
  }

  return [];
};

const _validation = ({
  location,
  rateData,
  qualId,
  otherQualIds = [],
  errorMessage = DEFAULT_ERROR_MESSAGE,
}: ValProps) => {
  const errorArray: FormError[] = [];
  if (qualId === undefined || otherQualIds.length === 0) return errorArray;

  for (const ratefields of rateData) {
    if (!ratefields?.length) continue;

    const qualRateField = findRateFieldByQualifier(ratefields, qualId);
    if (!qualRateField) continue;

    const qualRate = parseFloat(qualRateField.rate ?? "");
    if (Number.isNaN(qualRate)) continue;

    const otherRateFields = findRateFieldsByQualifiers(
      ratefields,
      otherQualIds
    );
    if (otherRateFields.length === 0) continue;

    const hasLowerOtherRate = otherRateFields.some((otherRateField) => {
      const otherRate = parseFloat(otherRateField.rate ?? "");
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

export const validateOneQualRateLessThanOrEqualToOtherQualRatesOMS = ({
  errorMessage,
  qualId,
  otherQualIds = [],
}: ValidationOptions = {}): OmsValidationCallback => {
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
      qualId,
      otherQualIds,
      rateData: convertOmsDataToRateArray(categories, qualifiers, rateData),
      errorMessage,
    });
  };
};

export const validateOneQualRateLessThanOrEqualToOtherQualRatesPM = (
  data: Types.PerformanceMeasure,
  performanceMeasureData: Types.DataDrivenTypes.PerformanceMeasure,
  { errorMessage, qualId, otherQualIds = [] }: ValidationOptions = {}
) => {
  const perfMeasure = getPerfMeasureRateArray(data, performanceMeasureData);
  return _validation({
    qualifiers: performanceMeasureData.qualifiers,
    qualId,
    otherQualIds,
    rateData: perfMeasure,
    location: "Rate",
    errorMessage,
  });
};
