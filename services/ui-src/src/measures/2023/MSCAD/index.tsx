import { useEffect } from "react";
import * as Q from "./questions";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./../validationTemplate";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

export const MSCAD = ({
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
          <CMQ.MeasurementSpecification type="HEDIS" />
          <Q.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data.performanceMeasure}
                rateReadOnly={false}
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure rateAlwaysEditable />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
