import { FormError } from "error";
import * as Types from "shared/types";

export const validateAtLeastOneDeliverySystem = (
  data: Types.DefinitionOfPopulation,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  if (
    !data.DeliverySysRepresentationDenominator ||
    data.DeliverySysRepresentationDenominator.length === 0
  ) {
    errorArray.push({
      errorLocation: "Delivery Systems",
      errorMessage:
        errorMessage ?? "You must select at least one delivery system option",
    });
  }

  return errorArray;
};
