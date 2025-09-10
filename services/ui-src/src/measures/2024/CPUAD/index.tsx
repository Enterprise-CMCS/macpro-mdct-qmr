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
      setValidationFunctions({ functions: validationFunctions });
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
          <CMQ.DataSource data={PMD.dataSourceData} type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation populationSampleSize />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CPUADPerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
