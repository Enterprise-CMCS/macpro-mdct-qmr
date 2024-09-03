import * as Types from "shared/types";
import * as DC from "dataConstants";

export const validateHedisYear = (
  data: Types.MeasurementSpecification,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];
  const measurementSpecification: string = data[DC.MEASUREMENT_SPECIFICATION];
  const measurementSpecificationHedis: string =
    data[DC.MEASUREMENT_SPECIFICATION_HEDIS];

  if (
    measurementSpecificationHedis === "" ||
    (measurementSpecificationHedis === undefined &&
      measurementSpecification !== "Other")
  ) {
    errorArray.push({
      errorLocation: "Measure Specification",
      errorMessage:
        errorMessage ??
        "Version of HEDIS measurement year used must be specified",
    });
  }

  return errorArray;
};
