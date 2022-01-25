import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Measure } from "./validation/types";
import { useEffect } from "react";
import { validationSchema } from "./validation/schema";
import { validationFunctions } from "./validation/customValidationFunctions";

export const CPAAD = ({
  name,
  year,
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

  const { coreSetId } = useParams();
  const { watch } = useFormContext<Measure.Form>();

  // Watch Values of Form Questions
  const watchReportingRadio = watch("DidReport");

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
          <Q.DefinitionOfPopulation />
          <Q.PerformanceMeasure />
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
