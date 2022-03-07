import * as Q from "./questions";
import * as CMQ from "../CommonQuestions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";
import { PMD } from "./questions/data";
import { PCRADPerformanceMeasure } from "./questions/PerformanceMeasure";

export const PCRAD = ({
  setValidationFunctions,
  measureId,
  name,
  year,
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
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });
  const watchReversibleRates = useWatch({
    name: `PerformanceMeasure.rates.${PMD.qualifiers}`,
  });
  const watchModeratelyRates = useWatch({
    name: `PerformanceMeasure.rates.${PMD.qualifiers}`,
  });

  // Conditionals for Performance Measures
  const isOpa = watchMeasureSpecification === "OPA";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;
  const showModeratelyRates = !!watchModeratelyRates?.[0]?.rate;
  const showReversibleRates = !!watchReversibleRates?.[0]?.rate;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (showModeratelyRates) {
    ageGroups.push({
      label: "Most effective or moderately effective method of contraception",
      id: 0,
    });
  }

  if (showReversibleRates) {
    ageGroups.push({
      label: "Long-acting reversible method of contraception (LARC)",
      id: 0,
    });
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
        measureAbbreviation={measureId}
        measureName={name}
        reportingYear={year}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="OPA" />
          <CMQ.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isOpa && <PCRADPerformanceMeasure data={PMD.data} />}
          {/* Show Deviation only when Other is not selected */}
          {isOpa && (
            <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
          )}
          {/* Show Other Performance Measures when isOpa is not true  */}
          {isOtherSpecification && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {(showReversibleRates ||
            showModeratelyRates ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showModeratelyRates,
                showReversibleRates,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
