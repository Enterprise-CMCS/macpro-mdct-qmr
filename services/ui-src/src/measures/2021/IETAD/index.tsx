import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useFormContext } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationSchema } from "./validation/schema";
import { validationFunctions } from "./validation/customValidationFunctions";

export const IETAD = ({
  name,
  year,
  measureId,
  handleSubmit,
  handleValidation,
  setMeasureSchema,
  setValidationFunctions,
}: Measure.Props) => {
  useEffect(() => {
    if (setMeasureSchema) {
      setMeasureSchema(validationSchema);
    }
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setMeasureSchema, setValidationFunctions]);

  const { watch, getValues } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchReportingRadio = watch("DidReport");
  const watchMeasureSpecification = watch("MeasurementSpecification");
  const watchPerformanceMeasureAgeRates30Days = watch(
    "PerformanceMeasure-AgeRates-30Days"
  );
  const watchPerformanceMeasureAgeRates7Days = watch(
    "PerformanceMeasure-AgeRates-7Days"
  );
  const watchOtherPerformanceMeasureRates = watch(
    "OtherPerformanceMeasure-Rates"
  );

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

  const watchInitAlcohol = watch(
    "PerformanceMeasure-AgeRates-Initiation-Alcohol"
  );
  const watchEngageAlcohol = watch(
    "PerformanceMeasure-AgeRates-Engagement-Alcohol"
  );
  const watchInitOpioid = watch(
    "PerformanceMeasure-AgeRates-Initiation-Opioid"
  );
  const watchEngageOpioid = watch(
    "PerformanceMeasure-AgeRates-Engagement-Opioid"
  );
  const watchInitOther = watch("PerformanceMeasure-AgeRates-Initiation-Other");
  const watchEngageOther = watch(
    "PerformanceMeasure-AgeRates-Engagement-Other"
  );
  const watchInitTotal = watch("PerformanceMeasure-AgeRates-Initiation-Total");
  const watchEngageTotal = watch(
    "PerformanceMeasure-AgeRates-Engagement-Total"
  );
  const showInitAlcohol18To64 = !!watchInitAlcohol?.[0]?.rate;
  const showEngageAlcohol18To64 = !!watchEngageAlcohol?.[0]?.rate;
  const showInitOpioid18To64 = !!watchInitOpioid?.[0]?.rate;
  const showEngageOpioid18To64 = !!watchEngageOpioid?.[0]?.rate;
  const showInitOther18To64 = !!watchInitOther?.[0]?.rate;
  const showEngageOther18To64 = !!watchEngageOther?.[0]?.rate;
  const showInitTotal18To64 = !!watchInitTotal?.[0]?.rate;
  const showEngageTotal18To64 = !!watchEngageTotal?.[0]?.rate;
  const showInitAlcohol65Plus = !!watchInitAlcohol?.[1]?.rate;
  const showEngageAlcohol65Plus = !!watchEngageAlcohol?.[1]?.rate;
  const showInitOpioid65Plus = !!watchInitOpioid?.[1]?.rate;
  const showEngageOpioid65Plus = !!watchEngageOpioid?.[1]?.rate;
  const showInitOther65Plus = !!watchInitOther?.[1]?.rate;
  const showEngageOther65Plus = !!watchEngageOther?.[1]?.rate;
  const showInitTotal65Plus = !!watchInitTotal?.[1]?.rate;
  const showEngageTotal65Plus = !!watchEngageTotal?.[1]?.rate;
  const showInitAlcoholCombined = !!watchInitAlcohol?.[2]?.rate;
  const showEngageAlcoholCombined = !!watchEngageAlcohol?.[2]?.rate;
  const showInitOpioidCombined = !!watchInitOpioid?.[2]?.rate;
  const showEngageOpioidCombined = !!watchEngageOpioid?.[2]?.rate;
  const showInitOtherCombined = !!watchInitOther?.[2]?.rate;
  const showEngageOtherCombined = !!watchEngageOther?.[2]?.rate;
  const showInitTotalCombined = !!watchInitTotal?.[2]?.rate;
  const showEngageTotalCombined = !!watchEngageTotal?.[2]?.rate;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (
    showInitAlcohol18To64 ||
    showEngageAlcohol18To64 ||
    showInitOpioid18To64 ||
    showEngageOpioid18To64 ||
    showInitOther18To64 ||
    showEngageOther18To64 ||
    showInitTotal18To64 ||
    showEngageTotal18To64
  ) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (
    showInitAlcohol65Plus ||
    showEngageAlcohol65Plus ||
    showInitOpioid65Plus ||
    showEngageOpioid65Plus ||
    showInitOther65Plus ||
    showEngageOther65Plus ||
    showInitTotal65Plus ||
    showEngageTotal65Plus
  ) {
    ageGroups.push({ label: "Ages 65 and older", id: 1 });
  }

  if (
    showInitAlcoholCombined ||
    showEngageAlcoholCombined ||
    showInitOpioidCombined ||
    showEngageOpioidCombined ||
    showInitOtherCombined ||
    showEngageOtherCombined ||
    showInitTotalCombined ||
    showEngageTotalCombined
  ) {
    ageGroups.push({ label: "Total Ages", id: 2 });
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
                showInitAlcohol18To64,
                showEngageAlcohol18To64,
                showInitOpioid18To64,
                showEngageOpioid18To64,
                showInitOther18To64,
                showEngageOther18To64,
                showInitTotal18To64,
                showEngageTotal18To64,
                showInitAlcohol65Plus,
                showEngageAlcohol65Plus,
                showInitOpioid65Plus,
                showEngageOpioid65Plus,
                showInitOther65Plus,
                showEngageOther65Plus,
                showInitTotal65Plus,
                showEngageTotal65Plus,
                showInitAlcoholCombined,
                showEngageAlcoholCombined,
                showInitOpioidCombined,
                showEngageOpioidCombined,
                showInitOtherCombined,
                showEngageOtherCombined,
                showInitTotalCombined,
                showEngageTotalCombined,
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
        </>
      )}
      <Q.AdditionalNotes />
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
