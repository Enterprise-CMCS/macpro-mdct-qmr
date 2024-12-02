import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const FUMHH = ({
  isNotReportingData,
  isOtherMeasureSpecSelected,
  isPrimaryMeasureSpecSelected,
  measureId,
  name,
  setValidationFunctions,
  showOptionalMeasureStrat,
  year,
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
        measureAbbreviation={measureId}
        measureName={name}
        reportingYear={year}
        coreset="health"
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation coreset="health" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure calcTotal data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure rateMultiplicationValue={100} />
          )}
          <CMQ.CombinedRates coreset="health" />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              coreset="health"
              calcTotal
              categories={PMD.categories}
              performanceMeasureArray={performanceMeasureArray}
              rateMultiplicationValue={100}
              qualifiers={PMD.qualifiers}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
