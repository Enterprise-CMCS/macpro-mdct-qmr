import { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as CMQ from "measures/2021/CommonQuestions";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { PerformanceMeasure } from "./questions/PerformanceMeasure";

export const SSHH = ({
  name,
  detailedDescription,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
}: QMR.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  return (
    <>
      <CUI.Text fontSize="xl" my="6" fontWeight={400}>
        {detailedDescription}
      </CUI.Text>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
        healthHomeMeasure
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure />

          <PerformanceMeasure />
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
