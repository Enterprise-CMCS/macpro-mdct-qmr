// import { appendErrors } from "react-hook-form"
import { Measure } from "../IETAD/validation/types";
// import objectPath from "object-path";

export const omsValidations = (data: Measure.Form) => {
  danielsIdea(data);
  return [];
  //array of errors to print at bottom of screen
};

const isEmptyNDR = (ndr: any): boolean => {
  console.log({ ndr });
  return !ndr.denominator && !ndr.numerator && !ndr.rate;
};

const danielsIdea = (data: Measure.Form) => {
  const filledInRates: any = {};

  for (const selection of data.OptionalMeasureStratification.options) {
    const topLevelMap =
      data.OptionalMeasureStratification.selections[selection];
    console.log({ topLevelMap });

    if (!topLevelMap.options) {
      filledInRates[selection] = false;
    } else {
      for (const nestedSelection of topLevelMap.options ?? []) {
        const selections = topLevelMap?.selections;

        if (
          selections &&
          !filledInRates[selection] &&
          Object.keys(selections[nestedSelection].ageRangeRates?.rates ?? [])
            .length
        ) {
          console.log(
            "rates",
            selections[nestedSelection].ageRangeRates?.rates
          );
          for (const key of Object.keys(
            selections[nestedSelection].ageRangeRates?.rates ?? {}
          )) {
            console.log(
              isEmptyNDR(
                selections[nestedSelection].ageRangeRates?.rates?.[key][0]
              )
            );
            filledInRates[selection] = !isEmptyNDR(
              selections[nestedSelection].ageRangeRates?.rates?.[key][0]
            );
          }
        }
      }
    }
  }
  console.log({ filledInRates });
};
