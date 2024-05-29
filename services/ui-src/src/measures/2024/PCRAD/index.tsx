import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { PCRADPerformanceMeasure } from "./questions/PerformanceMeasure";
import { useEffect } from "react";
import { validationFunctions } from "./validation";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

export const PCRAD = ({
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
        removeLessThan30
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
          <CMQ.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <PCRADPerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
