import { useCallback } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { Measure } from "measures/types";

export const useJoiValidationResolver = (
  validationSchema: any,
  additionalValidationFns: Measure.CustomValidator[]
) =>
  useCallback(
    async (data: any, context: any, options: any) => {
      console.log(`context`, context);
      console.log(`options`, options);
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
