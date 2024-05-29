import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as QMR from "components";
import * as PMD from "./data";
import { useFormContext, useWatch } from "react-hook-form";
import { FormData, Measure } from "./types";
import { getPerfMeasureRateArray } from "measures/2024/shared/globalValidations";
import { useEffect } from "react";
import { validationFunctions } from "./validation";

export const AMRAD = ({
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

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const { getValues } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  const watchPersistentAsthma = useWatch({
    name: `PerformanceMeasure.rates.singleCategory`,
  });

  const showPersistentAsthma19To50 = !!watchPersistentAsthma?.[0]?.rate;
  const showPersistentAsthma51To64 = !!watchPersistentAsthma?.[1]?.rate;
  const showPersistentAsthmaTotal = !!watchPersistentAsthma?.[2]?.rate;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (showPersistentAsthma19To50) {
    ageGroups[0] = { label: "Ages 19 to 50", id: 0, isTotal: false };
  }

  if (showPersistentAsthma51To64) {
    ageGroups[1] = { label: "Ages 51 to 64", id: 1, isTotal: false };
  }

  // Total field should show in OMS section if any of the NDRs in Performance Measures have been filled out.
  if (
    showPersistentAsthma19To50 ||
    showPersistentAsthma51To64 ||
    showPersistentAsthmaTotal
  ) {
    ageGroups[2] = { label: "Total", id: 2, isTotal: true };
  }

  if (showOtherPerformanceMeasureRates) {
    let otherRates = getValues("OtherPerformanceMeasure-Rates");
    otherRates.forEach((rate) => {
      if (rate.description) {
        ageGroups.push({ label: rate.description, id: ageGroups.length });
      }
    });
  }

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
          <CMQ.DataSource type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} calcTotal={true} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              calcTotal={true}
              adultMeasure
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
