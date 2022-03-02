import { OmsNodes as OMS } from "../CommonQuestions/types";
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
  _cb: (ndr: RateFields, currentValidationValue?: boolean | null) => boolean
) => {
  const filledInRates: any = {};
  // const errorArray: any = [];

  // validates top levels, ex: Race, Geography, Sex
  const validateTopLevelNode = (node: OMS.TopLevelOmsNode, label: string) => {
    // validate children if exist
    if (node.options?.length) {
      for (const option of node.options) {
        validateChildNodes(node.selections?.[option] ?? {}, label);
      }
    }

    // validate for additionals category
    for (const addtnl of node.additionalSelections ?? []) {
      validateChildNodes(addtnl, label);
    }

    // ACA validate
    if (node.ageRangeRates) {
      validateNodeRates(node.ageRangeRates, label);
    }
  };

  // validate mid level, ex: White, African American, etc
  const validateChildNodes = (node: OMS.MidLevelOMSNode, label: string) => {
    // validate sub categories
    if (node.additionalSubCategories?.length) {
      for (const subCat of node.additionalSubCategories) {
        validateChildNodes(subCat, label);
      }
    }

    // validate sub type, ex: Asian -> Korean, Chinese, etc
    if (node.aggregate?.includes("No")) {
      for (const key of node.options ?? []) {
        validateChildNodes(node.selections?.[key] ?? {}, label);
      }
    }

    //validate rates
    if (node.ageRangeRates) {
      validateNodeRates(node.ageRangeRates, label);
    }
  };

  // Rate containers to be validated
  const validateNodeRates = (
    ageRangeRates: OMS.OmsRateFields,
    label: string
  ) => {
    //TODO: apply callback function, push error to array
    filledInRates[label] = "stuff";
    console.log("node rates", label, ageRangeRates);
  };

  // Loop through top level nodes for validation
  for (const key of data.OptionalMeasureStratification.options) {
    validateTopLevelNode(
      data.OptionalMeasureStratification.selections?.[key] ?? {},
      key
    );
  }

  // for (const selection of data.OptionalMeasureStratification.options) {
  //   filledInRates[selection] = null;
  //   const topLevelMap =
  //     data.OptionalMeasureStratification.selections[selection];

  //   //Adult Eligibility ACA
  //   for (const parentKey of Object.keys(
  //     data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
  //       ?.rates ?? {}
  //   )) {
  //     filledInRates[selection] = !cb(
  //       data.OptionalMeasureStratification?.selections[selection]?.ageRangeRates
  //         ?.rates?.[parentKey][0] ?? {},
  //       filledInRates[selection]
  //     );
  //   }

  //   // SubCategories
  //   for (const nestedSelection of topLevelMap.options ?? []) {
  //     const selections = topLevelMap?.selections;
  //     if (selections) {
  //       for (const subCat of selections[nestedSelection]
  //         ?.additionalSubCategories ?? []) {
  //         for (const key of Object.keys(subCat.ageRangeRates?.rates ?? {})) {
  //           filledInRates[selection] = !cb(
  //             subCat.ageRangeRates?.rates?.[key][0] ?? {},
  //             filledInRates[selection]
  //           );
  //         }
  //       }

  //       for (const deepNestedSelection of Object.keys(
  //         selections[nestedSelection]?.selections ?? {}
  //       )) {
  //         for (const key of Object.keys(
  //           selections[nestedSelection]?.selections![deepNestedSelection]
  //             .ageRangeRates?.rates ?? {}
  //         )) {
  //           filledInRates[selection] = !cb(
  //             selections[nestedSelection]?.selections![deepNestedSelection]
  //               .ageRangeRates?.rates![key][0] ?? {},
  //             filledInRates[selection]
  //           );
  //         }
  //       }

  //       // Regular Selections
  //       for (const key of Object.keys(
  //         selections[nestedSelection].ageRangeRates?.rates ?? {}
  //       )) {
  //         filledInRates[selection] = !cb(
  //           selections[nestedSelection].ageRangeRates?.rates?.[key][0] ?? {},
  //           filledInRates[selection]
  //         );
  //       }
  //     }
  //   }

  //   // Aditional Selections
  //   for (const additionalSelection of data.OptionalMeasureStratification
  //     .selections?.[selection].additionalSelections ?? []) {
  //     for (const key of Object.keys(
  //       additionalSelection.ageRangeRates?.rates ?? {}
  //     )) {
  //       filledInRates[selection] = !cb(
  //         additionalSelection.ageRangeRates?.rates?.[key][0] ?? {},
  //         filledInRates[selection]
  //       );
  //     }
  //   }
  // }

  console.log("filledInRates", filledInRates);
};
