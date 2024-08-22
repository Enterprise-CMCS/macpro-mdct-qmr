import { CombinedRatesPayload, isRateValueShape, Measure } from "../../types";
import {
  addSafely,
  divideSafely,
  multiplySafely,
  parseQmrNumber,
  roundSafely,
} from "../../utils/math";

/**
 * Certain measures (CPU-AD, PCR-AD) contain information that doesn't fit into
 * the usual Numerator-Denominator-Rate format. But we still want to combine
 * the Medicaid data with the CHIP data. That is done here.
 */
export const calculateAdditionalValues = (
  measureAbbr: string,
  DataSources: CombinedRatesPayload["DataSources"],
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
): CombinedRatesPayload["AdditionalValues"] => {
  const [medicaidValues, chipValues] = [medicaidMeasure, chipMeasure]
    .map((measure) => measure?.data?.PerformanceMeasure?.rates ?? {})
    .map((rateMap) => Object.values(rateMap).flat(1).filter(isRateValueShape));

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

    if (
      DataSources.Medicaid.isUnusableForCalc &&
      DataSources.CHIP.isUnusableForCalc
    ) {
      // Both unusable? Nothing to combine.
    } else if (DataSources.Medicaid.isUnusableForCalc) {
      unreachable.Combined = unreachable.CHIP;
      refusal.Combined = refusal.CHIP;
    } else if (DataSources.CHIP.isUnusableForCalc) {
      unreachable.Combined = unreachable.Medicaid;
      refusal.Combined = refusal.Medicaid;
    } else {
      unreachable.Combined = addSafely(unreachable.Medicaid, unreachable.CHIP);
      refusal.Combined = addSafely(refusal.Medicaid, refusal.CHIP);
    }

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

    if (
      DataSources.Medicaid.isUnusableForCalc &&
      DataSources.CHIP.isUnusableForCalc
    ) {
      // Both unusable? Nothing to combine.
    } else if (DataSources.Medicaid.isUnusableForCalc) {
      stayCount.Combined = stayCount.CHIP;
      obsReadmissionCount.Combined = obsReadmissionCount.CHIP;
      obsReadmissionRate.Combined = obsReadmissionRate.CHIP;
      expReadmissionCount.Combined = expReadmissionCount.CHIP;
      expReadmissionRate.Combined = expReadmissionRate.CHIP;
      obsExpRatio.Combined = obsExpRatio.CHIP;
      beneficaryCount.Combined = beneficaryCount.CHIP;
      outlierCount.Combined = outlierCount.CHIP;
      outlierRate.Combined = outlierRate.CHIP;
    } else if (DataSources.CHIP.isUnusableForCalc) {
      stayCount.Combined = stayCount.CHIP;
      obsReadmissionCount.Combined = obsReadmissionCount.Medicaid;
      obsReadmissionRate.Combined = obsReadmissionRate.Medicaid;
      expReadmissionCount.Combined = expReadmissionCount.Medicaid;
      expReadmissionRate.Combined = expReadmissionRate.Medicaid;
      obsExpRatio.Combined = obsExpRatio.Medicaid;
      beneficaryCount.Combined = beneficaryCount.Medicaid;
      outlierCount.Combined = outlierCount.Medicaid;
      outlierRate.Combined = outlierRate.Medicaid;
    } else {
      stayCount.Combined = addSafely(stayCount.Medicaid, stayCount.CHIP);
      obsReadmissionCount.Combined = addSafely(
        obsReadmissionCount.Medicaid,
        obsReadmissionCount.CHIP
      );
      obsReadmissionRate.Combined = multiplySafely(
        divideSafely(obsReadmissionCount.Combined, stayCount.Combined),
        100
      );
      expReadmissionCount.Combined = addSafely(
        expReadmissionCount.Medicaid,
        expReadmissionCount.CHIP
      );
      expReadmissionRate.Combined = multiplySafely(
        divideSafely(expReadmissionCount.Combined, stayCount.Combined),
        100
      );
      obsExpRatio.Combined = divideSafely(
        obsReadmissionRate.Combined,
        expReadmissionRate.Combined
      );
      beneficaryCount.Combined = addSafely(
        beneficaryCount.Medicaid,
        beneficaryCount.CHIP
      );
      outlierCount.Combined = addSafely(
        outlierCount.Medicaid,
        outlierCount.CHIP
      );
      outlierRate.Combined = multiplySafely(
        divideSafely(outlierCount.Combined, beneficaryCount.Combined),
        1000
      );
    }

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
