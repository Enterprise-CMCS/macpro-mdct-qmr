import * as PMD from "./data";
import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";
import { CPUADPerformanceMeasure } from "./questions/PerformanceMeasure";
import { useEffect } from "react";
import { validationFunctions } from "./validation";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

export const CPUAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  isOtherMeasureSpecSelected,
  showOptionalMeasureStrat,
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
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
          {isPrimaryMeasureSpecSelected && <CMQ.DeviationFromMeasureSpec />}
          <CMQ.DataSource data={PMD.dataSourceData} type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation populationSampleSize />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CPUADPerformanceMeasure data={PMD.data} />
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
