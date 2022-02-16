import * as Q from "./questions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const PQI08AD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
}: Measure.Props) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  const { getValues } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchReportingRadio = useWatch({
    name: "DidReport",
  });
  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const watchPerformanceMeasureAgeRates = useWatch({
    name: "PerformanceMeasure-AgeRates",
  });

  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isAHRQ = watchMeasureSpecification === "AHRQ";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showAges18To64 = !!watchPerformanceMeasureAgeRates?.[0]?.rate;
  const showAges65AndOlder = !!watchPerformanceMeasureAgeRates?.[1]?.rate;
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (showAges18To64) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (showAges65AndOlder) {
    ageGroups.push({ label: "Ages 65 and older", id: 1 });
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
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <Q.Status />
          <Q.MeasurementSpecification />
          <Q.DataSource />
          <Q.DateRange type="adult" />
          <Q.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isAHRQ && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isAHRQ && <Q.DeviationFromMeasureSpec options={ageGroups} />}
          {/* Show Other Performance Measures when isAHRQ is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(showAges18To64 ||
            showAges65AndOlder ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showAges18To64,
                showAges65AndOlder,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
        </>
      )}
      <Q.AdditionalNotes />
    </>
  );
};
