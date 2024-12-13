import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "shared/globalValidations";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const CDFHH = ({
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
        coreset="health"
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="CMS" />
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation coreset="health" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                rateScale={100}
                calcTotal
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure rateMultiplicationValue={100} />
          )}
          <CMQ.CombinedRates coreset="health" />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              rateMultiplicationValue={100}
              performanceMeasureArray={performanceMeasureArray}
              coreset="health"
              calcTotal
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
