import {
  getMeasureFromTable,
  putCombinedRatesToTable,
} from "../../storage/table";
import {
  CombinedRatesPayload,
  CoreSetAbbr,
  DataSource as DataSourceTypes,
  isCoreSetAbbr,
  isDefined,
  isRateNDRShape,
  isRateValueShape,
  Measure,
  MeasurementSpecificationType,
  MeasureParameters,
} from "../../types";
import { fixRounding } from "../../utils/constants/math";

/**
 * Given the identifiers of a measure:
 * 1. Determine if a combined rate calculation is needed. If so,
 * 2. Fetch all the necessary data from the Measures table
 * 3. Perform all calculations
 * 4. Store the results to the Rates table
 */
export const calculateAndPutRate = async (
  pathParameters: MeasureParameters
) => {
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
  const DataSources = {
    Medicaid: getDataSources(medicaidMeasure),
    CHIP: getDataSources(chipMeasure),
  };

  // Measures reported with other data sources or other specs are not usable.
  if (DataSources.Medicaid.isNotApplicable) {
    medicaidMeasure = undefined;
  }
  if (DataSources.CHIP.isNotApplicable) {
    chipMeasure = undefined;
  }

  const Rates = combineRates(
    measureAbbr,
    DataSources,
    medicaidMeasure,
    chipMeasure
  );

  const AdditionalValues = calculateAdditionalValues(
    measureAbbr,
    medicaidMeasure,
    chipMeasure
  );

  return {
    DataSources,
    Rates,
    AdditionalValues,
  };
};

/**
 * Pull the data sources and sub-selections out of the measure.
 * The `includesHybrid` flag determines if the Combined Rate needs weighting.
 */
export const getDataSources = (
  measure: Measure | undefined
): CombinedRatesPayload["DataSources"]["Medicaid" | "CHIP"] => {
  const DataSource = measure?.data?.DataSource ?? [];
  const DataSourceSelections = measure?.data?.DataSourceSelections ?? {};
  const MeasurementSpecification = measure?.data?.MeasurementSpecification;
  
  const includesHybrid =
    DataSource.includes(DataSourceTypes.Hybrid) ||
    DataSource.includes(DataSourceTypes.CaseMagementRecordReview);

  // If the measure was not found in the DB, it's not "N/A", it's "not reported"
  const measureExists = !!measure;
  const includesOther = DataSource.includes(DataSourceTypes.Other)
  const includesECDS = DataSource.includes(DataSourceTypes.ECDS);
  const otherSpecification =
    MeasurementSpecification === MeasurementSpecificationType.Other;
  const isNotApplicable = measureExists &&
    (includesOther || includesECDS || otherSpecification);

  return {
    includesHybrid,
    isNotApplicable,
    DataSource,
    DataSourceSelections,
  };
};

/**
 * This is the core of the combined rate calculations.
 * Crunches numbers for numerators, denominators, weights, and rates.
 */
const combineRates = (
  measureAbbr: string,
  DataSources: CombinedRatesPayload["DataSources"],
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
): CombinedRatesPayload["Rates"] => {
  const [medicaidRates, chipRates] = [medicaidMeasure, chipMeasure]
    .map((measure) => measure?.data?.PerformanceMeasure?.rates ?? {})
    .map((rateMap) =>
      Object.values(rateMap)
        .flat(1)
        .filter(isRateNDRShape)
    );

  const uniqueRateIds = [...medicaidRates, ...chipRates]
    .map((rate) => rate.uid)
    .filter(isDefined)
    .filter((uid, i, arr) => i === arr.indexOf(uid));

  const useWeightedCalculation =
    DataSources.Medicaid.includesHybrid || DataSources.CHIP.includesHybrid;

  if (!useWeightedCalculation) {
    return uniqueRateIds.map((uid) => {
      const medicaidRate = medicaidRates.find((rate) => rate.uid === uid);
      const chipRate = chipRates.find((rate) => rate.uid === uid);

      const mNumerator = parseQmrNumber(medicaidRate?.numerator);
      const mDenominator = parseQmrNumber(medicaidRate?.denominator);
      const mRate = parseQmrNumber(medicaidRate?.rate);

      const cNumerator = parseQmrNumber(chipRate?.numerator);
      const cDenominator = parseQmrNumber(chipRate?.denominator);
      const cRate = parseQmrNumber(chipRate?.rate);

      const combinedNumerator = addSafely(mNumerator, cNumerator);
      const combinedDenominator = addSafely(mDenominator, cDenominator);
      const quotient = divideSafely(combinedNumerator, combinedDenominator);
      let combinedRate = transformQuotient(measureAbbr, quotient);

      combinedRate = roundSafely(combinedRate, 1);

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid: {
          numerator: mNumerator,
          denominator: mDenominator,
          rate: mRate,
        },
        CHIP: {
          numerator: cNumerator,
          denominator: cDenominator,
          rate: cRate,
        },
        Combined: {
          numerator: combinedNumerator,
          denominator: combinedDenominator,
          rate: combinedRate,
        },
      };
    });
  } else {
    // We use the weighted calculation if at least one measure has Hybrid data
    return uniqueRateIds.map((uid) => {
      const medicaidRate = medicaidRates.find((rate) => rate.uid === uid);
      const chipRate = chipRates.find((rate) => rate.uid === uid);

      const mNumerator = parseQmrNumber(medicaidRate?.numerator);
      const mDenominator = parseQmrNumber(medicaidRate?.denominator);
      const mRate = parseQmrNumber(medicaidRate?.rate);

      const cNumerator = parseQmrNumber(chipRate?.numerator);
      const cDenominator = parseQmrNumber(chipRate?.denominator);
      const cRate = parseQmrNumber(chipRate?.rate);

      const combinedNumerator = addSafely(mNumerator, cNumerator);
      const combinedDenominator = addSafely(mDenominator, cDenominator);
      
      /*
       * For hybrid measures, we expect the user to enter the population.
       * For admin measures, we expect to use the rate's denominator instead.
       * But IF a user enters a population on an admin measure, we will use it.
       * Maybe we should disable the population input unless the user selects
       * a hybrid data source? It seems they shouldn't use it for admin.
       */
      let medicaidPopulation = parseQmrNumber(medicaidMeasure?.data?.HybridMeasurePopulationIncluded);
      if (medicaidPopulation === undefined && !DataSources.Medicaid.includesHybrid) {
        medicaidPopulation = mDenominator;
      }
      let chipPopulation = parseQmrNumber(chipMeasure?.data?.HybridMeasurePopulationIncluded);
      if (chipPopulation === undefined && !DataSources.CHIP.includesHybrid) {
        chipPopulation = cDenominator;
      }

      const totalPopulation = addSafely(medicaidPopulation, chipPopulation);
      const mWeight = divideSafely(medicaidPopulation, totalPopulation);
      const cWeight = divideSafely(chipPopulation, totalPopulation);

      let mWeightedRate = multiplySafely(mWeight, mRate);
      let cWeightedRate = multiplySafely(cWeight, cRate);
      let combinedWeightedRate = addSafely(mWeightedRate, cWeightedRate);

      mWeightedRate = roundSafely(mWeightedRate, 1);
      cWeightedRate = roundSafely(cWeightedRate, 1);
      combinedWeightedRate = roundSafely(combinedWeightedRate, 1);

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid: {
          numerator: mNumerator,
          denominator: mDenominator,
          rate: mRate,
          population: medicaidPopulation,
          weightedRate: mWeightedRate,
        },
        CHIP: {
          numerator: cNumerator,
          denominator: cDenominator,
          rate: cRate,
          population: chipPopulation,
          weightedRate: cWeightedRate,
        },
        Combined: {
          numerator: combinedNumerator,
          denominator: combinedDenominator,
          population: totalPopulation,
          weightedRate: combinedWeightedRate,
        },
      };
    });
  }
};

/**
 * Most measures display as a percentage, but certain measures are expressed
 * instead as per-thousand, per-hundred-thousand, or an inverted percent.
 */
const transformQuotient = (measureAbbr: string, quotient: number | undefined) => {
  if (quotient === undefined) return undefined;
  switch (measureAbbr) {
    case "AAB-AD":
      return (1 - quotient) * 100;
    case "AAB-CH":
      return (1 - quotient) * 100;
    case "AMB-CH":
      return quotient * 1000;
    case "PQI-AD":
      return quotient * 100000;
    default:
      return quotient * 100;
  }
};

/**
 * Certain measures (CPU-AD, PCR-AD) contain information that doesn't fit into
 * the usual Numerator-Denominator-Rate format. But we still want to combine
 * the Medicaid data with the CHIP data. That is done here.
 */
const calculateAdditionalValues = (
  measureAbbr: string,
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
): CombinedRatesPayload["AdditionalValues"] => {
  const [medicaidValues, chipValues] = [medicaidMeasure, chipMeasure]
    .map((measure) => measure?.data?.PerformanceMeasure?.rates ?? {})
    .map((rateMap) =>
      Object.values(rateMap)
        .flat(1)
        .filter(isRateValueShape)
    );

  const findValues = (uid: string) => {
    const fieldObj = {
      uid,
    } as CombinedRatesPayload["AdditionalValues"][number];
    const medicaidValue = medicaidValues.find((rate) => rate.uid === uid);
    const chipValue = chipValues.find((rate) => rate.uid === uid);

    fieldObj.label = medicaidValue?.label ?? chipValue?.label ?? "";
    fieldObj.Medicaid = parseQmrNumber(medicaidValue?.value);
    fieldObj.CHIP = parseQmrNumber(chipValue?.value);

    return fieldObj;
  };

  if (measureAbbr === "CPU-AD") {
    const unreachable = findValues("HLXNLW.7dC1vt");
    const refusal = findValues("HLXNLW.6zIwnx");

    unreachable.Combined = addSafely(unreachable.Medicaid, unreachable.CHIP);
    refusal.Combined = addSafely(refusal.Medicaid, refusal.CHIP);

    return [unreachable, refusal];
  } else if (measureAbbr === "PCR-AD") {
    const stayCount = findValues("zcwVcA.Z31BMw");
    const obsReadmissionCount = findValues("zcwVcA.KdVD0I");
    const obsReadmissionRate = findValues("zcwVcA.GWePur");
    const expReadmissionCount = findValues("zcwVcA.ciVWdY");
    const expReadmissionRate = findValues("zcwVcA.qi3Vd7");
    const obsExpRatio = findValues("zcwVcA.SczxqV");
    const beneficaryCount = findValues("zcwVcA.Ei65yg");
    const outlierCount = findValues("zcwVcA.pBILL1");
    const outlierRate = findValues("zcwVcA.Nfe4Cn");

    stayCount.Combined = addSafely(stayCount.Medicaid, stayCount.CHIP);
    obsReadmissionCount.Combined = addSafely(obsReadmissionCount.Medicaid, obsReadmissionCount.CHIP);
    obsReadmissionRate.Combined = multiplySafely(divideSafely(obsReadmissionCount.Combined, stayCount.Combined), 100);
    expReadmissionCount.Combined = addSafely(expReadmissionCount.Medicaid, expReadmissionCount.CHIP);
    expReadmissionRate.Combined = multiplySafely(divideSafely(expReadmissionCount.Combined, stayCount.Combined), 100);
    obsExpRatio.Combined = divideSafely(obsReadmissionRate.Combined, expReadmissionRate.Combined);
    beneficaryCount.Combined = addSafely(beneficaryCount.Medicaid, beneficaryCount.CHIP);
    outlierCount.Combined = addSafely(outlierCount.Medicaid, outlierCount.CHIP);
    outlierRate.Combined = multiplySafely(divideSafely(outlierCount.Combined, beneficaryCount.Combined), 1000);

    // We used unrounded values during calculation; round them now.
    obsReadmissionRate.Combined = roundSafely(obsReadmissionRate.Combined, 4);
    expReadmissionCount.Combined = roundSafely(expReadmissionCount.Combined, 4);
    expReadmissionRate.Combined = roundSafely(expReadmissionRate.Combined, 4);
    obsExpRatio.Combined = roundSafely(obsExpRatio.Combined, 4);
    outlierRate.Combined = roundSafely(outlierRate.Combined, 1);

    return [
      stayCount,
      obsReadmissionCount,
      obsReadmissionRate,
      expReadmissionCount,
      expReadmissionRate,
      obsExpRatio,
      beneficaryCount,
      outlierCount,
      outlierRate,
    ];
  } else {
    // For all other measures, there are no Additional Values
    return [];
  }
};

const parseQmrNumber = (str: string | undefined) => {
  if (str === undefined) return undefined;
  if (str === "") return undefined;
  return Number(str);
};

const addSafely = (x: number | undefined, y: number | undefined) => {
  if (x === undefined && y === undefined) return undefined;
  if (x === undefined) return y;
  if (y === undefined) return x;
  return x + y;
};

const divideSafely = (x: number | undefined, y: number | undefined) => {
  if (x === undefined || y === undefined) return undefined;
  if (y === 0) return undefined;
  return x / y;
};

const multiplySafely = (x: number | undefined, y: number | undefined) => {
  if (x === undefined || y === undefined) return undefined;
  return x * y;
};

const roundSafely = (x: number | undefined, numbersAfterDecimal: number) => {
  if (x === undefined) return undefined;
  return fixRounding(x, numbersAfterDecimal);
};
