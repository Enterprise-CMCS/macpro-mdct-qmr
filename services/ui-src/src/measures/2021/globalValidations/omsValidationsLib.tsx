import { RateFields } from "../CommonQuestions/types";
import { Measure } from "../IETAD/validation/types";

export const omsValidations = (data: Measure.Form) => {
  console.log("numerator less than");
  validateAtLeastOneNdr(data, isNumeratorGreaterToDenominator);
  console.log("validate at least one");
  validateAtLeastOneNdr(data, isEmptyNDR);
  // validateNumeratorLessThanOrEqualDenominator(data);
  return [];
  //array of errors to print at bottom of screen
};

const isEmptyNDR = (
  ndr: RateFields,
  currentValidationValue?: boolean | null
): boolean => {
  console.log({ ndr });
  if (currentValidationValue) {
    return !ndr.denominator || !ndr.numerator || !ndr.rate;
  }

  return false;
};

const isNumeratorGreaterToDenominator = (ndr: RateFields): boolean => {
  return parseFloat(ndr.numerator!) > parseFloat(ndr.denominator!);
};

const validateAtLeastOneNdr = (
  data: Measure.Form,
  cb: (ndr: RateFields) => boolean
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
          ?.rates?.[parentKey][0] ?? {}
      );
    }

    for (const nestedSelection of topLevelMap.options ?? []) {
      const selections = topLevelMap?.selections;
      if (selections) {
        for (const subCat of selections[nestedSelection]
          ?.additionalSubCategories ?? []) {
          for (const key of Object.keys(subCat.ageRangeRates?.rates ?? {})) {
            filledInRates[selection] = !cb(
              subCat.ageRangeRates?.rates?.[key][0] ?? {}
            );
          }
        }

        for (const key of Object.keys(
          selections[nestedSelection].ageRangeRates?.rates ?? {}
        )) {
          filledInRates[selection] = !cb(
            selections[nestedSelection].ageRangeRates?.rates?.[key][0] ?? {}
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
          additionalSelection.ageRangeRates?.rates?.[key][0] ?? {}
        );
      }
    }
  }

  console.log({ filledInRates });
};

// const validateNumeratorLessThanOrEqualDenominator = (data: Measure.Form) => {
//   const filledInRates: any = {};

//   for (const selection of data.OptionalMeasureStratification.options) {
//     const topLevelMap =
//       data.OptionalMeasureStratification.selections[selection];
//     for (const parentKey of Object.keys(
//       data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
//         ?.rates ?? {}
//     )) {
//       const ndr =
//         data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
//           ?.rates?.[parentKey][0];

//       if (!filledInRates[selection] && ndr?.denominator && ndr.numerator) {
//         filledInRates[selection] = isNumeratorGreaterToDenominator(ndr ?? {});
//       }
//     }

//     for (const nestedSelection of topLevelMap.options ?? []) {
//       const selections = topLevelMap?.selections;
//       if (selections && !filledInRates[selection]) {
//         for (const subCat of selections[nestedSelection]
//           ?.additionalSubCategories ?? []) {
//           for (const key of Object.keys(subCat.ageRangeRates?.rates ?? {})) {
//             const ndr = subCat.ageRangeRates?.rates?.[key][0];
//             if (
//               !filledInRates[selection] &&
//               ndr?.denominator &&
//               ndr.numerator
//             ) {
//               filledInRates[selection] = isNumeratorGreaterToDenominator(
//                 ndr ?? {}
//               );
//             }
//           }
//         }

//         for (const key of Object.keys(
//           selections[nestedSelection].ageRangeRates?.rates ?? {}
//         )) {
//           const ndr =
//             selections[nestedSelection].ageRangeRates?.rates?.[key][0];
//           if (!filledInRates[selection] && ndr?.denominator && ndr.numerator) {
//             filledInRates[selection] = isNumeratorGreaterToDenominator(
//               ndr ?? {}
//             );
//           }
//         }
//       }
//     }

//     for (const additionalSelection of data.OptionalMeasureStratification
//       .selections?.[selection].additionalSelections ?? []) {
//       for (const key of Object.keys(
//         additionalSelection.ageRangeRates?.rates ?? {}
//       )) {
//         const ndr = additionalSelection.ageRangeRates?.rates?.[key][0];
//         if (!filledInRates[selection] && ndr?.denominator && ndr.numerator) {
//           filledInRates[selection] = isNumeratorGreaterToDenominator(ndr ?? {});
//         }
//       }
//     }
//   }

//   console.log({ filledInRates });
// };
