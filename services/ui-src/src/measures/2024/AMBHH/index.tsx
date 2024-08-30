import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2024/shared/globalValidations";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const AMBHH = ({
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
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
        healthHomeMeasure
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                allowNumeratorGreaterThanDenominator
                data={PMD.data}
                rateScale={1000}
                customMask={positiveNumbersWithMaxDecimalPlaces(1)}
                calcTotal
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              allowNumeratorGreaterThanDenominator
              rateMultiplicationValue={1000}
              customMask={positiveNumbersWithMaxDecimalPlaces(1)}
            />
          )}
          <CMQ.CombinedRates healthHomeMeasure />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              rateMultiplicationValue={1000}
              customMask={positiveNumbersWithMaxDecimalPlaces(1)}
              performanceMeasureArray={performanceMeasureArray}
              adultMeasure={false}
              calcTotal
              allowNumeratorGreaterThanDenominator
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
