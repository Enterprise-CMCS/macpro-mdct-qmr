import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2024/shared/globalValidations";
//form type
import { DefaultFormData as FormData } from "measures/2024/shared/CommonQuestions/types";

export const CCWAD = ({
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
        measureAbbreviation={measureId}
        measureName={name}
        reportingYear={year}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="OPA" coreset="adult" />
          <CMQ.DataSource type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              performanceMeasureArray={performanceMeasureArray}
              adultMeasure
              isSingleSex
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
