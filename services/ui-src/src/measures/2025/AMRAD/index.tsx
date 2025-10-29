import * as CMQ from "shared/commonQuestions";
import * as QMR from "components";
import * as PMD from "./data";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { useEffect } from "react";
import { validationFunctions } from "./../validationTemplate";

export const AMRAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions({
        data: PMD.data,
        functions: validationFunctions,
      });
    }
  }, [setValidationFunctions]);

  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

  return (
    <>
      <CMQ.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
          {isPrimaryMeasureSpecSelected && <CMQ.DeviationFromMeasureSpec />}
          <CMQ.DataSource type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {/* Show Performance Measure when HEDIS is selected from DataSource */}
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data.performanceMeasure}
                calcTotal={true}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.AdditionalNotes />
          {showOptionalMeasureStrat && (
            <CMQ.MeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              calcTotal={true}
              coreset="adult"
            />
          )}
        </>
      )}
      {isNotReportingData && <CMQ.AdditionalNotes />}
    </>
  );
};
