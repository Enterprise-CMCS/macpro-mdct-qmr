import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/CommonQuestions";
import * as PMD from "./data";
import * as Q from "./questions";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as QMR from "components";
import { FormData } from "./types";

export const AMBCH = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const rateScale = 1000;

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
          <CMQ.DataSource />
          <CMQ.DateRange type="child" />
          <Q.DefinitionOfPopulation childMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                calcTotal
                rateScale={rateScale}
              />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              adultMeasure={false}
              calcTotal
              categories={PMD.categories}
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              rateMultiplicationValue={rateScale}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
