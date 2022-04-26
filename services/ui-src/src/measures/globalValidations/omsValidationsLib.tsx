import {
  OmsValidationCallback,
  locationDictionaryFunction,
  RateData,
} from "./types";
import {
  OmsNodes as OMS,
  RateFields,
  DefaultFormData,
} from "measures/CommonQuestions/types";
import { cleanString } from "utils/cleanString";

interface OmsValidationProps {
  data: DefaultFormData;
  qualifiers: string[];
  categories: string[];
  locationDictionary: locationDictionaryFunction;
  checkIsFilled?: boolean;
  validationCallbacks: OmsValidationCallback[];
  customTotalLabel?: string;
  dataSource?: string[];
}
export const omsValidations = ({
  categories,
  checkIsFilled = true,
  data,
  locationDictionary,
  qualifiers,
  validationCallbacks,
  customTotalLabel,
  dataSource,
}: OmsValidationProps) => {
  const opmCats: string[] = ["OPM"];
  const opmQuals: string[] = [];
  let isOPM = false;
  if (
    data.MeasurementSpecification === "Other" &&
    data["OtherPerformanceMeasure-Rates"]
  ) {
    isOPM = true;
    opmQuals.push(
      ...data["OtherPerformanceMeasure-Rates"].map(
        (rate) => rate.description ?? "Fill out description"
      )
    );
  }
  const cats = categories.length === 0 ? ["singleCategory"] : categories;
  return validateNDRs(
    data,
    validationCallbacks,
    opmQuals.length ? opmQuals : qualifiers,
    opmQuals.length ? opmCats : cats,
    locationDictionary,
    checkIsFilled,
    isOPM,
    customTotalLabel,
    dataSource
  );
};

export const validateOneSealantGreaterThanFourMolarsSealedOMS: OmsValidationCallback =
  ({ rateData, categories, qualifiers, label, locationDictionary, isOPM }) => {
    if (isOPM) return [];
    const errors: FormError[] = [];
    const isRateLessThanOther = (rateArr: RateFields[]) => {
      if (rateArr.length !== 2) return true;
      const compareValue = rateArr[0].rate ?? "";
      return parseFloat(rateArr[1].rate ?? "") <= parseFloat(compareValue);
    };
    const rateArr: RateFields[] = [];
    for (const qual of qualifiers) {
      const cleanQual = cleanString(qual);
      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[cleanQual]?.[cat]) {
          const temp = rateData.rates[cleanQual][cat][0];
          if (temp && temp.rate) {
            rateArr.push(temp);
          }
        }
      }
    }
    if (!isRateLessThanOther(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary(
          label
        )}`,
        errorMessage: `Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant).`,
      });
    }

    return errors;
  };

const validateNDRs = (
  data: DefaultFormData,
  callbackArr: OmsValidationCallback[],
  qualifiers: string[],
  categories: string[],
  locationDictionary: locationDictionaryFunction,
  checkIsFilled: boolean,
  isOPM: boolean,
  customTotalLabel?: string,
  dataSource?: string[]
) => {
  const isFilled: { [key: string]: boolean } = {};
  const isDeepFilled: { [key: string]: boolean } = {};
  const errorArray: FormError[] = [];
  // validates top levels, ex: Race, Geography, Sex
  const validateTopLevelNode = (node: OMS.TopLevelOmsNode, label: string[]) => {
    // validate children if exist
    if (node.options?.length) {
      for (const option of node.options) {
        validateChildNodes(node.selections?.[option] ?? {}, [...label, option]);
      }
    }
    // validate for additionals category
    for (const addtnl of node.additionalSelections ?? []) {
      validateChildNodes(addtnl, [
        ...label,
        addtnl.description ?? "Additional Category",
      ]);
    }
    // ACA validate
    if (node.rateData) {
      validateNodeRates(node.rateData, label);
    }
  };
  // validate mid level, ex: White, African American, etc
  const validateChildNodes = (node: OMS.MidLevelOMSNode, label: string[]) => {
    // validate sub categories
    if (node.additionalSubCategories?.length) {
      for (const subCat of node.additionalSubCategories) {
        validateChildNodes(subCat, [
          ...label,
          subCat.description ?? "sub-category",
        ]);
      }
    }
    // validate sub type, ex: Asian -> Korean, Chinese, etc
    if (node.aggregate?.includes("No")) {
      for (const key of node.options ?? []) {
        validateChildNodes(node.selections?.[key] ?? {}, [...label, key]);
      }
    }
    //validate rates
    if (node.rateData) {
      validateNodeRates(node.rateData, label);
    }
  };
  // Rate containers to be validated
  const validateNodeRates = (rateData: RateData, label: string[]) => {
    for (const callback of callbackArr) {
      errorArray.push(
        ...callback({
          rateData,
          categories,
          qualifiers,
          label,
          locationDictionary,
          isOPM,
          customTotalLabel,
          dataSource,
        })
      );
    }
    if (checkIsFilled)
      isFilled[label[0]] = isFilled[label[0]] || checkNdrsFilled(rateData);

    const locationReduced = label.reduce(
      (prev, curr, i) => `${prev}${i ? "-" : ""}${curr}`,
      ""
    );
    checkIsDeepFilled(locationReduced, rateData);
  };
  //checks at least one ndr filled
  const checkNdrsFilled = (rateData: RateData) => {
    // pcr-ad check
    if (rateData?.["pcrad-rate"]) {
      return rateData["pcrad-rate"].every((o) => !!o?.value);
    }
    for (const qual of qualifiers.map((s) => cleanString(s))) {
      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[qual]?.[cat]) {
          const temp = rateData.rates[qual][cat][0];
          if (temp && temp.denominator && temp.numerator && temp.rate) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // checks that if a qualifier was selected that it was filled
  const checkIsDeepFilled = (location: string, rateData: RateData) => {
    if (!rateData || !rateData.options?.length) return;

    // pcr-ad check
    if (rateData?.["pcrad-rate"]) {
      isDeepFilled[`${location}`] = rateData["pcrad-rate"].every(
        (o) => !!o?.value
      );
    }

    // default check
    for (const qual of qualifiers.map((s) => cleanString(s))) {
      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[qual]?.[cat]) {
          const temp = rateData.rates[qual][cat][0];
          if (temp && temp.denominator && temp.numerator && temp.rate) {
            isDeepFilled[`${location}-${qual}`] ??= true;
          } else {
            isDeepFilled[`${location}-${qual}`] = false;
          }
        }
      }
    }
  };

  // Loop through top level nodes for validation
  for (const key of data.OptionalMeasureStratification?.options ?? []) {
    isFilled[key] = false;
    validateTopLevelNode(
      data.OptionalMeasureStratification.selections?.[key] ?? {},
      [key]
    );
  }
  if (checkIsFilled) {
    // check at least one ndr filled for a category
    for (const topLevelKey in isFilled) {
      if (!isFilled[topLevelKey]) {
        errorArray.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            [topLevelKey]
          )}`,
          errorMessage: "Must fill out at least one NDR set.",
        });
      }
    }

    // check selected qualifiers were filled
    for (const topLevelKey in isDeepFilled) {
      if (!isDeepFilled[topLevelKey]) {
        errorArray.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            topLevelKey.split("-")
          )}`,
          errorMessage:
            "For any category selected, all NDR sets must be filled.",
        });
      }
    }
  }
  return errorArray;
};

/*
ex. rate of 3 day should be less than or equal to 6 day
*/
export const validateCrossQualifierRateCorrect: OmsValidationCallback = ({
  rateData,
  categories,
  qualifiers,
  label,
  locationDictionary,
  isOPM,
}) => {
  if (isOPM) return [];

  const errors: FormError[] = [];
  const areDenomsTheSame = (rateArr: RateFields[]) => {
    if (rateArr.length !== 2) return true;
    return (
      parseFloat(rateArr[0].rate ?? "") <= parseFloat(rateArr[1].rate ?? "")
    );
  };
  for (const cat of categories) {
    const cleanCat = cleanString(cat);
    const rateArr: RateFields[] = [];
    for (const qual of qualifiers) {
      const cleanQual = cleanString(qual);
      if (rateData.rates?.[cleanQual]?.[cleanCat]) {
        const temp = rateData.rates[cleanQual][cleanCat][0];
        if (temp && temp.denominator) {
          rateArr.push(temp);
        }
      }
    }
    if (!areDenomsTheSame(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary(
          label
        )}`,
        errorMessage: `The rate value of the ${qualifiers[0]} must be less than or equal to the ${qualifiers[1]} within ${cat}.`,
      });
    }
  }
  return errors;
};

export const validateOneQualifierRateLessThanTheOther: OmsValidationCallback =
  ({ rateData, categories, qualifiers, label, locationDictionary, isOPM }) => {
    if (isOPM) return [];
    const rateArr: RateFields[] = [];
    const errors: FormError[] = [];
    const isRateLessThanOther = (rateArr: RateFields[]) => {
      if (rateArr.length !== 2) return true;
      const compareValue = rateArr[0].rate ?? "";
      return parseFloat(rateArr[1].rate ?? "") <= parseFloat(compareValue);
    };
    for (const qual of qualifiers) {
      const cleanQual = cleanString(qual);
      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[cleanQual]?.[cat]) {
          const temp = rateData.rates[cleanQual][cat][0];
          if (temp && temp.rate) {
            rateArr.push(temp);
          }
        }
      }
    }

    if (!isRateLessThanOther(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary(
          label
        )}`,
        errorMessage: `${qualifiers[1]} rate should not be higher than ${qualifiers[0]} Rates.`,
      });
    }
    return errors;
  };

export const validateOneQualifierDenomLessThanTheOther: OmsValidationCallback =
  ({ rateData, categories, qualifiers, label, locationDictionary, isOPM }) => {
    if (isOPM) return [];

    const rateArr: RateFields[] = [];

    const errors: FormError[] = [];

    const isRateLessThanOther = (rateArr: RateFields[]) => {
      if (rateArr.length !== 2) return true;

      const compareValue = rateArr[0].denominator ?? "";

      return (
        parseFloat(rateArr[1].denominator ?? "") <= parseFloat(compareValue)
      );
    };

    for (const qual of qualifiers) {
      const cleanQual = cleanString(qual);

      for (const cat of categories.map((s) => cleanString(s))) {
        if (rateData.rates?.[cleanQual]?.[cat]) {
          const temp = rateData.rates[cleanQual][cat][0];

          if (temp && temp.rate) {
            rateArr.push(temp);
          }
        }
      }
    }

    if (!isRateLessThanOther(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary(
          label
        )}`,

        errorMessage: `${qualifiers[1]} denominator must be less than or equal to ${qualifiers[0]} denominator.`,
      });
    }

    return errors;
  };
