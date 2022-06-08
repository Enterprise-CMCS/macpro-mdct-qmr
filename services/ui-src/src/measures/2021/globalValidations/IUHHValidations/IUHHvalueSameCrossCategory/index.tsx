import { cleanString } from "utils/cleanString";

export const IUHHvalueSameCrossCategoryOMS = () => {};

/*
 * Validate that the value of a given field with a given qualifier is consistent
 * across all measurement categories.
 *
 * Ex - "Number of Enrollee Months" in Inpatient ages 0-17 === Medicine ages 0-17
 */
export const IUHHvalueSameCrossCategory = (
  rateData: any,
  OPM: any,
  fieldIndex: number = 0,
  fieldLabel: string = "Number of Enrollee Months",
  errorLocation: string = "Performance Measure/Other Performance Measure"
) => {
  let errorArray: any[] = [];
  if (!OPM) {
    const tempValues: {
      [cleanedQualifier: string]: {
        value: string;
        label: string;
        error?: boolean;
      };
    } = {};
    for (const category of rateData) {
      for (const qualifier of category) {
        const cleanQual = cleanString(qualifier.label);
        if (tempValues[cleanQual]?.value) {
          if (
            qualifier.fields[fieldIndex]?.value &&
            tempValues[cleanQual].value !== qualifier.fields[fieldIndex]?.value
          ) {
            // Set an error if the qualifier does not match tempValues
            tempValues[cleanQual].error = true;
          }
        } else {
          // Set tempValues[cleanQual] to be used in future checks against other qualifiers
          tempValues[cleanQual] = {
            value: qualifier.fields[fieldIndex]?.value,
            label: qualifier.label,
          };
        }
      }
    }

    // Using tempValues as a reference prevents multiple error messages per qualifier
    for (const tempValue in tempValues) {
      if (tempValues[tempValue]?.error) {
        errorArray.push({
          errorLocation,
          errorMessage: `Value of "${fieldLabel}" in ${tempValues[tempValue].label} must be the same across all measurement categories.`,
        });
      }
    }
  }
  return errorArray;
};
