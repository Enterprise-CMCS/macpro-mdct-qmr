// import { appendErrors } from "react-hook-form"

export const omsValidations = (objectToValidate: any) => {
  console.log(objectToValidate);

  // const stuff = validateUndefinedSelections(objectToValidate) // looks like [error, error, error]

  return []; //array of errors to print at bottom of screen
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
