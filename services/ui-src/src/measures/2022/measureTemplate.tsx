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
    inputFieldNames,
  } = measure.data;
  const performanceMeasureArray = getPerfMeasureRateArray(
    data,
    performanceMeasure
  );

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(measure.validationFunctions);
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
          <CMQ.MeasurementSpecification type={type} />
          {custom?.dataSrcRadio ? (
            <CMQ.DataSourceRadio />
          ) : (
            <CMQ.DataSource data={dataSource} />
          )}
          <CMQ.DateRange type={coreset} />
          <CMQ.DefinitionOfPopulation
            coreset={coreset}
            hybridMeasure={hybridMeasure}
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
                RateComponent={custom.RateComponent}
                rateCalc={custom?.rateCalc}
              />
              <CMQ.DeviationFromMeasureSpecificationCheckboxes
                categories={performanceMeasure.categories}
                customTotalLabel={custom?.customTotalLabel}
                measureName={measureId}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customMask={custom?.customMask}
              customPrompt={custom?.customPrompt}
              rateMultiplicationValue={custom?.rateScale}
              allowNumeratorGreaterThanDenominator={
                custom?.allowNumeratorGreaterThanDenominator
              }
            />
          )}
          <CMQ.CombinedRates coreset={coreset} />
          {showOptionalMeasureStrat && (
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
              inputFieldNames={opm?.inputFieldNames}
              componentFlag={opm?.componentFlag}
              ndrFormulas={opm?.ndrFormulas}
              customPrompt={custom?.customPrompt}
              excludeOptions={opm?.excludeOptions}
              measureName={measureId}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
