import { OmsNodes as OMS } from "../CommonQuestions/types";
import { DefaulFormData } from "../CommonQuestions/types";

type OmsValidationCallback = (data: {
  rateData: OMS.OmsRateFields;
  qualifiers: string[];
  categories: string[];
  label: string;
  locationDictionary: { [key: string]: string };
}) => FormError[];

const cleanString = (s: string) => s.replace(/[^\w]/g, "");

export const omsValidations = (
  data: DefaulFormData,
  qualifiers: string[],
  categories: string[],
  locationDictionary: { [key: string]: string }
) => {
  return validateNDRs(
    data,
    [validateDenominatorGreaterThanNumerator],
    qualifiers,
    categories,
    locationDictionary
  );
};

// const isEmptyNDR = (
//   ndr: RateFields,
//   currentValidationValue?: boolean | null
// ): boolean => {
//   if (!currentValidationValue) {
//     return !ndr.denominator || !ndr.numerator || !ndr.rate;
//   }

//   return false;
// };

const validateDenominatorGreaterThanNumerator: OmsValidationCallback = ({
  categories,
  qualifiers,
  rateData,
  label,
  locationDictionary,
}) => {
  const error: FormError[] = [];
  for (const qual of qualifiers.map((s) => cleanString(s))) {
    for (const cat of categories.map((s) => cleanString(s))) {
      if (rateData.rates?.[qual]?.[cat]) {
        const temp = rateData.rates[qual][cat][0];
        if (temp.denominator && temp.numerator) {
          if (parseFloat(temp.denominator) < parseFloat(temp.numerator)) {
            error.push({
              errorLocation: `Optional Measure Stratification - ${
                locationDictionary[label] ?? label
              }`, //TODO: add dict lookup for location cleanup
              errorMessage:
                "Numerator cannot be greater than the Denominator for NDR sets.",
            });
          }
        }
      }
    }
  }

  return error;
};

const validateNDRs = (
  data: DefaulFormData,
  callbackArr: OmsValidationCallback[],
  qualifiers: string[],
  categories: string[],
  locationDictionary: { [key: string]: string }
) => {
  const errorArray: any = [];

  // validates top levels, ex: Race, Geography, Sex
  const validateTopLevelNode = (node: OMS.TopLevelOmsNode, label: string) => {
    // validate children if exist
    if (node.options?.length) {
      for (const option of node.options) {
        validateChildNodes(node.selections?.[option] ?? {}, option);
      }
    }

    // validate for additionals category
    for (const addtnl of node.additionalSelections ?? []) {
      validateChildNodes(addtnl, addtnl.description ?? "Additional Rate");
    }

    // ACA validate
    if (node.rateData) {
      validateNodeRates(node.rateData, label);
    }
  };

  // validate mid level, ex: White, African American, etc
  const validateChildNodes = (node: OMS.MidLevelOMSNode, label: string) => {
    // validate sub categories
    if (node.additionalSubCategories?.length) {
      for (const subCat of node.additionalSubCategories) {
        validateChildNodes(subCat, subCat?.description ?? "");
      }
    }

    // validate sub type, ex: Asian -> Korean, Chinese, etc
    if (node.aggregate?.includes("No")) {
      for (const key of node.options ?? []) {
        validateChildNodes(node.selections?.[key] ?? {}, key);
      }
    }

    //validate rates
    if (node.rateData) {
      validateNodeRates(node.rateData, label);
    }
  };

  // Rate containers to be validated
  const validateNodeRates = (rateData: OMS.OmsRateFields, label: string) => {
    for (const callback of callbackArr) {
      errorArray.push(
        ...callback({
          rateData,
          categories,
          qualifiers,
          label,
          locationDictionary,
        })
      );
    }
    // Object.keys(rateData.rates?.[option]);
    // compareRate
    // TODO: call callbacks with new structure
    // TODO: refactor callbacks
  };

  // Loop through top level nodes for validation
  for (const key of data.OptionalMeasureStratification.options) {
    validateTopLevelNode(
      data.OptionalMeasureStratification.selections?.[key] ?? {},
      key
    );
  }

  console.log(errorArray);
  return errorArray;
};
