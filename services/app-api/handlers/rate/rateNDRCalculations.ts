import {
  CombinedRatesPayload,
  isRateNDRShape,
  Measure,
  WeightedRateShape,
} from "../../types";
import { isDefined } from "../../utils/filters";
import {
  addSafely,
  divideSafely,
  multiplySafely,
  parseQmrNumber,
  roundSafely,
} from "../../utils/math";

/**
 * This is the core of the combined rate calculations.
 * Crunches numbers for numerators, denominators, weights, and rates.
 */
export const combineRates = (
  measureAbbr: string,
  DataSources: CombinedRatesPayload["DataSources"],
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
): CombinedRatesPayload["Rates"] => {
  const [medicaidRates, chipRates] = [medicaidMeasure, chipMeasure]
    .map((measure) => measure?.data?.PerformanceMeasure?.rates ?? {})
    .map((rateMap) => Object.values(rateMap).flat(1).filter(isRateNDRShape));

  let uniqueRateIds = [...medicaidRates, ...chipRates]
    .map((rate) => rate.uid)
    .filter(isDefined)
    .filter((uid, i, arr) => i === arr.indexOf(uid))
    .filter((uid) => !ratesToNeverShow.includes(uid));

  if (
    DataSources.Medicaid.requiresWeightedCalc ||
    DataSources.CHIP.requiresWeightedCalc
  ) {
    /*
     * If either measure has a Hybrid data source, we calculate the combined
     * rate, weighted by the individual measures' eligible populations.
     */
    return uniqueRateIds.map((uid) => {
      const medicaidRate = medicaidRates.find((rate) => rate.uid === uid);
      const chipRate = chipRates.find((rate) => rate.uid === uid);

      const mNumerator = parseQmrNumber(medicaidRate?.numerator);
      const mDenominator = parseQmrNumber(medicaidRate?.denominator);
      const mRate = parseQmrNumber(medicaidRate?.rate);

      /*
       * For hybrid measures, we expect the user to enter the population.
       * For admin measures, we expect to use the rate's denominator instead.
       * But IF a user enters a population on an admin measure, we will use it.
       * Maybe we should disable the population input unless the user selects
       * a hybrid data source? It seems they shouldn't use it for admin.
       */
      let medicaidPopulation = parseQmrNumber(
        medicaidMeasure?.data?.HybridMeasurePopulationIncluded
      );
      if (
        medicaidPopulation === undefined &&
        !DataSources.Medicaid.requiresWeightedCalc
      ) {
        medicaidPopulation = mDenominator;
      }

      const Medicaid: WeightedRateShape = {
        numerator: mNumerator,
        denominator: mDenominator,
        rate: mRate,
        population: medicaidPopulation,
      };

      const cNumerator = parseQmrNumber(chipRate?.numerator);
      const cDenominator = parseQmrNumber(chipRate?.denominator);
      const cRate = parseQmrNumber(chipRate?.rate);

      let chipPopulation = parseQmrNumber(
        chipMeasure?.data?.HybridMeasurePopulationIncluded
      );
      if (
        chipPopulation === undefined &&
        !DataSources.CHIP.requiresWeightedCalc
      ) {
        chipPopulation = cDenominator;
      }

      const CHIP: WeightedRateShape = {
        numerator: cNumerator,
        denominator: cDenominator,
        rate: cRate,
        population: chipPopulation,
      };

      const medicaidUnusable =
        DataSources.Medicaid.isUnusableForCalc ||
        (mNumerator! > mDenominator! &&
          !PER_MONTH_MEASURES.includes(measureAbbr));
      const chipUnusable =
        DataSources.CHIP.isUnusableForCalc ||
        (cNumerator! > cDenominator! &&
          !PER_MONTH_MEASURES.includes(measureAbbr));

      let Combined;
      if (medicaidUnusable && chipUnusable) {
        Combined = {};
      } else if (medicaidUnusable) {
        CHIP.weightedRate = cRate;
        Combined = {
          population: chipPopulation,
          weightedRate: cRate,
        };
      } else if (chipUnusable) {
        Medicaid.weightedRate = mRate;
        Combined = {
          population: medicaidPopulation,
          weightedRate: mRate,
        };
      } else {
        const totalPopulation = addSafely(medicaidPopulation, chipPopulation);
        const mWeight = divideSafely(medicaidPopulation, totalPopulation);
        const cWeight = divideSafely(chipPopulation, totalPopulation);

        const mWeightedRate = multiplySafely(mWeight, mRate);
        const cWeightedRate = multiplySafely(cWeight, cRate);
        const combinedRate = addSafely(mWeightedRate, cWeightedRate);

        Medicaid.weightedRate = roundSafely(mWeightedRate, 1);
        CHIP.weightedRate = roundSafely(cWeightedRate, 1);
        Combined = {
          population: totalPopulation,
          weightedRate: roundSafely(combinedRate, 1),
        };
      }

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid,
        CHIP,
        Combined,
      };
    });
  } else {
    return uniqueRateIds.map((uid) => {
      const medicaidRate = medicaidRates.find((rate) => rate.uid === uid);
      const chipRate = chipRates.find((rate) => rate.uid === uid);

      const mNumerator = parseQmrNumber(medicaidRate?.numerator);
      const mDenominator = parseQmrNumber(medicaidRate?.denominator);
      const mRate = parseQmrNumber(medicaidRate?.rate);
      const Medicaid = {
        numerator: mNumerator,
        denominator: mDenominator,
        rate: mRate,
      };

      const cNumerator = parseQmrNumber(chipRate?.numerator);
      const cDenominator = parseQmrNumber(chipRate?.denominator);
      const cRate = parseQmrNumber(chipRate?.rate);
      const CHIP = {
        numerator: cNumerator,
        denominator: cDenominator,
        rate: cRate,
      };

      const medicaidUnusable =
        DataSources.Medicaid.isUnusableForCalc ||
        (mNumerator! > mDenominator! &&
          !PER_MONTH_MEASURES.includes(measureAbbr));
      const chipUnusable =
        DataSources.CHIP.isUnusableForCalc ||
        (cNumerator! > cDenominator! &&
          !PER_MONTH_MEASURES.includes(measureAbbr));

      let Combined;
      if (medicaidUnusable && chipUnusable) {
        Combined = {};
      } else if (medicaidUnusable) {
        Combined = { rate: cRate };
      } else if (chipUnusable) {
        Combined = { rate: mRate };
      } else {
        const combinedNumerator = addSafely(mNumerator, cNumerator);
        const combinedDenominator = addSafely(mDenominator, cDenominator);
        const quotient =
          combinedDenominator === 0
            ? 0
            : divideSafely(combinedNumerator, combinedDenominator);
        const combinedRate = transformQuotient(measureAbbr, quotient);

        Combined = {
          numerator: combinedNumerator,
          denominator: combinedDenominator,
          rate: roundSafely(combinedRate, 1),
        };
      }

      return {
        uid: uid,
        category: medicaidRate?.category ?? chipRate?.category,
        label: medicaidRate?.label ?? chipRate?.label,
        Medicaid,
        CHIP,
        Combined,
      };
    });
  }
};

/**
 * For certain measures, CMS uses a different formula for certain qualifiers.
 * However, for those measures, the "Total" qualifier still ends up correct.
 *
 * I am writing this comment two days from go-live, so our decision is
 * to simply hide the rates for those individual qualifiers.
 */
const ratesToNeverShow = [
  // DEV-CH: never show the individual age group rates
  "rnFOY6.V9moUD", // by 12 months
  "rnFOY6.8syeJa", // by 24 months
  "rnFOY6.UjlL0h", // by 36 months
  // WCC-CH: never show the individual age group rates
  "4TXd3h.iWwR8Z", // BMI, 3-11
  "4TXd3h.BFwD7g", // BMI, 12-17
  "cKH5gj.iWwR8Z", // Nutrition, 3-11
  "cKH5gj.BFwD7g", // Nutrition, 12-17
  "1POxYx.iWwR8Z", // Activity, 3-11
  "1POxYx.BFwD7g", // Activity, 12-17
];

/**
 * Most measures display as a percentage, but certain measures are expressed
 * instead as per-thousand, per-hundred-thousand, or an inverted percent.
 */
const transformQuotient = (
  measureAbbr: string,
  quotient: number | undefined
) => {
  if (quotient === undefined) return undefined;
  switch (measureAbbr) {
    case "AAB-AD":
    case "AAB-CH":
      return (1 - quotient) * 100;
    case "AMB-CH":
      return quotient * 1000;
    case "PQI01-AD":
    case "PQI05-AD":
    case "PQI08-AD":
    case "PQI15-AD":
    case "EDV-AD":
      return quotient * 100000;
    default:
      return quotient * 100;
  }
};

/**
 * For most measures, the numerator cannot exceed the denominator.
 * If it does, we will not compute a combined rate.
 * These measures are special; their numerators *can* exceed their denominators.
 *
 * Specifically, these measures track data "per 100,000 beneficiary months".
 */
const PER_MONTH_MEASURES = [
  "PQI01-AD",
  "PQI05-AD",
  "PQI08-AD",
  "PQI15-AD",
  "EDV-AD",
];
