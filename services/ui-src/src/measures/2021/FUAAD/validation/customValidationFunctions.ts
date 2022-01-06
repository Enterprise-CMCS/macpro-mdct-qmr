import { CustomValidator } from "measures/types";
import { ResolverResult } from "react-hook-form";
import { Measure } from "../validation/types";

const validateRates: CustomValidator = (
  result: ResolverResult<Measure.Form>
) => {
  const values = { ...result.values };
  const errors = { ...result.errors };
  const sevenDays = values["PerformanceMeasure-AgeRates-7Days"];
  const thirtyDays = values["PerformanceMeasure-AgeRates-30Days"];

  if (sevenDays && thirtyDays) {
    const x = errors["PerformanceMeasure-AgeRates-7Days"];
    const y = errors["PerformanceMeasure-AgeRates-30Days"];
    errors["PerformanceMeasure-AgeRates-7Days"] = x ? [...x] : [];
    errors["PerformanceMeasure-AgeRates-30Days"] = y ? [...y] : [];
    if (sevenDays[0]?.denominator !== thirtyDays[0]?.denominator) {
      errors["PerformanceMeasure-AgeRates-7Days"][0] = {
        denominator: {
          type: "value",
          message: "Denominator needs to match 30 days denominator.",
        },
      };
      errors["PerformanceMeasure-AgeRates-30Days"][0] = {
        denominator: {
          type: "value",
          message: "Denominator needs to match 7 days denominator.",
        },
      };
    } else {
      delete errors["PerformanceMeasure-AgeRates-7Days"];
      delete errors["PerformanceMeasure-AgeRates-30Days"];
    }
  }
  return { values, errors };
};

export const validationFunctions = [validateRates];
