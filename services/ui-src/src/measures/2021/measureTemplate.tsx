import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";
import { measureByYearTest } from "measures";

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

  const measure = measureByYearTest[2020][measureId];

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
      setValidationFunctions(measure.validationFunctions);
    }
  }, [setValidationFunctions]);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type={type} />
          <CMQ.DataSource data={dataSource} />
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
              />
              <CMQ.DeviationFromMeasureSpecificationCheckboxes
                categories={performanceMeasure.categories}
                customTotalLabel={custom?.customTotalLabel}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customMask={custom?.customMask}
              rateMultiplicationValue={custom?.rateScale}
              allowNumeratorGreaterThanDenominator={
                custom?.allowNumeratorGreaterThanDenominator
              }
            />
          )}
          <CMQ.CombinedRates />
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
              excludeOptions={opm?.excludeOptions}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
