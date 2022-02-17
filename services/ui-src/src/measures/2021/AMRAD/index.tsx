import * as Q from "./questions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const AMRAD = ({
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
  const watchReportingRadio = useWatch({ name: "DidReport" });
  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isHEDIS = watchMeasureSpecification === "NCQA/HEDIS";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  const watchPersistentAsthma = useWatch({
    name: "PerformanceMeasure-AgeRates-Persistent-Asthma",
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
          {isHEDIS && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isHEDIS && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                showPersistentAsthma19To50,
                showPersistentAsthma51To64,
                showPersistentAsthmaTotal,
              }}
            />
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(showPersistentAsthma19To50 ||
            showPersistentAsthma51To64 ||
            showPersistentAsthmaTotal ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showPersistentAsthma19To50,
                showPersistentAsthma51To64,
                showPersistentAsthmaTotal,
                // showOtherPerformanceMeasureRates,
              }}
            />
          )}
        </>
      )}
      <Q.AdditionalNotes />
    </>
  );
};
