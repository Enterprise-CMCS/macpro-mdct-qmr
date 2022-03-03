import * as CMQ from "../CommonQuestions";
import * as Types from "../CommonQuestions/types";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";
import { useEffect } from "react";
import { validationFunctions } from "./validation";
import * as PMD from "./data";
import {
  getPerfMeasureRateArray,
  areSomeRatesCompleted,
} from "measures/globalValidations";

export const CCPAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
}: Types.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);
  const { watch } = useFormContext<FormData>();
  const data = watch();

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const watchReportingRadio = watch("DidReport");
  const watchMeasureSpecification = watch("MeasurementSpecification");
  const isOtherMeasureSpecSelected = watchMeasureSpecification === "Other";
  const isPrimaryMeasureSpecSelected =
    watchMeasureSpecification && !isOtherMeasureSpecSelected;
  const showOptionalMeasureStrat = areSomeRatesCompleted(data);
  const isNotReportingData = watchReportingRadio === "no";

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
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {/* Show Other Performance Measures when Other Measure Spec is selected  */}
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
