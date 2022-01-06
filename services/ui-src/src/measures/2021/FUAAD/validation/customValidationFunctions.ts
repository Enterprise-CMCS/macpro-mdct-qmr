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

    sevenDays.forEach((_sevenDaysObj, index) => {
      if (sevenDays[index]?.denominator !== thirtyDays[index]?.denominator) {
        errors["PerformanceMeasure-AgeRates-7Days"]![index] = {
          denominator: {
            type: "value",
            message: "Denominator needs to match 30 days denominator.",
          },
        };
        errors["PerformanceMeasure-AgeRates-30Days"]![index] = {
          denominator: {
            type: "value",
            message: "Denominator needs to match 7 days denominator.",
          },
        };
      } else {
        delete errors["PerformanceMeasure-AgeRates-7Days"]![index];
        delete errors["PerformanceMeasure-AgeRates-30Days"]![index];
      }
    });

    if (errors["PerformanceMeasure-AgeRates-30Days"]?.length === 0) {
      delete errors["PerformanceMeasure-AgeRates-30Days"];
    }
    if (errors["PerformanceMeasure-AgeRates-7Days"]?.length === 0) {
      delete errors["PerformanceMeasure-AgeRates-7Days"];
    }
  }
  return { values, errors };
};

const validateRate7GreaterThanRate30: CustomValidator = (
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

    sevenDays.forEach((_, index) => {
      if (sevenDays[index].rate < thirtyDays[index].rate) {
        errors["PerformanceMeasure-AgeRates-7Days"]![index] = errors[
          "PerformanceMeasure-AgeRates-7Days"
        ]![index]
          ? errors["PerformanceMeasure-AgeRates-7Days"]![index]
          : {};
        errors["PerformanceMeasure-AgeRates-7Days"]![index].numerator = {
          type: "value",
          message: "Seven Days Rate must be higher than 30 Days Rate",
        };
      }
    });
  }
  return { values, errors };
};

export const validationFunctions: CustomValidator[] = [
  validateRates,
  validateRate7GreaterThanRate30,
];
