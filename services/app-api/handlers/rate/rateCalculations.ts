import {
  getMeasureFromTable,
  putCombinedRatesToTable,
} from "../../storage/table";
import {
  CoreSetAbbr,
  isCoreSetAbbr,
  Measure,
  RateParameters,
} from "../../types";
import { collectDataSources } from "./dataSourceAnalysis";
import { combineRates } from "./rateNDRCalculations";
import { calculateAdditionalValues } from "./rateValueCalculations";

/**
 * Given the identifiers of a measure:
 * 1. Determine if a combined rate calculation is needed. If so,
 * 2. Fetch all the necessary data from the Measures table
 * 3. Perform all calculations
 * 4. Store the results to the Rates table
 */
export const calculateAndPutRate = async (pathParameters: RateParameters) => {
  const { coreSet, measure } = pathParameters;
  if (!isCoreSetAbbr(coreSet)) {
    return;
  }

  const coreSetAbbrs = coreSetsToCombine(coreSet);
  if (!coreSetAbbrs) {
    return;
  }

  const [medicaidMeasure, chipMeasure] = await Promise.all([
    getMeasureFromTable({ ...pathParameters, coreSet: coreSetAbbrs.medicaid }),
    getMeasureFromTable({ ...pathParameters, coreSet: coreSetAbbrs.chip }),
  ]);

  const payload = calculateCombinedRates(measure, medicaidMeasure, chipMeasure);

  await putCombinedRatesToTable(
    { ...pathParameters, coreSet: coreSetAbbrs.combined },
    payload
  );
};

/**
 * Given the name of the core set whose measure just updated:
 * 1. Does it need to be combined? (that is, is it ACSM/ACSC/CCSM/CCSC?)
 * 2. Which core sets will be combined? (ACSM+ACSC? or CCSM+CCSC?)
 * 3. What will the name of the combined core set be? (ACS? or CCS?)
 */
const coreSetsToCombine = (coreSet: CoreSetAbbr) => {
  switch (coreSet) {
    case CoreSetAbbr.ACSM:
    case CoreSetAbbr.ACSC:
      return {
        combined: CoreSetAbbr.ACS,
        medicaid: CoreSetAbbr.ACSM,
        chip: CoreSetAbbr.ACSC,
      };
    case CoreSetAbbr.CCSM:
    case CoreSetAbbr.CCSC:
      return {
        combined: CoreSetAbbr.CCS,
        medicaid: CoreSetAbbr.CCSM,
        chip: CoreSetAbbr.CCSC,
      };
    default:
      // Rates in the ACS, CCS, and HHCS core sets are already combined
      return undefined;
  }
};

/**
 * This is the entry point for all of the actual number crunching
 */
const calculateCombinedRates = (
  measureAbbr: string,
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
) => {
  const DataSources = collectDataSources(medicaidMeasure, chipMeasure);

  const Rates = combineRates(
    measureAbbr,
    DataSources,
    medicaidMeasure,
    chipMeasure
  );

  const AdditionalValues = calculateAdditionalValues(
    measureAbbr,
    DataSources,
    medicaidMeasure,
    chipMeasure
  );

  return {
    DataSources,
    Rates,
    AdditionalValues,
  };
};
