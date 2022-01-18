import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { Params } from "Routes";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationSchema } from "./validation/schema";
import { validationFunctions } from "./validation/customValidationFunctions";

export const FUAAD = ({
  name,
  year,
  handleSubmit,
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

  const { coreSetId } = useParams<Params>();
  const { watch } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchReportingRadio = watch("DidReport");
  const watchMeasureSpecification = watch("MeasurementSpecification");
  const watchDataSourceAdmin = watch("DataSource");
  const watchPerformanceMeasureAgeRates30Days = watch(
    "PerformanceMeasure-AgeRates-30Days"
  );
  const watchPerformanceMeasureAgeRates7Days = watch(
    "PerformanceMeasure-AgeRates-7Days"
  );

  // Conditionals for Performance Measures
  const isOtherDataSource =
    watchDataSourceAdmin?.indexOf("Other Data Source") !== -1;
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

  // Logic to conditionally show age groups in Deviations from Measure Specifications/Optional Measure Stratification
  const ageGroups = [];

  if (show30DaysAges18To64 || show7DaysAges18To64) {
    ageGroups.push({ label: "Ages 18 to 64", id: 0 });
  }

  if (show30DaysAges65AndOlder || show7DaysAges65AndOlder) {
    ageGroups.push({ label: "Ages 65 and older", id: 1 });
  }

  return (
    <>
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={coreSetId as string}
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
          {!isOtherSpecification && (
            <Q.DeviationFromMeasureSpec
              options={ageGroups}
              deviationConditions={{
                show30DaysAges18To64,
                show30DaysAges65AndOlder,
                show7DaysAges18To64,
                show7DaysAges65AndOlder,
              }}
            />
          )}
          {/* Show Other Performance Measures when isHedis is not true and other is selected from one of two questions */}
          {!isHEDIS && (isOtherSpecification || isOtherDataSource) && (
            <Q.OtherPerformanceMeasure />
          )}
          <Q.CombinedRates />
          <Q.OptionalMeasureStratification
            ageGroups={ageGroups}
            deviationConditions={{
              show30DaysAges18To64,
              show30DaysAges65AndOlder,
              show7DaysAges18To64,
              show7DaysAges65AndOlder,
            }}
          />
        </>
      )}
      <Q.AdditionalNotes />
      <CUI.Stack alignItems="flex-start">
        <CUI.Heading fontSize="xl" fontWeight="600">
          Complete the Measure
        </CUI.Heading>
        <CUI.Text p="3" pl="5">
          Complete the measure and mark it for submission to CMS for review
        </CUI.Text>
        <QMR.ContainedButton
          buttonProps={{
            ml: "5",
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
      </CUI.Stack>
    </>
  );
};
