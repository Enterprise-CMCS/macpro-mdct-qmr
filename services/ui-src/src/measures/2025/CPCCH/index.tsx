import * as Q from "./questions";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { DefaultFormData } from "shared/types/FormData";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { useEffect } from "react";

export const CPCCH = ({
  name,
  year,
  setValidationFunctions,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<DefaultFormData>();
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
          <Q.DataSource type="child" />
          <Q.DefinitionOfPopulation />
          <Q.PerformanceMeasure />
        </>
      )}
      <Q.AdditionalNotes />
    </>
  );
};
