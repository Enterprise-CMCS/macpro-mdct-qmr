import { CoreSetParameters, MeasureParameters } from "../../types";

export const createMeasureKey = (measureParams: MeasureParameters) => {
  const { state, year, coreSet, measure } = measureParams;

  return `${state}${year}${coreSet}${measure}`;
};

export const createCoreSetKey = (coreSetParams: CoreSetParameters) => {
  const { state, year, coreSet } = coreSetParams;

  return `${state}${year}${coreSet}`;
};
