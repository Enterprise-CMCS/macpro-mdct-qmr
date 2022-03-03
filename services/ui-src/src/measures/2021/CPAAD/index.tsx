import * as Q from "./questions";
import * as CMQ from "../../CommonQuestions";
import { useParams } from "react-router-dom";
import * as Types from "measures/CommonQuestions/types";

export const CPAAD = ({ name, year, data }: Types.MeasureWrapperProps) => {
  const { coreSetId } = useParams();

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
