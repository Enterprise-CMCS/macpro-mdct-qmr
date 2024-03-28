import * as DC from "dataConstants";
import * as QMR from "components";
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
    rateCalculation,
  } = usePerformanceMeasureContext();
  const rateArrays: React.ReactElement[][] = [];

  //categories at this point has been filtered by excludeFromOMS
  categories?.forEach((cat) => {
    const ndrSets: React.ReactElement[] = [];

    if (IUHHPerformanceMeasureArray) {
      const quals = IUHHPerformanceMeasureArray.flatMap((arr) =>
        arr.filter(
          (rate) =>
            rate.uid?.includes(cat.id) &&
            (calcTotal ? !rate.uid?.includes("Total") : true)
        )
      );

      quals?.forEach((qual) => {
        const cleanedName = `${name}.rates.${qual.uid}`;

        // Confirm that there is at least 1 rate complete
        const rate1 = qual.fields?.[2]?.value ? true : false;
        const rate2 = qual.fields?.[4]?.value ? true : false;
        const rate3 = qual.fields?.[5]?.value ? true : false;
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
                  label: qual.label,
                },
              ]}
              categoryName={""}
            />
          );
        }
      });
    } else if (performanceMeasureArray) {
      //Used performanceMeasureArray over qualifiers because in OMS, we want to capture OMS n/d/r from performance measure qualifiers that had values added
      const rateQuals = performanceMeasureArray.flatMap((arr) =>
        arr.filter(
          (rate) =>
            rate.uid?.includes(cat.id) &&
            (calcTotal ? !rate.uid?.includes("Total") : true)
        )
      );

      //performanceMeasureArray does not do a filter for excludedFromOMS so we need a second filter to remove excluded qualifiers from oms.
      const unexcludedQuals = rateQuals.filter((rateQual) =>
        qualifiers.find((qual) => rateQual.uid?.includes(qual.id))
      );

      unexcludedQuals?.forEach((qual) => {
        if (qual.rate) {
          const adjustedName = `${name}.rates.${qual.uid}`; //uid is both category id appended to qualifier id

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
              rateCalc={rateCalculation}
              rates={[
                {
                  id: 0,
                  label: qual.label,
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
export const useRatesForCompletedPmQualifiers: RateArrayBuilder = (name) => {
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
    rateMultiplicationValue,
    AIFHHPerformanceMeasureArray,
    rateReadOnly,
    customDenominatorLabel,
    customNumeratorLabel,
    customRateLabel,
    rateCalculation,
  } = usePerformanceMeasureContext();
  const quals = calcTotal ? qualifiers.slice(0, -1) : qualifiers;
  const rateArrays: React.ReactElement[][] = [];

  /*
   * Each qualifier should only show in OMS if the rate for that qualifier
   * has been filled out in the Performance Measure.
   * This is determined by pulling the qualifier ID out of the rate UID.
   */
  const completedQualifierIds = performanceMeasureArray?.[0]
    ?.filter((qualRateFields) => qualRateFields?.rate)
    .map((qualRateFields) => qualRateFields.uid?.split(".")[1]);

  quals?.forEach((singleQual, qualIndex) => {
    const categoryID = categories[0]?.id
      ? categories[0].id
      : DC.SINGLE_CATEGORY;
    const cleanedName = `${name}.rates.${categoryID}.${singleQual.id}`;

    if (completedQualifierIds?.includes(singleQual.id)) {
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
          rateCalc={rateCalculation}
          rates={[{ id: 0 }]}
        />,
      ]);
    } else if (AIFHHPerformanceMeasureArray) {
      AIFHHPerformanceMeasureArray?.forEach((measure) => {
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
