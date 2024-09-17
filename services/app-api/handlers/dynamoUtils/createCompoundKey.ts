import { CoreSetParameters, MeasureParameters } from "../../types";

export const createMeasureKey = (measureParams: MeasureParameters) => {
  const { state, year, coreSet } = measureParams;

  return `${state}${year}${coreSet}`;
};

export const createCoreSetKey = (coreSetParams: CoreSetParameters) => {
  const { state, year, coreSet } = coreSetParams;

  return `${state}${year}${coreSet}`;
};
