import * as Q from "./questions";
import * as CMQ from "shared/commonQuestions";
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
      setValidationFunctions({ functions: validationFunctions });
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
          <CMQ.MeasurementSpecification type="AHRQ-NCQA" />
          <Q.DataSource />
          <Q.DefinitionOfPopulation />
          <Q.PerformanceMeasure />
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
