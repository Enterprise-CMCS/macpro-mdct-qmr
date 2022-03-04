import * as Q from "./questions";
import * as CMQ from "measures/CommonQuestions";
import { useParams } from "react-router-dom";
import * as Types from "measures/CommonQuestions/types";
import { useFormContext } from "react-hook-form";

export const CPAAD = ({ name, year }: Types.MeasureWrapperProps) => {
  const { watch } = useFormContext<Types.DefaultFormData>();
  const { coreSetId } = useParams();
  const data = watch();

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
