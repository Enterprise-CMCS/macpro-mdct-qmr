import { useEffect } from "react";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { PCRHHPerformanceMeasure } from "./questions/PerformanceMeasure";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

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
      setValidationFunctions({
        data: PMD.data,
        functions: validationFunctions,
      });
    }
  }, [setValidationFunctions]);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
        coreset="health"
        removeLessThan30
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="health" />
          {isPrimaryMeasureSpecSelected && <CMQ.DeviationFromMeasureSpec />}
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation coreset="health" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <PCRHHPerformanceMeasure data={PMD.data.performanceMeasure} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates coreset="health" />
          <CMQ.AdditionalNotes />
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      {isNotReportingData && <CMQ.AdditionalNotes />}
    </>
  );
};
