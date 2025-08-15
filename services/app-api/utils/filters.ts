import { measures } from "../handlers/dynamoUtils/measureList";
import { State } from "../types";
import { states, bannerIds } from "./constants/constants";

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
