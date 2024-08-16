import {
  getMeasureFromTable,
  putCombinedRatesToTable,
} from "../../storage/table";
import {
  CombinedRatesPayload,
  CoreSetAbbr,
  isCoreSetAbbr,
  isDefined,
  Measure,
  MeasureParameters,
  RateNDRShape,
  RateValueShape,
} from "../../types";
import { fixRounding } from "../../utils/constants/math";
import { DataSource as DataSourceTypes } from "./types";

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
const getDataSources = (
  measure: Measure | undefined
): CombinedRatesPayload["DataSources"]["Medicaid" | "CHIP"] => {
  const DataSource = measure?.data?.DataSource ?? [];
  const DataSourceSelections = measure?.data?.DataSourceSelections ?? [];
  
  const includesHybrid =
    DataSource.includes(DataSourceTypes.Hybrid) ||
    DataSource.includes(DataSourceTypes.CaseMagementRecordReview);
  
  // TODO is this correct?
  const includesOther = false;// DataSourceSelections
  //  .some((selection) => selection.match(/other/i));
  // TODO how do we find ECDS?
  const includesECDS = false;
  // TODO where do we find other measure specification?
  const otherSpecification = false;
  // If the measure was not found in the DB, it's not "N/A", it's "not reported"
  const isNotApplicable = !!measure &&
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
        // TODO: is it possible for an NDR rate to have only "numerator" with denominator empty and rate property missing entirely?
        .filter((rate): rate is RateNDRShape => "rate" in rate)
    );

  const uniqueRateIds = [...medicaidRates, ...chipRates]
    .map((rate) => rate.uid)
    .filter(isDefined)
    .filter((uid, i, arr) => i === arr.indexOf(uid));

  const rateField = (
    rate: RateNDRShape | undefined,
    field: keyof RateNDRShape
  ) => (rate?.[field] ? Number(rate?.[field]) : undefined);

  const useWeightedCalculation =
    DataSources.Medicaid.includesHybrid || DataSources.CHIP.includesHybrid;

  if (!useWeightedCalculation) {
    return uniqueRateIds.map((uid) => {
      const medicaidRate = medicaidRates.find((rate) => rate.uid === uid);
      const chipRate = chipRates.find((rate) => rate.uid === uid);

      // TODO: defaulting undefined numerator to zero
      // means we can't distinguish between unfilled rates
      // and actual user-provided zeroes. Edge case. Fix.
      const combinedNumerator =
        (rateField(medicaidRate, "numerator") ?? 0) +
        (rateField(chipRate, "numerator") ?? 0);
      const combinedDenominator =
        (rateField(medicaidRate, "denominator") ?? 0) +
        (rateField(chipRate, "denominator") ?? 0);
      // TODO, this could give us NaN, or Infinity.
      // What would be stored in the DB?
      // Maybe store undefined instead.
      const combinedRate = transformQuotient(
        measureAbbr,
        combinedNumerator / combinedDenominator
      );

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid: {
          isReported: !!medicaidRate,
          // TODO: this could turn undefineds into zeros. See above. Fix.
          numerator: rateField(medicaidRate, "numerator"),
          denominator: rateField(medicaidRate, "denominator"),
          rate: rateField(medicaidRate, "rate"),
        },
        CHIP: {
          isReported: !!chipRate,
          numerator: rateField(chipRate, "numerator"),
          denominator: rateField(chipRate, "denominator"),
          rate: rateField(chipRate, "rate"),
        },
        Combined: {
          isReported: true,
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

      const combinedNumerator =
        (rateField(medicaidRate, "numerator") ?? 0) +
        (rateField(chipRate, "numerator") ?? 0);
      const combinedDenominator =
        (rateField(medicaidRate, "denominator") ?? 0) +
        (rateField(chipRate, "denominator") ?? 0);

      // If there's a user-entered population for an admin source, use it.
      // TODO wtf. but ok fine. fix.
      const medicaidPopulation = DataSources.Medicaid.includesHybrid
        ? Number(medicaidMeasure?.data?.HybridMeasurePopulationIncluded ?? 0)
        : rateField(medicaidRate, "denominator") ?? 0;
      const chipPopulation = DataSources.CHIP.includesHybrid
        ? Number(chipMeasure?.data?.HybridMeasurePopulationIncluded ?? 0)
        : rateField(chipRate, "denominator") ?? 0;

      const totalPopulation = medicaidPopulation + chipPopulation;
      // TODO NaN, Inf. Fix.
      const medicaidWeight = medicaidPopulation / totalPopulation;
      const chipWeight = chipPopulation / totalPopulation;

      const medicaidWeightedRate =
        medicaidWeight * (rateField(medicaidRate, "rate") ?? 0);
      const chipWeightedRate =
        chipWeight * (rateField(chipRate, "rate") ?? 0);

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid: {
          isReported: !!medicaidRate,
          numerator: rateField(medicaidRate, "numerator"),
          denominator: rateField(medicaidRate, "denominator"),
          rate: rateField(medicaidRate, "rate"),
          population: medicaidPopulation,
          weightedRate: medicaidWeightedRate,
        },
        CHIP: {
          isReported: !!chipRate,
          numerator: rateField(chipRate, "numerator"),
          denominator: rateField(chipRate, "denominator"),
          rate: rateField(chipRate, "rate"),
          population: chipPopulation,
          weightedRate: chipWeightedRate,
        },
        Combined: {
          isReported: true,
          numerator: combinedNumerator,
          denominator: combinedDenominator,
          population: totalPopulation,
          weightedRate: medicaidWeightedRate + chipWeightedRate,
        },
      };
    });
  }
};

/**
 * Most measures display as a percentage, but certain measures are expressed
 * instead as per-thousand, per-hundred-thousand, or an inverted percent.
 */
const transformQuotient = (measureAbbr: string, quotient: number) => {
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
        .filter((rate): rate is RateValueShape => "value" in rate)
    );

  const findValues = (uid: string) => {
    const fieldObj = {
      uid,
    } as CombinedRatesPayload["AdditionalValues"][number];
    const medicaidValue = medicaidValues.find((rate) => rate.uid === uid);
    const chipValue = chipValues.find((rate) => rate.uid === uid);

    fieldObj.label = medicaidValue?.label ?? chipValue?.label ?? "";
    fieldObj.Medicaid = Number(medicaidValue?.value ?? 0);
    fieldObj.CHIP = Number(chipValue?.value ?? 0);

    return fieldObj;
  };

  if (measureAbbr === "CPU-AD") {
    const unreachable = findValues("HLXNLW.7dC1vt");
    const refusal = findValues("HLXNLW.6zIwnx");

    unreachable.Combined =
      (unreachable.Medicaid ?? 0) + (unreachable.CHIP ?? 0);
    refusal.Combined = (refusal.Medicaid ?? 0) + (refusal.CHIP ?? 0);

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

    stayCount.Combined = (stayCount.Medicaid ?? 0) + (stayCount.CHIP ?? 0);
    obsReadmissionCount.Combined =
      (obsReadmissionCount.Medicaid ?? 0) + (obsReadmissionCount.CHIP ?? 0);
    // TODO, NaN, Inf. Fix.
    obsReadmissionRate.Combined =
      (100 * obsReadmissionCount.Combined) / stayCount.Combined;
    expReadmissionCount.Combined =
      (expReadmissionCount.Medicaid ?? 0) + (expReadmissionCount.CHIP ?? 0);
    expReadmissionRate.Combined =
      (100 * expReadmissionCount.Combined) / stayCount.Combined;
    obsExpRatio.Combined =
      obsReadmissionRate.Combined / expReadmissionRate.Combined;
    beneficaryCount.Combined =
      (beneficaryCount.Medicaid ?? 0) + (beneficaryCount.CHIP ?? 0);
    outlierCount.Combined =
      (outlierCount.Medicaid ?? 0) + (outlierCount.CHIP ?? 0);
    outlierRate.Combined =
      1000 * outlierCount.Combined / beneficaryCount.Combined;

    // We used unrounded values during calculation; round them now.
    obsReadmissionRate.Combined = fixRounding(obsReadmissionRate.Combined, 4);
    expReadmissionCount.Combined = fixRounding(expReadmissionCount.Combined, 4);
    obsExpRatio.Combined = fixRounding(obsExpRatio.Combined, 4);
    outlierRate.Combined = fixRounding(outlierRate.Combined, 1);

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
