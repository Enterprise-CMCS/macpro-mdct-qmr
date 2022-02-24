// import { appendErrors } from "react-hook-form"

import { flatten } from "flat";
import { Measure } from "../IETAD/validation/types";

export const omsValidations = (data: Measure.Form) => {
  const flattenedOMSData: any = flatten(data.OptionalMeasureStratification, {
    safe: true,
  });

  console.log({ flattenedOMSData });

  const selectedOptions = flattenedOMSData.options;

  const filteredPaths = Object.keys(flattenedOMSData)
    .filter((key) => {
      return key.includes("rates.");
    })
    .map((filteredPath) => ({
      rate: flattenedOMSData[filteredPath][0],
      path: filteredPath,
    }));

  const test = omsFilledNDRCheckbox({ filteredPaths, selectedOptions });

  console.log({ test });

  console.log({ filteredPaths, selectedOptions });

  // const stuff = validateUndefinedSelections(objectToValidate) // looks like [error, error, error]

  return test; //array of errors to print at bottom of screen
};

const omsFilledNDRCheckbox = ({ filteredPaths, selectedOptions }: any) => {
  const errorArray: any = [];
  const testObj: any = {};
  for (const selectedOption of selectedOptions) {
    testObj[selectedOption] = true;
    for (const rate of filteredPaths) {
      if (!rate.path.includes(selectedOption) || rate.rate.rate === "") {
        testObj[selectedOption] = false;
        errorArray.push({
          errorLocation: "Optional Measure Stratification",
          errorMessage: "You must complete one NDR set",
        });
        return errorArray;
      }
    }
  }
  return errorArray;
};

// const navigateComplexObject = (objectToValidate) => {
//     const ndrSets = []
//     objectToValidate.forEach((subObject1ToValidate) => {
//         //do you have ndr sets?
//         // construct object to push - this should be its own function
//         ndrSets.push(subObject1ToValidate)
//     })

//     return [
//         {path: "Geography.Other.SubCategory.2.ages18to64", ndrSets: [{numerator: 55, denominator: 55, rate: 100]}},
//         {path: "Geography.UnitedStates", ndrSets: undefined}
//     ]

// }

// const validateUndefinedSelections = (objectToValidate) => {

// }
