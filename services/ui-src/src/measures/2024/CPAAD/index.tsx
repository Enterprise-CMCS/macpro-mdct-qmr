import * as Q from "./questions";
import * as CMQ from "measures/2023/shared/CommonQuestions";
import { useParams } from "react-router-dom";
import * as QMR from "components";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";
import { validationFunctions } from "./validation";
import { useEffect } from "react";

export const CPAAD = ({
  name,
  year,
  setValidationFunctions,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const { coreSetId } = useParams();
  const data = watch();

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  return (
    <>
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={coreSetId as string}
      />
      {data["DidCollect"] !== "no" && (
        <>
          <Q.HowDidYouReport />
          <Q.DataSource type="adult" />
          <CMQ.DefinitionOfPopulation />
          <Q.PerformanceMeasure />
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
