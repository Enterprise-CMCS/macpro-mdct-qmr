import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

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
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation coreset="child" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                calcTotal
                customMask={mask}
                rateScale={rateScale}
                allowNumeratorGreaterThanDenominator
              />
              <CMQ.DeviationFromMeasureSpecificationCheckboxes
                categories={PMD.categories}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customMask={mask}
              rateMultiplicationValue={rateScale}
              allowNumeratorGreaterThanDenominator
            />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              coreset="child"
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
