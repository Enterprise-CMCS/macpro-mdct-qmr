import * as DC from "dataConstants";
import * as QMR from "components";
import { cleanString } from "utils";
import { usePerformanceMeasureContext } from "../context";
type RateArrayBuilder = (name: string) => React.ReactElement[][];

/** Creates Rate Component Arrays for every category with a filled qualifier */
export const useStandardRateArray: RateArrayBuilder = (name) => {
  const {
    categories,
    qualifiers,
    measureName,
    inputFieldNames,
    ndrFormulas,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    IUHHPerformanceMeasureArray,
    rateMultiplicationValue,
    rateReadOnly,
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    const ndrSets: React.ReactElement[] = [];

    if (IUHHPerformanceMeasureArray) {
      IUHHPerformanceMeasureArray?.forEach((category, idx) => {
        // The shape of Maternity is different than all other Categories
        if (idx === 1) {
          category = [{}, category[0], {}, category[1], category[2]];
        }
        const cleanQual = cleanString(singleQual);
        const cleanCat = cleanString(categories[idx]);
        const cleanedName = `${name}.rates.${cleanQual}.${cleanCat}`;

        // Confirm that there is at least 1 rate complete
        const rate1 = category?.[qualIndex]?.fields?.[2]?.value ? true : false;
        const rate2 = category?.[qualIndex]?.fields?.[4]?.value ? true : false;
        const rate3 = category?.[qualIndex]?.fields?.[5]?.value ? true : false;
        if (rate1 || rate2 || rate3) {
          ndrSets.push(
            <QMR.ComplexRate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rates={[
                {
                  id: 0,
                  label: categories[idx],
                },
              ]}
              categoryName={""}
            />
          );
        }
      });
    } else if (performanceMeasureArray) {
      performanceMeasureArray?.forEach((measure, idx) => {
        if (measure?.[qualIndex]?.rate) {
          const adjustedName = `${name}.rates.${cleanString(
            singleQual
          )}.${cleanString(categories[idx])}`;

          ndrSets.push(
            <QMR.Rate
              readOnly={rateReadOnly}
              name={adjustedName}
              key={adjustedName}
              rateMultiplicationValue={rateMultiplicationValue}
              allowNumeratorGreaterThanDenominator={
                allowNumeratorGreaterThanDenominator
              }
              customNumeratorLabel={customNumeratorLabel}
              customDenominatorLabel={customDenominatorLabel}
              customRateLabel={customRateLabel}
              customMask={customMask}
              rates={[
                {
                  id: 0,
                  label: categories[idx],
                },
              ]}
            />
          );
        }
      });
    }
    rateArrays.push(ndrSets);
  });
  return rateArrays;
};

/** Creates Rate Components for each Qualifier if filled in PM */
export const useQualRateArray: RateArrayBuilder = (name) => {
  const {
    qualifiers,
    measureName,
    inputFieldNames,
    ndrFormulas,
    calcTotal,
    allowNumeratorGreaterThanDenominator,
    customMask,
    performanceMeasureArray,
    rateMultiplicationValue,
    AIFHHPerformanceMeasureArray,
    rateReadOnly,
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  quals?.forEach((singleQual, qualIndex) => {
    if (performanceMeasureArray?.[0]?.[qualIndex]?.rate) {
      const cleanedName = `${name}.rates.${cleanString(singleQual)}.${
        DC.SINGLE_CATEGORY
      }`;

      rateArrays.push([
        <QMR.Rate
          readOnly={rateReadOnly}
          name={cleanedName}
          key={cleanedName}
          rateMultiplicationValue={rateMultiplicationValue}
          allowNumeratorGreaterThanDenominator={
            allowNumeratorGreaterThanDenominator
          }
          customNumeratorLabel={customNumeratorLabel}
          customDenominatorLabel={customDenominatorLabel}
          customRateLabel={customRateLabel}
          customMask={customMask}
          rates={[{ id: 0 }]}
        />,
      ]);
    } else if (AIFHHPerformanceMeasureArray) {
      AIFHHPerformanceMeasureArray?.forEach((measure) => {
        const cleanedName = `${name}.rates.${cleanString(singleQual)}.${
          DC.SINGLE_CATEGORY
        }`;
        //Confirm that there is at least 1 rate complete
        const rate1 = measure?.[qualIndex]?.fields?.[2]?.value ? true : false;
        const rate2 = measure?.[qualIndex]?.fields?.[4]?.value ? true : false;
        const rate3 = measure?.[qualIndex]?.fields?.[6]?.value ? true : false;
        if (rate1 || rate2 || rate3) {
          rateArrays.push([
            <QMR.ComplexRate
              readOnly={rateReadOnly}
              name={cleanedName}
              key={cleanedName}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rates={[
                {
                  id: 0,
                },
              ]}
            />,
          ]);
        } else {
          rateArrays.push([]);
        }
      });
    } else {
      rateArrays.push([]);
    }
  });

  return rateArrays;
};
