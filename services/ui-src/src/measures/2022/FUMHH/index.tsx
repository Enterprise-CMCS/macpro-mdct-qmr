import * as CMQ from "measures/2022/CommonQuestions";
import * as QMR from "components";

export const FUMHH = ({
  isNotReportingData,
  measureId,
  name,
  year,
}: QMR.MeasureWrapperProps) => {
  return (
    <>
      <CMQ.Reporting
        measureAbbreviation={measureId}
        measureName={name}
        reportingYear={year}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
        </>
      )}
    </>
  );
};
