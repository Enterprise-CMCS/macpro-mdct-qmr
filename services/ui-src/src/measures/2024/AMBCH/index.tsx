import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "measures/2024/shared/globalValidations";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormData as FormData } from "measures/2024/shared/CommonQuestions/types";

export const AMBCH = ({
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
  let mask: RegExp = positiveNumbersWithMaxDecimalPlaces(1);
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const rateScale = 1000;

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
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
          <CMQ.MeasurementSpecification type="HEDIS" coreset="child" />
          <CMQ.DataSource type="child" />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation childMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                calcTotal
                customMask={mask}
                rateScale={rateScale}
                allowNumeratorGreaterThanDenominator
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customMask={mask}
              rateMultiplicationValue={rateScale}
              allowNumeratorGreaterThanDenominator
            />
          )}
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              adultMeasure={false}
              calcTotal
              categories={PMD.categories}
              customMask={mask}
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              rateMultiplicationValue={rateScale}
              allowNumeratorGreaterThanDenominator
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
