import { measures } from "../handlers/dynamoUtils/measureList";
import { State } from "../types";
import { states, bannerIds } from "./constants/constants";

/*
 * This utility is most useful when filtering undefined values from an array,
 * _while convincing Typescript you've done so_.
 *
 * @example
 * const a = words.map(word => getThirdChar(word));
 * // a's type is (string | undefined)[]
 *
 * const b = a.filter(char => char !== undefined);
 * // b's type is still (string | undefined)[], boo!
 *
 * const c = a.filter(isDefined);
 * // c's type is just string[], hurray!
 */
export const isDefined = <T>(x: T | undefined): x is T => x !== undefined;

export const isState = (state: unknown): state is State => {
  return states.includes(state as State);
};

export const isValidYear = (year: string) => {
  const reportingYears = Object.keys(measures);
  return reportingYears.includes(year);
};

export const isMeasure = (year: string, measure: string | undefined) => {
  return measures[parseInt(year)]?.some(
    (measureObject) => measureObject.measure === measure
  );
};

export const isBannerId = (bannerId: string) => {
  return bannerIds.includes(bannerId);
};
