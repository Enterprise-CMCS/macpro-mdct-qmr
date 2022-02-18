import * as Q from "./questions";
import * as CMQ from "../CommonQuestions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const CCPAD = ({
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
  const watchPerformanceMeasureAgeRatesEffectiveContraception = useWatch({
    name: "PerformanceMeasure-AgeRates-effectiveContraception",
  });
  const watchPerformanceMeasureAgeRatesLongActingContraception = useWatch({
    name: "PerformanceMeasure-AgeRates-longActingContraception",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isUSOPA = watchMeasureSpecification === "US-OPA";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showEffectiveContraceptionThreeDaysPostPartum =
    !!watchPerformanceMeasureAgeRatesEffectiveContraception?.[0]?.rate;
  const showEffectiveContraceptionSixtyDaysPostPartum =
    !!watchPerformanceMeasureAgeRatesEffectiveContraception?.[1]?.rate;
  const showLongActingContraceptionThreeDaysPostPartum =
    !!watchPerformanceMeasureAgeRatesLongActingContraception?.[0]?.rate;
  const showLongActingContraceptionSixtyDaysPostPartum =
    !!watchPerformanceMeasureAgeRatesLongActingContraception?.[1]?.rate;
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (
    showEffectiveContraceptionThreeDaysPostPartum ||
    showLongActingContraceptionThreeDaysPostPartum
  ) {
    ageGroups.push({
      label: "Three Days Postpartum Rate",
      id: 0,
    });
  }

  if (
    showEffectiveContraceptionSixtyDaysPostPartum ||
    showLongActingContraceptionSixtyDaysPostPartum
  ) {
    ageGroups.push({
      label: "Sixty Days Postpartum Rate",
      id: 1,
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
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isUSOPA && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isUSOPA && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                showEffectiveContraceptionThreeDaysPostPartum,
                showEffectiveContraceptionSixtyDaysPostPartum,
                showLongActingContraceptionThreeDaysPostPartum,
                showLongActingContraceptionSixtyDaysPostPartum,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
          {/* Show Other Performance Measures when isHHSOPA is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(showEffectiveContraceptionThreeDaysPostPartum ||
            showEffectiveContraceptionSixtyDaysPostPartum ||
            showLongActingContraceptionThreeDaysPostPartum ||
            showLongActingContraceptionSixtyDaysPostPartum ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showEffectiveContraceptionThreeDaysPostPartum,
                showEffectiveContraceptionSixtyDaysPostPartum,
                showLongActingContraceptionThreeDaysPostPartum,
                showLongActingContraceptionSixtyDaysPostPartum,
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
