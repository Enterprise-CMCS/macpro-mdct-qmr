export const validateHedisYear = (
  measurementSpecificationHedis: string,
  errorMessage?: string
) => {
  const errorArray: FormError[] = [];

  if (
    measurementSpecificationHedis === "" ||
    measurementSpecificationHedis === undefined
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
