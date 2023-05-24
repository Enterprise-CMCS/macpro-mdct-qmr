import * as PMD from "./data";
import * as QMR from "components";
import * as CMQ from "measures/2023/shared/CommonQuestions";
import { useEffect } from "react";
import { validationFunctions } from "./validation";

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
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure data={PMD.data} />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && <CMQ.NotCollectingOMS />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
