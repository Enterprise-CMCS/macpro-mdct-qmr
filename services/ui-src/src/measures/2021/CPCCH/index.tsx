import * as Q from "./questions";
import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";
import { useParams } from "react-router";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { useEffect } from "react";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

export const CPCCH = ({
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
