import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useFormContext, useWatch } from "react-hook-form";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationFunctions } from "./validation/customValidationFunctions";

export const OUDAD = ({
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
  const watchPerformanceMeasureRates = useWatch({
    name: "PerformanceMeasure-Rates",
  });
  const watchOtherPerformanceMeasureRates = useWatch({
    name: "OtherPerformanceMeasure-Rates",
  });

  console.log(watchPerformanceMeasureRates);
  // Conditionals for Performance Measures
  const isCMS = watchMeasureSpecification === "CMS";

  const isOtherSpecification = watchMeasureSpecification === "Other";
  // Age Conditionals for Deviations from Measure Specifications

  const showTotalRate = !!watchPerformanceMeasureRates?.[0]?.rate;
  const showBuprenorphine = !!watchPerformanceMeasureRates?.[1]?.rate;
  const showOralNaltrexone = !!watchPerformanceMeasureRates?.[2]?.rate;
  const showInjectableNaltrexone = !!watchPerformanceMeasureRates?.[3]?.rate;
  const showMethadone = !!watchPerformanceMeasureRates?.[4]?.rate;

  const showOtherPerformanceMeasureRates = !!watchOtherPerformanceMeasureRates;

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (showTotalRate) {
    ageGroups.push({ label: "Total Rate", id: 1 });
  }

  if (showBuprenorphine) {
    ageGroups.push({ label: "Buprenorphine", id: 2 });
  }

  if (showOralNaltrexone) {
    ageGroups.push({ label: "Oral naltrexone", id: 3 });
  }

  if (showInjectableNaltrexone) {
    ageGroups.push({ label: "Long-acting, injectable naltrexone", id: 4 });
  }

  if (showMethadone) {
    ageGroups.push({ label: "Methadone", id: 5 });
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
          {/* Show Performance Measure when CMS is selected from DataSource */}
          {isCMS && <Q.PerformanceMeasure />}
          {/* Show Deviation only when Other is not selected */}
          {isCMS && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                showTotalRate,
                showBuprenorphine,
                showOralNaltrexone,
                showInjectableNaltrexone,
                showMethadone,
                showOtherPerformanceMeasureRates,
              }}
            />
          )}
          {/* Show Other Performance Measures when isCMS is not true  */}
          {isOtherSpecification && <Q.OtherPerformanceMeasure />}
          <Q.CombinedRates />
          {(showTotalRate ||
            showBuprenorphine ||
            showOralNaltrexone ||
            showInjectableNaltrexone ||
            showMethadone ||
            showOtherPerformanceMeasureRates) && (
            <Q.OptionalMeasureStratification
              ageGroups={ageGroups}
              deviationConditions={{
                showTotalRate,
                showBuprenorphine,
                showOralNaltrexone,
                showInjectableNaltrexone,
                showMethadone,
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
