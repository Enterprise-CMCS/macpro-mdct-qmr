import { RateFields } from "../CommonQuestions/types";
import { Measure } from "../IETAD/validation/types";

export const omsValidations = (data: Measure.Form) => {
  console.log("numerator less than");
  validateNDRs(data, isNumeratorGreaterToDenominator);
  console.log("validate at least one");
  validateNDRs(data, isEmptyNDR);
  return [];
  //array of errors to print at bottom of screen
};

const isEmptyNDR = (
  ndr: RateFields,
  currentValidationValue?: boolean | null
): boolean => {
  if (!currentValidationValue) {
    return !ndr.denominator || !ndr.numerator || !ndr.rate;
  }

  return false;
};

const isNumeratorGreaterToDenominator = (
  ndr: RateFields,
  currentValidationValue?: boolean | null
): boolean => {
  if (currentValidationValue || currentValidationValue === null) {
    return parseFloat(ndr.numerator!) > parseFloat(ndr.denominator!);
  }

  return true;
};

const validateNDRs = (
  data: Measure.Form,
  cb: (ndr: RateFields, currentValidationValue?: boolean | null) => boolean
) => {
  const filledInRates: any = {};

  for (const selection of data.OptionalMeasureStratification.options) {
    filledInRates[selection] = null;
    const topLevelMap =
      data.OptionalMeasureStratification.selections[selection];
    for (const parentKey of Object.keys(
      data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
        ?.rates ?? {}
    )) {
      filledInRates[selection] = !cb(
        data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
          ?.rates?.[parentKey][0] ?? {},
        filledInRates[selection]
      );
    }

    for (const nestedSelection of topLevelMap.options ?? []) {
      const selections = topLevelMap?.selections;
      if (selections) {
        for (const subCat of selections[nestedSelection]
          ?.additionalSubCategories ?? []) {
          for (const key of Object.keys(subCat.ageRangeRates?.rates ?? {})) {
            filledInRates[selection] = !cb(
              subCat.ageRangeRates?.rates?.[key][0] ?? {},
              filledInRates[selection]
            );
          }
        }

        for (const key of Object.keys(
          selections[nestedSelection].ageRangeRates?.rates ?? {}
        )) {
          filledInRates[selection] = !cb(
            selections[nestedSelection].ageRangeRates?.rates?.[key][0] ?? {},
            filledInRates[selection]
          );
        }
      }
    }

    for (const additionalSelection of data.OptionalMeasureStratification
      .selections?.[selection].additionalSelections ?? []) {
      for (const key of Object.keys(
        additionalSelection.ageRangeRates?.rates ?? {}
      )) {
        filledInRates[selection] = !cb(
          additionalSelection.ageRangeRates?.rates?.[key][0] ?? {},
          filledInRates[selection]
        );
      }
    }
  }

  console.log({ filledInRates });
};
