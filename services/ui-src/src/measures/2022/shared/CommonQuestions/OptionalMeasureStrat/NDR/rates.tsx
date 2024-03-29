import * as DC from "dataConstants";
import * as QMR from "components";
import { cleanString } from "utils";
import { ContextProps, usePerformanceMeasureContext } from "../context";

type RateArrayBuilder = (name: string) => React.ReactElement[][];

const RateRender = (context: ContextProps, name: string, label?: string) => {
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

const ComplexRateRender = (
  context: ContextProps,
  name: string,
  label?: string
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
      categoryName={""}
    />
  );
};

/** Creates Rate Component Arrays for every category with a filled qualifier */
export const useStandardRateArray: RateArrayBuilder = (name) => {
  const context: ContextProps = usePerformanceMeasureContext();
  const {
    qualifiers,
    calcTotal,
    performanceMeasureArray,
    IUHHPerformanceMeasureArray,
  } = context;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((qual, qualIndex) => {
    let ndrSets: React.ReactElement[] = [];
    if (IUHHPerformanceMeasureArray) {
      ndrSets = IUHHRateArrayQualifierAndTotals(context, name, qual, qualIndex);
    } else if (performanceMeasureArray) {
      ndrSets = StandardPerformanceMeasure(context, name, qual, qualIndex);
    }
    rateArrays.push(ndrSets);
  });

  return rateArrays;
};

const StandardPerformanceMeasure = (
  context: ContextProps,
  name: string,
  qual: string,
  qualIndex: number
) => {
  const { performanceMeasureArray, categories } = context;
  const ndrSets: React.ReactElement[] = [];

  performanceMeasureArray?.forEach((measure, idx) => {
    if (measure?.[qualIndex]?.rate) {
      const adjustedName = `${name}.rates.${cleanString(qual)}.${cleanString(
        categories[idx]
      )}`;
      ndrSets.push(RateRender(context, adjustedName, categories[idx]));
    }
  });
  return ndrSets;
};

//used for year <= 2022
const IUHHRateArrayQualifierAndTotals = (
  context: ContextProps,
  name: string,
  qual: string,
  qualIndex: number
) => {
  const { IUHHPerformanceMeasureArray, categories } = context;
  const ndrSets: React.ReactElement[] = [];

  IUHHPerformanceMeasureArray?.forEach((category, idx) => {
    // The shape of Maternity is different than all other Categories
    if (idx === 1) {
      category = [{}, category[0], {}, category[1], category[2]];
    }
    const cleanedName = `${name}.rates.${cleanString(qual)}.${cleanString(
      categories[idx]
    )}`;

    // Confirm that there is at least 1 rate complete
    const rate1 = !!category?.[qualIndex]?.fields?.[2]?.value;
    const rate2 = !!category?.[qualIndex]?.fields?.[4]?.value;
    const rate3 = !!category?.[qualIndex]?.fields?.[5]?.value;

    if (rate1 || rate2 || rate3) {
      ndrSets.push(ComplexRateRender(context, cleanedName, categories[idx]));
    }
  });
  return ndrSets;
};

/** Creates Rate Components for each Qualifier if filled in PM */
export const useQualRateArray: RateArrayBuilder = (name) => {
  const context: ContextProps = usePerformanceMeasureContext();
  const {
    qualifiers,
    calcTotal,
    performanceMeasureArray,
    AIFHHPerformanceMeasureArray,
  } = context;
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  let rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    const cleanedName = `${name}.rates.${cleanString(singleQual)}.${
      DC.SINGLE_CATEGORY
    }`;
    if (performanceMeasureArray?.[0]?.[qualIndex]?.rate) {
      rateArrays.push([RateRender(context, cleanedName)]);
    } else if (AIFHHPerformanceMeasureArray) {
      rateArrays = AIFHHRateArray(context, cleanedName, qualIndex);
    } else {
      rateArrays.push([]);
    }
  });

  return rateArrays;
};

const AIFHHRateArray = (
  context: ContextProps,
  name: string,
  qualIndex: number
) => {
  const { AIFHHPerformanceMeasureArray } = context;
  const rateArrays: React.ReactElement[][] = [];
  AIFHHPerformanceMeasureArray?.forEach((measure) => {
    //Confirm that there is at least 1 rate complete
    const rate1 = !!measure?.[qualIndex]?.fields?.[2]?.value;
    const rate2 = !!measure?.[qualIndex]?.fields?.[4]?.value;
    const rate3 = !!measure?.[qualIndex]?.fields?.[6]?.value;
    const rate =
      rate1 || rate2 || rate3 ? [ComplexRateRender(context, name)] : [];
    rateArrays.push(rate);
  });
  return rateArrays;
};
