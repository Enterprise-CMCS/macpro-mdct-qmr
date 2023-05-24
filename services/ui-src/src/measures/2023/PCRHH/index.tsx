import { useEffect } from "react";
import * as CMQ from "measures/2023/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { PCRHHPerformanceMeasure } from "./questions/PerformanceMeasure";

export const PCRHH = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
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
        healthHomeMeasure
        removeLessThan30
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
              <PCRHHPerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec
                categories={PMD.qualifiers}
                measureName={measureId}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates healthHomeMeasure />
          {showOptionalMeasureStrat && <CMQ.NotCollectingOMS />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
