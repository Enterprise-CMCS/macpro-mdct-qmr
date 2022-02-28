import { Measure } from "../IETAD/validation/types";

export const omsValidations = (data: Measure.Form) => {
  validateAtLeastOneNdr(data);
  return [];
  //array of errors to print at bottom of screen
};

const isEmptyNDR = (ndr: any): boolean => {
  console.log({ ndr });
  return !ndr.denominator || !ndr.numerator || !ndr.rate;
};

const validateAtLeastOneNdr = (data: Measure.Form) => {
  const filledInRates: any = {};

  for (const selection of data.OptionalMeasureStratification.options) {
    filledInRates[selection] = false;
    const topLevelMap =
      data.OptionalMeasureStratification.selections[selection];
    for (const parentKey of Object.keys(
      data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
        ?.rates ?? {}
    )) {
      if (!filledInRates[selection]) {
        filledInRates[selection] = !isEmptyNDR(
          data.OptionalMeasureStratification?.selections[selection]
            ?.ageRangeRates?.rates?.[parentKey][0] ?? {}

          // additionalSelection.ageRangeRates?.rates?.[key][0] ?? {}
        );
      }
    }

    for (const nestedSelection of topLevelMap.options ?? []) {
      const selections = topLevelMap?.selections;
      filledInRates[selection] = false;
      if (selections && !filledInRates[selection]) {
        for (const subCat of selections[nestedSelection]
          ?.additionalSubCategories ?? []) {
          for (const key of Object.keys(subCat.ageRangeRates?.rates ?? {})) {
            if (!filledInRates[selection]) {
              filledInRates[selection] = !isEmptyNDR(
                subCat.ageRangeRates?.rates?.[key][0] ?? {}
              );
            }
          }
        }

        for (const key of Object.keys(
          selections[nestedSelection].ageRangeRates?.rates ?? {}
        )) {
          if (!filledInRates[selection]) {
            filledInRates[selection] = !isEmptyNDR(
              selections[nestedSelection].ageRangeRates?.rates?.[key][0] ?? {}
            );
          }
        }
      }
    }

    for (const additionalSelection of data.OptionalMeasureStratification
      .selections?.[selection].additionalSelections ?? []) {
      for (const key of Object.keys(
        additionalSelection.ageRangeRates?.rates ?? {}
      )) {
        if (!filledInRates[selection]) {
          filledInRates[selection] = !isEmptyNDR(
            additionalSelection.ageRangeRates?.rates?.[key][0] ?? {}
          );
        }
      }
    }
  }

  console.log({ filledInRates });
};
