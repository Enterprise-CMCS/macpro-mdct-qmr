import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import * as QMR from "components";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const WCCCH = ({
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
      setValidationFunctions(validationFunctions);
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
          <CMQ.MeasurementSpecification type="HEDIS" coreset="child" />
          <CMQ.DataSource data={PMD.dataSourceData} type="child" />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation childMeasure hybridMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} calcTotal hybridMeasure />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              performanceMeasureArray={performanceMeasureArray}
              coreset="child"
              calcTotal
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
