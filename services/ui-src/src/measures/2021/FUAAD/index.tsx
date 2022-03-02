import * as CMQ from "../CommonQuestions";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";
import { useEffect } from "react";
import { validationFunctions } from "./validation";
import * as PMD from "./data";
import * as Types from "../CommonQuestions/types";
import {
  getPerfMeasureRateArray,
  areSomeRatesCompleted,
} from "../globalValidations";

export const FUAAD = ({
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

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
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
