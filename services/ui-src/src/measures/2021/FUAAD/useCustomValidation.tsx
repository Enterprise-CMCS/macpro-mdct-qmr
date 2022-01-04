import { useCallback } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { ResolverResult, FieldError } from "react-hook-form";
import { Measure } from "measures/types";

type CustomValidator = (res: ResolverResult) => ResolverResult;

export const useJoiValidationResolver = (
  validationSchema: any,
  additionalValidationFns: CustomValidator[]
) =>
  useCallback(
    async (data: any, context: any, options: any) => {
      const resolver = joiResolver(validationSchema);
      let results = await resolver(data, context, options);
      additionalValidationFns.forEach((fn) => {
        results = fn(results);
      });
      console.log(results);
      return results;
    },
    [validationSchema, additionalValidationFns]
  );

export const testVal: CustomValidator = (result: ResolverResult) => {
  const errors = { ...result.errors };
  errors["AdditionalNotes-AdditionalNotes"] = "hi daniel";
  return { ...result, errors };
};

export const validateRates: CustomValidator = (
  result: ResolverResult<Measure.Form>
) => {
  const values = { ...result.values };
  const errors = { ...result.errors };
  const sevenDays = values["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = values["PerformanceMeasure-AgeRates-30Days"];

  if (sevenDays && thirtyDays) {
    if (sevenDays[0].denominator !== thirtyDays[0].denominator) {
      // errors["PerformanceMeasure-AgeRates-7Days"][0].denominator = {} as FieldError;
    }
  }
  return result;
};
