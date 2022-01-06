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
  const { watch, formState } = useFormContext<Measure.Form>();

  console.log(`formState`, formState);

  // Watch Values of Form Questions
  const watchReportingRadio = watch("DidReport");
  const watchMeasureSpecification = watch("MeasurementSpecification");
  const watchDataSourceAdmin = watch("DataSource");

  // Conditionals for Performance Measures
  const isOtherDataSource =
    watchDataSourceAdmin?.indexOf("Other Data Source") !== -1;
  const isHEDIS = watchMeasureSpecification === "NCQA/HEDIS";
  const isOtherSpecification = watchMeasureSpecification === "Other";

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
            <Q.DeviationFromMeasureSpec options={Q.defaultDeviationOptions} />
          )}
          {/* Show Other Performance Measures when isHedis is not true and other is selected from one of two questions */}
          {!isHEDIS && (isOtherSpecification || isOtherDataSource) && (
            <Q.OtherPerformanceMeasure />
          )}
          <Q.CombinedRates />
          <Q.OptionalMeasureStratification
            {...Q.DefaultOptionalMeasureStratProps}
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
          onClick={handleSubmit}
        />
      </CUI.Stack>
    </>
  );
};
