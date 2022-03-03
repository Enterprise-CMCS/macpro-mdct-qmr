import * as CMQ from "../../CommonQuestions";
import * as Types from "measures/CommonQuestions/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation";
import * as PMD from "./data";
import { getPerfMeasureRateArray } from "measures/globalValidations";

export const CCPAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
  data,
}: Types.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

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
          <CMQ.MeasurementSpecification type="OPA" />
          <CMQ.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              performanceMeasureArray={performanceMeasureArray}
              adultMeasure
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
