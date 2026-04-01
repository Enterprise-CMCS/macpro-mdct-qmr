import * as Types from "shared/types";
import * as DC from "dataConstants";

export const validateAtLeastOneDefinitionOfPopulation = (
  data: Types.DefinitionOfPopulation,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (
    !data.DefinitionOfDenominator ||
    data.DefinitionOfDenominator.length === 0
  ) {
    errorArray.push({
      errorLocation: "Definition of Population",
      errorMessage:
        errorMessage ??
        "You must select at least one definition of population option",
    });
  }

  if (
    data.DefinitionOfDenominator?.includes(DC.DENOMINATOR_INC_OTHER) &&
    !data[DC.DEFINITION_DENOMINATOR_OTHER]
  ) {
    errorArray.push({
      errorLocation: "Definition of Population Included in the Measure",
      errorMessage: "Please describe the Other Definition of denominator",
    });
  }

  return errorArray;
};
