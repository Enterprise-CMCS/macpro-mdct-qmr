import { useEffect } from "react";
import * as CMQ from "measures/2021/CommonQuestions";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { PerformanceMeasure } from "./questions/PerformanceMeasure";

export const SSHH = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
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
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure />

          <PerformanceMeasure />
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
