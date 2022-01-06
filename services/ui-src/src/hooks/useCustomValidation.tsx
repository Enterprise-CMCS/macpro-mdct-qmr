import { useCallback } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { Measure } from "measures/types";

export const useJoiValidationResolver = (
  validationSchema: any,
  additionalValidationFns: Measure.CustomValidator[]
) =>
  useCallback(
    async (data: any, context: any, options: any) => {
      const resolver = joiResolver(validationSchema);
      let results = await resolver(data, context, options);
      additionalValidationFns.forEach((fn) => {
        results = fn(results);
      });
      return results;
    },
    [validationSchema, additionalValidationFns]
  );
