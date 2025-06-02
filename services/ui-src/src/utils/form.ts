import * as Types from "shared/types";
import { AnyObject } from "types";

/**
 * Given a PerformanceMeasure or OtherPerformanceMeasure object, return true if any of the rates are
 * completed
 * @param data - The data object that is being edited.
 * @returns a boolean value.
 */
export const areSomeRatesCompleted = (data: any, measureId: string = "") => {
  let ratesExist = false;
  const rateExists = (rate: Types.RateFields) =>
    rate?.rate || (rate?.denominator && rate?.numerator);
  const PCRrateExists = (rate: any) => rate?.value;
  const complexRateExists = (rate: any) => {
    return rate?.fields.some((field: any) => {
      return field?.value;
    });
  };

  const performanceMeasureRates = data.PerformanceMeasure?.rates;
  if (performanceMeasureRates) {
    for (const option in performanceMeasureRates) {
      // Ugly, but PCR-XX are the only measures that break this check.
      // If you are thinking about adding another hard-coded value here, consider refactoring this function.
      if (
        (measureId === "PCR-AD" || measureId === "PCR-HH") &&
        performanceMeasureRates?.[option]?.some(PCRrateExists)
      ) {
        ratesExist = true;
      } else if (
        (measureId === "IU-HH" || measureId === "AIF-HH") &&
        performanceMeasureRates?.[option]?.some(complexRateExists)
      ) {
        ratesExist = true;
      } else if (performanceMeasureRates?.[option]?.some(rateExists)) {
        ratesExist = true;
      }
    }
  }

  const otherPerformanceMeasureRates = data["OtherPerformanceMeasure-Rates"];
  if (otherPerformanceMeasureRates) {
    otherPerformanceMeasureRates?.forEach((rate: any) => {
      if (rate.description) ratesExist = true;
      if (rate.rate?.some(rateExists)) ratesExist = true;
    });
  }

  return ratesExist;
};

//compare two objects and return true if the values in them are different
export const areObjectsDifferent = (objectA: AnyObject, objectB: AnyObject) => {
  const uniqueKeys = [
    ...Object.keys(objectA ?? {}),
    ...Object.keys(objectB ?? {}),
  ].filter((key, index, arr) => index === arr.indexOf(key));
  for (const key of uniqueKeys) {
    //if the value is an object or array, we want to go down another layer
    if (typeof objectA?.[key] === "object") {
      //once we see a difference we want to break out of the loop and return true to trigger a save
      if (areObjectsDifferent(objectA?.[key], objectB?.[key])) {
        return true;
      }
    } else {
      if (objectA?.[key] !== objectB?.[key]) return true;
    }
  }
  return false;
};

export const stringIsReadOnly = (dataSource: string) => {
  return dataSource === "AdministrativeData";
};

export const arrayIsReadOnly = (dataSource: string[]) => {
  if (dataSource.length === 0) {
    return false;
  }
  return (
    dataSource?.every((source) => source === "AdministrativeData") ?? false
  );
};
