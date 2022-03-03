import * as Q from "./questions";
import * as CMQ from "../../CommonQuestions";
import * as Types from "measures/CommonQuestions/types";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";
import { PMD } from "./questions/data";

export const MSCAD = ({
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
  const { getValues } = useFormContext<Types.OtherPerformanceMeasure>();

  // Watch Values of Form Questions
  const watchReportingRadio = useWatch({
    name: "DidReport",
  });
  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const watchPerformanceMeasureAdvisingUsers = useWatch({
    name: `PerformanceMeasure.rates.${PMD.categories[0].replace(/[^\w]/g, "")}`,
  });
  const watchPerformanceMeasureDiscussingMedications = useWatch({
    name: `PerformanceMeasure.rates.${PMD.categories[1].replace(/[^\w]/g, "")}`,
  });
  const watchPerformanceMeasureDiscussingStrategies = useWatch({
    name: `PerformanceMeasure.rates.${PMD.categories[2].replace(/[^\w]/g, "")}`,
  });
  const watchPerformanceMeasurePercentageUsers = useWatch({
    name: `PerformanceMeasure.rates.${PMD.categories[3].replace(/[^\w]/g, "")}`,
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isHEDIS = watchMeasureSpecification === "NCQA/HEDIS";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const showAdvisingUsersAges18To64 =
    !!watchPerformanceMeasureAdvisingUsers?.[0]?.rate;
  const showAdvisingUsers65AndOlder =
    !!watchPerformanceMeasureAdvisingUsers?.[1]?.rate;

  const showDiscussingMedicationsAges18To64 =
    !!watchPerformanceMeasureDiscussingMedications?.[0]?.rate;
  const showDiscussingMedications65AndOlder =
    !!watchPerformanceMeasureDiscussingMedications?.[1]?.rate;

  const showDiscussingStrategiesAges18To64 =
    !!watchPerformanceMeasureDiscussingStrategies?.[0]?.rate;
  const showDiscussingStrategies65AndOlder =
    !!watchPerformanceMeasureDiscussingStrategies?.[1]?.rate;

  const showPercentageUsersAges18To64 =
    !!watchPerformanceMeasurePercentageUsers?.[0]?.rate;
  const showPercentageUsers65AndOlder =
    !!watchPerformanceMeasurePercentageUsers?.[1]?.rate;

  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (
    showAdvisingUsersAges18To64 ||
    showDiscussingMedicationsAges18To64 ||
    showDiscussingStrategiesAges18To64 ||
    showPercentageUsersAges18To64
  ) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (
    showAdvisingUsers65AndOlder ||
    showDiscussingMedications65AndOlder ||
    showDiscussingStrategies65AndOlder ||
    showPercentageUsers65AndOlder
  ) {
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
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <Q.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isHEDIS && <CMQ.PerformanceMeasure data={PMD.data} />}
          {/* Show Deviation only when Other is not selected */}
          {isHEDIS && (
            <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherSpecification && (
            <CMQ.OtherPerformanceMeasure rateAlwaysEditable />
          )}
          <CMQ.CombinedRates />
          {(showAdvisingUsersAges18To64 ||
            showAdvisingUsers65AndOlder ||
            showDiscussingMedicationsAges18To64 ||
            showDiscussingMedications65AndOlder ||
            showDiscussingStrategiesAges18To64 ||
            showDiscussingStrategies65AndOlder ||
            showPercentageUsersAges18To64 ||
            showPercentageUsers65AndOlder ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showAdvisingUsersAges18To64,
                showAdvisingUsers65AndOlder,
                showDiscussingMedicationsAges18To64,
                showDiscussingMedications65AndOlder,
                showDiscussingStrategiesAges18To64,
                showDiscussingStrategies65AndOlder,
                showPercentageUsersAges18To64,
                showPercentageUsers65AndOlder,
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
