import * as DC from "dataConstants";
import * as QMR from "components";
import { LabelData, isLegacyLabel } from "utils";
import { ContextProps, usePerformanceMeasureContext } from "../context";
import { complexRateFields } from "shared/types";

type RateArrayBuilder = (name: string) => React.ReactElement[][];

const RateComponent = (context: ContextProps, name: string, label?: string) => {
  return (
    <QMR.Rate
      readOnly={context.rateReadOnly}
      name={name}
      key={name}
      rateMultiplicationValue={context.rateMultiplicationValue}
      allowNumeratorGreaterThanDenominator={
        context.allowNumeratorGreaterThanDenominator
      }
      customNumeratorLabel={context.customNumeratorLabel}
      customDenominatorLabel={context.customDenominatorLabel}
      customRateLabel={context.customRateLabel}
      customMask={context.customMask}
      rateCalc={context.rateCalculation}
      rates={[
        {
          id: 0,
          label: label,
        },
      ]}
    />
  );
};

const ComplexRateComponent = (
  context: ContextProps,
  name: string,
  label?: string,
  categoryName?: string
) => {
  return (
    <QMR.ComplexRate
      readOnly={context.rateReadOnly}
      name={name}
      key={name}
      measureName={context.measureName}
      inputFieldNames={context.inputFieldNames}
      ndrFormulas={context.ndrFormulas}
      rates={[
        {
          id: 0,
          label: label,
        },
      ]}
      categoryName={categoryName}
    />
  );
};

/** Creates Rate Component Arrays for every category with a filled qualifier */
export const useStandardRateArray: RateArrayBuilder = (name) => {
  const context: ContextProps = usePerformanceMeasureContext();
  const {
    categories,
    performanceMeasureArray,
    calcTotal,
    qualifiers,
    measureName,
  } = context;

  const rateArrays: React.ReactElement[][] = [];

  if (isLegacyLabel()) {
    const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
    quals?.forEach((qual: LabelData, qualIndex) => {
      let ndrSets: React.ReactElement[] = [];
      if (measureName === "IUHH") {
        ndrSets = IUHHRateArrayQualifierAndTotals(
          context,
          name,
          categories,
          qual,
          qualIndex
        );
      } else if (performanceMeasureArray) {
        ndrSets = StandardPerformanceMeasureLegacy(
          context,
          name,
          categories,
          qual,
          qualIndex
        );
      }
      rateArrays.push(ndrSets);
    });
  } else {
    //categories at this point has been filtered by excludeFromOMS
    (categories as LabelData[])?.forEach((cat) => {
      let ndrSets: React.ReactElement[] = [];
      if (measureName === "IUHH") {
        ndrSets = IUHHRateArrayTotalsOnly(context, name, cat);
      } else if (performanceMeasureArray) {
        ndrSets = StandardPerformanceMeasure(context, name, cat);
      }
      rateArrays.push(ndrSets);
    });
  }
  return rateArrays;
};

/** Creates Rate Components for each Qualifier if filled in PM */
export const useRatesForCompletedPmQualifiers: RateArrayBuilder = (name) => {
  const context: ContextProps = usePerformanceMeasureContext();
  const {
    qualifiers,
    categories,
    calcTotal,
    performanceMeasureArray,
    measureName,
  } = context;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  let rateArrays: React.ReactElement[][] = [];
  /*
   * Each qualifier should only show in OMS if the rate for that qualifier
   * has been filled out in the Performance Measure.
   * This is determined by pulling the qualifier ID out of the rate UID.
   */
  const completedQualifierIds = performanceMeasureArray?.[0]
    ?.filter((qualRateFields) => qualRateFields?.rate)
    .map((qualRateFields) => qualRateFields.uid?.split(".")[1]);

  (quals as LabelData[])?.forEach((singleQual, qualIndex) => {
    const categoryID =
      (categories as LabelData[])?.[0]?.id || DC.SINGLE_CATEGORY;

    const cleanedName = `${name}.rates.${categoryID}.${singleQual.id}`;
    if (measureName === "AIFHH") {
      rateArrays.push(...AIFHHRateArray(context, cleanedName, qualIndex));
    } else if (completedQualifierIds?.includes(singleQual.id)) {
      rateArrays.push([RateComponent(context, cleanedName)]);
    } else {
      rateArrays.push([]);
    }
  });

  return rateArrays;
};

/** Creates Rate Components for each Qualifier if filled in PM */
export const useQualRateArray: RateArrayBuilder = (name) => {
  const context: ContextProps = usePerformanceMeasureContext();
  const { qualifiers, calcTotal, performanceMeasureArray, measureName } =
    context;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  let rateArrays: React.ReactElement[][] = [];

  quals.forEach((singleQual, qualIndex) => {
    const cleanedName = `${name}.rates.${singleQual.id}.${DC.SINGLE_CATEGORY}`;
    if (measureName === "AIFHH") {
      rateArrays.push(...AIFHHRateArray(context, cleanedName, qualIndex));
    } else if (performanceMeasureArray?.[0]?.[qualIndex]?.rate) {
      rateArrays.push([RateComponent(context, cleanedName)]);
    } else {
      rateArrays.push([]);
    }
  });

  return rateArrays;
};

//used for year >= 2023
const StandardPerformanceMeasure = (
  context: ContextProps,
  name: string,
  cat: LabelData
) => {
  const { performanceMeasureArray, qualifiers, calcTotal } = context;
  let ndrSets: React.ReactElement[] = [];
  //Used performanceMeasureArray over qualifiers because in OMS, we want to capture OMS n/d/r from performance measure qualifiers that had values added
  const rateQuals = performanceMeasureArray!.flatMap((arr) =>
    arr.filter(
      (rate) =>
        rate.uid?.includes(cat.id) &&
        (calcTotal ? !rate.uid?.includes("Total") : true)
    )
  );
  //performanceMeasureArray does not do a filter for excludedFromOMS so we need a second filter to remove excluded qualifiers from oms.
  const unexcludedQuals = rateQuals.filter((rateQual) =>
    (qualifiers as LabelData[]).find((qual) => rateQual.uid?.includes(qual.id))
  );
  unexcludedQuals?.forEach((qual) => {
    if (qual.rate) {
      const adjustedName = `${name}.rates.${qual.uid}`; //uid is both category id appended to qualifier id
      ndrSets.push(RateComponent(context, adjustedName, qual.label));
    }
  });
  return ndrSets;
};

//used before the great label to id migration of 2023
const StandardPerformanceMeasureLegacy = (
  context: ContextProps,
  name: string,
  categories: LabelData[],
  qual: LabelData,
  qualIndex: number
) => {
  const { performanceMeasureArray } = context;
  const ndrSets: React.ReactElement[] = [];

  performanceMeasureArray?.forEach((measure, idx) => {
    if (measure?.[qualIndex]?.rate) {
      const adjustedName = `${name}.rates.${qual.id}.${categories[idx]?.id}`;
      ndrSets.push(
        RateComponent(context, adjustedName, categories[idx]?.label)
      );
    }
  });
  return ndrSets;
};

//used for year >= 2023
const IUHHRateArrayTotalsOnly = (
  context: ContextProps,
  name: string,
  cat: LabelData
) => {
  const { performanceMeasureArray, calcTotal } = context;
  const ndrSets: React.ReactElement[] = [];
  const quals = (performanceMeasureArray as complexRateFields[][])?.flatMap(
    (arr) =>
      arr.filter(
        (rate) =>
          rate.uid?.includes(cat.id) &&
          (calcTotal ? !rate.uid?.includes("Total") : true)
      )
  );
  quals?.forEach((qual) => {
    const cleanedName = `${name}.rates.${qual.uid}`;
    // Confirm that there is at least 1 rate complete
    const rate1 = !!qual.fields?.[2]?.value;
    const rate2 = !!qual.fields?.[4]?.value;
    const rate3 = !!qual.fields?.[5]?.value;
    if (rate1 || rate2 || rate3) {
      ndrSets.push(ComplexRateComponent(context, cleanedName, qual.label));
    }
  });
  return ndrSets;
};

//used for year <= 2022
const IUHHRateArrayQualifierAndTotals = (
  context: ContextProps,
  name: string,
  categories: LabelData[],
  qual: LabelData,
  qualIndex: number
) => {
  const { performanceMeasureArray } = context;
  const ndrSets: React.ReactElement[] = [];

  (performanceMeasureArray as complexRateFields[][])?.forEach(
    (category, idx) => {
      // The shape of Maternity is different than all other Categories
      if (idx === 1) {
        category = [{}, category[0], {}, category[1], category[2]];
      }
      const cleanedName = `${name}.rates.${qual.id}.${categories[idx].id}`;

      // Confirm that there is at least 1 rate complete
      const rate1 = !!category?.[qualIndex]?.fields?.[2]?.value;
      const rate2 = !!category?.[qualIndex]?.fields?.[4]?.value;
      const rate3 = !!category?.[qualIndex]?.fields?.[5]?.value;

      if (rate1 || rate2 || rate3) {
        ndrSets.push(
          ComplexRateComponent(context, cleanedName, categories[idx].label, "")
        );
      }
    }
  );
  return ndrSets;
};

const AIFHHRateArray = (
  context: ContextProps,
  name: string,
  qualIndex: number
) => {
  const { performanceMeasureArray } = context;
  const rateArrays: React.ReactElement[][] = [];
  (performanceMeasureArray as complexRateFields[][])?.forEach((measure) => {
    const label = measure?.[qualIndex]?.label;
    //Confirm that there is at least 1 rate complete
    const rate1 = !!measure?.[qualIndex]?.fields?.[2]?.value;
    const rate2 = !!measure?.[qualIndex]?.fields?.[4]?.value;
    const rate3 = !!measure?.[qualIndex]?.fields?.[6]?.value;
    const rate =
      rate1 || rate2 || rate3
        ? [ComplexRateComponent(context, name, label)]
        : [];
    rateArrays.push(rate);
  });
  return rateArrays;
};
