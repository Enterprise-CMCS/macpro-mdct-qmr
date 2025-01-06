import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const LSCCH = ({
  name,
  year,
  measureId,
  setValidationFunctions,
  showOptionalMeasureStrat,
  isNotReportingData,
  isPrimaryMeasureSpecSelected,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const data = watch();
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);
  const isHybrid = data?.DataSource.includes(
    "HybridAdministrativeandMedicalRecordsData"
  );

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

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
          <CMQ.DefinitionOfPopulation
            coreset="child"
            hybridMeasure={isHybrid}
          />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} hybridMeasure />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              coreset="child"
              calcTotal
              categories={PMD.categories}
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
