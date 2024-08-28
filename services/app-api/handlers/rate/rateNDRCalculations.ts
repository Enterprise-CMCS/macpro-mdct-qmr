import {
  CombinedRatesPayload,
  isDefined,
  isRateNDRShape,
  Measure,
  WeightedRateShape,
} from "../../types";
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
    // If either measure has a Hybrid data source, we calculate the combined
    // rate, weighted by the individual measures' eligible populations.
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

      let Combined;
      if (
        (DataSources.Medicaid.isUnusableForCalc ||
          mNumerator! > mDenominator!) &&
        (DataSources.CHIP.isUnusableForCalc || cNumerator! > cDenominator!)
      ) {
        Combined = {};
      } else if (
        DataSources.Medicaid.isUnusableForCalc ||
        mNumerator! > mDenominator!
      ) {
        CHIP.weightedRate = cRate;
        Combined = {
          population: chipPopulation,
          weightedRate: cRate,
        };
      } else if (
        DataSources.CHIP.isUnusableForCalc ||
        cNumerator! > cDenominator!
      ) {
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

      let Combined;
      if (
        (DataSources.Medicaid.isUnusableForCalc ||
          mNumerator! > mDenominator!) &&
        (DataSources.CHIP.isUnusableForCalc || cNumerator! > cDenominator!)
      ) {
        Combined = {};
      } else if (
        DataSources.Medicaid.isUnusableForCalc ||
        mNumerator! > mDenominator!
      ) {
        Combined = { rate: cRate };
      } else if (
        DataSources.CHIP.isUnusableForCalc ||
        cNumerator! > cDenominator!
      ) {
        Combined = { rate: mRate };
      } else {
        const combinedNumerator = addSafely(mNumerator, cNumerator);
        const combinedDenominator = addSafely(mDenominator, cDenominator);
        const quotient = divideSafely(combinedNumerator, combinedDenominator);
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
