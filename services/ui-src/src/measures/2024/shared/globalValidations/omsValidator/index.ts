import * as DC from "dataConstants";
import {
  OmsValidationCallback,
  locationDictionaryFunction,
  RateData,
} from "../types";
import { OmsNodes as OMS } from "shared/types";
import { DefaultFormData } from "shared/types/FormData";
import { validatePartialRateCompletionOMS } from "shared/globalValidations/validatePartialRateCompletion";
import { LabelData, cleanString } from "utils";

interface OmsValidationProps {
  data: DefaultFormData;
  qualifiers: LabelData[];
  categories: LabelData[];
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
  const opmCats: LabelData[] = [{ id: "OPM", text: "OPM", label: "OPM" }];
  const opmQuals: LabelData[] = [];
  let isOPM = false;
  if (
    data.MeasurementSpecification === "Other" &&
    data["OtherPerformanceMeasure-Rates"]
  ) {
    isOPM = true;
    opmQuals.push(
      ...data["OtherPerformanceMeasure-Rates"].map((rate) => ({
        id: rate.description
          ? `${DC.OPM_KEY}${cleanString(rate.description)}`
          : "Fill out description",
        label: rate.description ?? "Fill out description",
        text: "",
      }))
    );
  }
  const cats =
    categories.length === 0
      ? [
          {
            id: "singleCategory",
            text: "singleCategory",
            label: "singleCategory",
          },
        ]
      : categories;
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

const validateNDRs = (
  data: DefaultFormData,
  callbackArr: OmsValidationCallback[],
  qualifiers: LabelData[],
  categories: LabelData[],
  locationDictionary: locationDictionaryFunction,
  checkIsFilled: boolean,
  isOPM: boolean,
  customTotalLabel?: string,
  dataSource?: string[]
) => {
  const isFilled: { [key: string]: boolean } = {};
  const isDeepFilled: { [key: string]: boolean } = {};
  const isClassificationFilled: { [key: string]: boolean } = {};
  const isDisaggregateFilled: { [key: string]: boolean } = {};
  const errorArray: FormError[] = [];
  // validates top levels, ex: Race, Geography, Sex
  const validateTopLevelNode = (node: OMS.TopLevelOmsNode, label: string[]) => {
    //add label for db data
    if (!node.label) {
      const cleanString = locationDictionary(label);
      node.label = cleanString
        .substring(cleanString.lastIndexOf("-") + 1)
        .trim();
    }
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
    //add label for db data
    if (!node.label) {
      const cleanString = locationDictionary(label);
      node.label = cleanString
        .substring(cleanString.lastIndexOf("-") + 1)
        .trim();
    }
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
    if (node.aggregate?.includes("NoIndependentData")) {
      //if options are empty but there's a no
      for (const key of node.options ?? []) {
        validateChildNodes(node.selections?.[key] ?? {}, [...label, key]);
      }
      //check if disaggregate has sub-categories selected
      checkIsDisaggregateFilled(label, node.selections);
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

    if (checkIsFilled) {
      isFilled[label[0]] = isFilled[label[0]] || checkNdrsFilled(rateData);

      // check for complex rate type and assign appropriate tag
      const rateType = !!rateData?.["iuhh-rate"]
        ? "iuhh-rate"
        : !!rateData?.["aifhh-rate"]
        ? "aifhh-rate"
        : undefined;

      if (!rateData?.["pcr-rate"])
        errorArray.push(
          ...validatePartialRateCompletionOMS(rateType)({
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
    const locationReduced = label.reduce(
      (prev, curr, i) => `${prev}${i ? "-" : ""}${curr}`,
      ""
    );
    checkIsDeepFilled(locationReduced, rateData);
    checkIsClassificationFilled(locationReduced, rateData);
  };
  //checks at least one ndr filled
  const checkNdrsFilled = (rateData: RateData) => {
    // iu-hh check
    if (rateData?.["iuhh-rate"]) {
      const section = rateData["iuhh-rate"]?.rates ?? {};
      for (const category in section) {
        for (const qual in section[category]) {
          const fields = section[category][qual][0].fields;
          if (
            fields.every(
              (field: { label: string; value?: string }) => !!field?.value
            )
          ) {
            return true;
          }
        }
      }
      return false;
    }
    // aif-hh check
    if (rateData?.["aifhh-rate"]) {
      const section = rateData["aifhh-rate"]?.rates ?? {};
      for (const category in section) {
        for (const qual in section[category]) {
          const fields = section[category][qual][0].fields;
          if (
            fields.every(
              (field: { label: string; value?: string }) => !!field?.value
            )
          ) {
            return true;
          }
        }
      }
      return false;
    }
    // pcr-ad check
    if (rateData?.["pcr-rate"]) {
      return rateData["pcr-rate"].every((o) => !!o?.value);
    }
    for (const cat of categories) {
      for (const qual of qualifiers) {
        if (rateData.rates?.[cat.id]?.[qual.id]) {
          const temp = rateData.rates[cat.id][qual.id][0];
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
    if (rateData?.["pcr-rate"]) {
      isDeepFilled[`${location}`] = rateData["pcr-rate"].every(
        (o) => !!o?.value
      );
    }

    for (const cat of categories) {
      for (const qual of qualifiers) {
        //array key order is determined in component useQualRateArray, cleanedName variable
        if (rateData.rates?.[cat.id]?.[qual.id]) {
          const temp = rateData.rates[cat.id][qual.id][0];
          let cleanQual = isOPM ? qual.label : qual.id;
          if (temp && temp.denominator && temp.numerator && temp.rate) {
            isDeepFilled[`${location}-${cleanQual}`] ??= true;
          } else {
            isDeepFilled[`${location}-${cleanQual}`] = false;
          }
        }
      }
    }
  };

  //check if sub-classifications have rateData entered
  const checkIsClassificationFilled = (
    location: string,
    rateData: RateData
  ) => {
    isClassificationFilled[location] = rateData?.rates !== undefined;
  };

  //if selection is empty, it means that no sub classification was selected
  const checkIsDisaggregateFilled = (locations: string[], selection: any) => {
    isDisaggregateFilled[locations[1]] = selection !== undefined;
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

    //if at least one sub-classifications qualifiers is false (no rate data entered), we want to generate an error message,
    //else if all is false, we will ignore it as another error message would already be there
    if (!Object.values(isClassificationFilled).every((v) => v === false)) {
      for (const classKey in isClassificationFilled) {
        if (!isClassificationFilled[classKey]) {
          errorArray.push({
            errorLocation: `Optional Measure Stratification: ${locationDictionary(
              classKey.split("-")
            )}`,
            errorMessage: "Must fill out at least one NDR set.",
          });
        }
      }
    }

    //checking if the user has selected no to aggregate data for certain classifictions (i.e. asian, native hawaiian or pacific islanders)
    //keeping the error message seperate in case we want to have unique messages in the future
    for (const classKey in isDisaggregateFilled) {
      if (!isDisaggregateFilled[classKey]) {
        errorArray.push({
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            classKey.split("-")
          )}`,
          errorMessage: "Must fill out at least one NDR set.",
        });
      }
    }
  }

  //check to see if the rate has been described for other performance measure
  if (isOPM && qualifiers.find((qual) => !qual.label)) {
    errorArray.push({
      errorLocation: `Other Performance Measure`,
      errorMessage: "Rate name required",
    });
  }

  return errorArray;
};
