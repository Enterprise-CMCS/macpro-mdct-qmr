import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const FUHAD = ({
  name,
  year,
  measureId,
  handleSubmit,
  handleValidation,
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
  const watchPerformanceMeasureAgeRates30Days = useWatch({
    name: "PerformanceMeasure-AgeRates-30Days",
  });
  const watchPerformanceMeasureAgeRates7Days = useWatch({
    name: "PerformanceMeasure-AgeRates-7Days",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  // Conditionals for Performance Measures
  const isHEDIS = watchMeasureSpecification === "NCQA/HEDIS";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications/Optional Measure Stratification
  const show30DaysAges18To64 =
    !!watchPerformanceMeasureAgeRates30Days?.[0]?.rate;
  const show30DaysAges65AndOlder =
    !!watchPerformanceMeasureAgeRates30Days?.[1]?.rate;
  const show7DaysAges18To64 = !!watchPerformanceMeasureAgeRates7Days?.[0]?.rate;
  const show7DaysAges65AndOlder =
    !!watchPerformanceMeasureAgeRates7Days?.[1]?.rate;
  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (show30DaysAges18To64 || show7DaysAges18To64) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (show30DaysAges65AndOlder || show7DaysAges65AndOlder) {
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
          {isHEDIS && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isHEDIS && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                show30DaysAges18To64,
                show30DaysAges65AndOlder,
                show7DaysAges18To64,
                show7DaysAges65AndOlder,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(show30DaysAges18To64 ||
            show30DaysAges65AndOlder ||
            show7DaysAges18To64 ||
            show7DaysAges65AndOlder ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                show30DaysAges18To64,
                show30DaysAges65AndOlder,
                show7DaysAges18To64,
                show7DaysAges65AndOlder,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
          <Q.AdditionalNotes />
        </>
      )}
      <CUI.Stack alignItems="flex-start">
        <CUI.Heading fontSize="xl" fontWeight="600">
          Complete the Measure
        </CUI.Heading>
        <CUI.Text pl="5">
          Please select "Validate Measure" to check any error present on the
          measure prior to completion
        </CUI.Text>
        <CUI.Text p="3" pl="5">
          Complete the measure and mark it for submission to CMS for review
        </CUI.Text>
        <CUI.HStack>
          <QMR.ContainedButton
            buttonProps={{
              ml: "5",
              colorScheme: "green",
              textTransform: "capitalize",
            }}
            buttonText="Validate Measure"
            onClick={handleValidation}
          />
          <QMR.ContainedButton
            buttonProps={{
              type: "submit",
              colorScheme: "blue",
              textTransform: "capitalize",
            }}
            buttonText="Complete Measure"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
              console.log("testing");
            }}
          />
        </CUI.HStack>
      </CUI.Stack>
    </>
  );
};
