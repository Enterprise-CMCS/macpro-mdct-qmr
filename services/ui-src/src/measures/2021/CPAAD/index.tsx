import * as Q from "./questions";
import * as CMQ from "../../CommonQuestions";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Types from "measures/CommonQuestions/types";
import { FormData } from "./types";

export const CPAAD = ({ name, year }: Types.MeasureWrapperProps) => {
  const { coreSetId } = useParams();
  const { watch } = useFormContext<FormData>();

  // Watch Values of Form Questions
  const watchReportingRadio = watch("DidCollect");

  return (
    <>
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={coreSetId as string}
      />

      {!watchReportingRadio?.includes("No") && (
        <>
          <Q.HowDidYouReport />
          <CMQ.MeasurementSpecification type="AHRQ" />
          <Q.DataSource />
          <Q.DefinitionOfPopulation />
          <Q.PerformanceMeasure />
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
