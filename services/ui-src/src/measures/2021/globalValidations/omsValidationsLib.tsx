// import { appendErrors } from "react-hook-form"

import { flatten } from "flat";
import { Measure } from "../IETAD/validation/types";
// import objectPath from "object-path";

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

  const flattenedOMSDataNotSafe: any = flatten(
    data.OptionalMeasureStratification,
    {
      safe: false,
    }
  );

  const additionalSelectionOptions = Object.keys(flattenedOMSDataNotSafe)
    .filter((key) => {
      return key.includes("additionalSelections.");
    })
    .filter((nestedKey) => {
      return /(rate|numerator|denominator)$/g.test(nestedKey);
    })
    .map((filteredPath) => ({
      [filteredPath]: flattenedOMSDataNotSafe[filteredPath],
    }));
  // .reduce((prev, current) => {
  //   return {
  //     ...prev,
  //     ...current,
  //   };
  // }, {});

  for (const selectedOption of selectedOptions) {
    const something = Object.keys(additionalSelectionOptions).filter((rate) =>
      rate.includes(selectedOption)
    );
    console.log(something.length);
  }

  console.log({ additionalSelectionOptions });

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
