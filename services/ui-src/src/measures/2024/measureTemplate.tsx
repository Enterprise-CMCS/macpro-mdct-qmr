import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";
import { measureTemplateData } from "./measureTemplateData";

export const measureTemplate = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();

  const measure = measureTemplateData[measureId];

  const {
    type,
    coreset,
    performanceMeasure,
    dataSource,
    hybridMeasure,
    custom,
    opm,
  } = measure.data;
  const performanceMeasureArray = getPerfMeasureRateArray(
    data,
    performanceMeasure
  );

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions({
        data: measure.data,
        functions: measure.validationFunctions,
      });
    }
  }, [setValidationFunctions]);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
        removeLessThan30={custom?.removeLessThan30}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type={type} coreset={coreset} />
          {custom?.dataSrcRadio ? (
            <CMQ.DataSourceRadio />
          ) : (
            <CMQ.DataSource data={dataSource} type={coreset} />
          )}
          <CMQ.DateRange type={coreset} />
          <CMQ.DefinitionOfPopulation
            coreset={coreset}
            hybridMeasure={hybridMeasure}
            populationSampleSize={custom?.populationSampleSize}
          />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={performanceMeasure}
                calcTotal={custom?.calcTotal}
                customMask={custom?.customMask}
                rateScale={custom?.rateScale}
                allowNumeratorGreaterThanDenominator={
                  custom?.allowNumeratorGreaterThanDenominator
                }
                showtextbox={custom?.showtextbox}
                hybridMeasure={hybridMeasure}
                rateReadOnly={custom?.rateReadOnly}
                rateCalc={custom?.rateCalc}
                RateComponent={custom?.RateComponent}
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customPrompt={custom?.customPrompt}
              customMask={custom?.customMask}
              rateMultiplicationValue={custom?.rateScale}
              allowNumeratorGreaterThanDenominator={
                custom?.allowNumeratorGreaterThanDenominator
              }
            />
          )}
          {showOptionalMeasureStrat &&
            (custom?.notCollectingOMS ? (
              <CMQ.NotCollectingOMS year={year} />
            ) : (
              <CMQ.OptionalMeasureStrat
                coreset={coreset}
                calcTotal={custom?.calcTotal}
                performanceMeasureArray={performanceMeasureArray}
                qualifiers={performanceMeasure.qualifiers}
                categories={performanceMeasure.categories}
                customMask={custom?.customMask}
                rateMultiplicationValue={custom?.rateScale}
                allowNumeratorGreaterThanDenominator={
                  custom?.allowNumeratorGreaterThanDenominator
                }
                componentFlag={opm?.componentFlag}
                excludeOptions={opm?.excludeOptions}
                customPrompt={custom?.customPrompt}
                rateCalc={custom?.rateCalc}
                inputFieldNames={performanceMeasure?.inputFieldNames}
                ndrFormulas={performanceMeasure?.ndrFormulas}
                measureName={performanceMeasure?.measureName}
              />
            ))}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
