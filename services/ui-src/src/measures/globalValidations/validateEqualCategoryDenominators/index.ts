import * as Types from "measures/CommonQuestions/types";
import { OmsValidationCallback } from "../types";
import { cleanString } from "utils/cleanString";

export const validateEqualCategoryDenominatorsOMS: OmsValidationCallback = ({
  rateData,
  categories,
  qualifiers,
  label,
  locationDictionary,
  isOPM,
}) => {
  const denomArray: string[] = [];
  const locationArray: string[] = [];
  if (isOPM) return [];

  for (const qual of qualifiers.map((qual) => cleanString(qual))) {
    for (const cat of categories.map((cat) => cleanString(cat))) {
      const temp = rateData.rates?.[qual]?.[cat]?.[0]?.denominator;

      if (temp) {
        denomArray.push(temp);
        locationArray.push(
          locationDictionary([categories[0] === "singleCategory" ? qual : cat])
        );
      }
    }
  }

  const areTheSame = denomArray.every((denom) => denom === denomArray[0]);

  return !areTheSame
    ? [
        {
          errorLocation: `Optional Measure Stratification: ${locationDictionary(
            label
          )}`,
          errorMessage: `The following categories must have the same denominator:`,
          errorList: locationArray.filter((v, i, a) => a.indexOf(v) === i),
        },
      ]
    : [];
};

/** Checks all rates have the same denominator for both categories and qualifiers. NOTE: only pass qualifiers if category is empty */
export const validateEqualCategoryDenominatorsPM = (
  data: Types.DefaultFormData,
  categories: string[],
  qualifiers?: string[]
) => {
  const cleanString = (s: string) => s.replace(/[^\w]/g, "");
  const denomArray: string[] = [];
  const locationArray: string[] = [];
  const checkedCats = categories.length ? categories : ["singleCategory"];

  for (const category of checkedCats) {
    const cat = cleanString(category);
    // for (const ndr of data.PerformanceMeasure?.rates?.[cat] ?? []) {
    for (
      let i = 0;
      i < (data?.PerformanceMeasure?.rates?.[cat]?.length ?? 0);
      i++
    ) {
      const ndr = data?.PerformanceMeasure?.rates?.[cat]?.[i];
      if (ndr?.denominator) {
        denomArray.push(ndr.denominator);
        locationArray.push(qualifiers ? qualifiers[i] : category);
      }
    }
  }

  const areTheSame = denomArray.every((denom) => denom === denomArray[0]);

  return !areTheSame
    ? [
        {
          errorLocation: "Performance Measure",
          errorMessage: `The following categories must have the same denominator:`,
          errorList: locationArray.filter((v, i, a) => a.indexOf(v) === i),
        },
      ]
    : [];
};
