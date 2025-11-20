import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { PCRADPerformanceMeasure } from "./questions/PerformanceMeasure";
import { useEffect } from "react";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";
import { validationFunctions } from "../validationTemplate";

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
        removeLessThan30
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
          {isPrimaryMeasureSpecSelected && <CMQ.DeviationFromMeasureSpec />}
          <CMQ.DataSource type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <PCRADPerformanceMeasure data={PMD.data.performanceMeasure} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.AdditionalNotes />
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      {isNotReportingData && <CMQ.AdditionalNotes />}
    </>
  );
};
