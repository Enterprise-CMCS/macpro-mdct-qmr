import { OmsValidationCallback, FormRateField } from "../types";
import { RateFields } from "measures/CommonQuestions/types";
import { cleanString } from "utils/cleanString";

export const validateEqualQualifierDenominatorsOMS: OmsValidationCallback = ({
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
    if (rateArr.length === 0) return true;
    const compareValue = rateArr[0].denominator;
    return rateArr.every((rate) => rate.denominator === compareValue);
  };
  for (const qual of qualifiers) {
    const cleanQual = cleanString(qual);
    const rateArr: RateFields[] = [];
    for (const cat of categories.map((s) => cleanString(s))) {
      console.log({ cat, qual });
      if (rateData.rates?.[cleanQual]?.[cat]) {
        const temp = rateData.rates[cleanQual][cat][0];
        console.log({ temp });
        if (temp && temp.denominator) {
          rateArr.push(temp);
        }
      }
    }
    console.log({ rateArr });
    if (!areDenomsTheSame(rateArr)) {
      errors.push({
        errorLocation: `Optional Measure Stratification: ${locationDictionary([
          ...label,
          qual,
        ])}`,
        errorMessage: "Denominators must be the same for each category.",
      });
    }
  }
  return errors;
};

// For each age group the denominators need to be the same for both
// Initiation AND Engagement
export const validateEqualQualifierDenominatorsPM = (
  performanceMeasureArray: FormRateField[][],
  ageGroups: string[],
  explicitErrorMessage?: string
) => {
  let error;
  let errorArray: FormError[] = [];
  ageGroups.forEach((ageGroup, i) => {
    let filledInData: any[] = [];
    performanceMeasureArray?.forEach((_performanceObj, index) => {
      if (
        performanceMeasureArray[index] &&
        performanceMeasureArray[index][i] &&
        performanceMeasureArray[index][i].denominator
      ) {
        filledInData.push(performanceMeasureArray[index][i]);
      }
    });
    if (filledInData.length > 1) {
      let firstDenominator = filledInData[0].denominator;
      let denominatorsNotEqual = false;
      filledInData.forEach((_filledInDataObj, index) => {
        if (filledInData[index].denominator !== firstDenominator) {
          denominatorsNotEqual = true;
        }
      });
      if (denominatorsNotEqual) {
        error = {
          errorLocation: "Performance Measure",
          errorMessage:
            explicitErrorMessage ||
            `Denominators must be the same for each category of performance measures for ${ageGroup}`,
        };
        errorArray.push(error);
      }
    }
  });
  return errorArray;
};
