import * as CMQ from "measures/2022/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "measures/2022/shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormData as FormData } from "measures/2022/shared/CommonQuestions/types";
import { convertToQualifierLabelData, convertToCategoryLabelData } from "utils";

export const FUMHH = ({
  isNotReportingData,
  isOtherMeasureSpecSelected,
  isPrimaryMeasureSpecSelected,
  measureId,
  name,
  setValidationFunctions,
  showOptionalMeasureStrat,
  year,
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
        measureAbbreviation={measureId}
        measureName={name}
        reportingYear={year}
        healthHomeMeasure
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure calcTotal data={PMD.data} />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure rateMultiplicationValue={100} />
          )}
          <CMQ.CombinedRates healthHomeMeasure />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              adultMeasure={false}
              calcTotal
              qualifiers={convertToQualifierLabelData(PMD.qualifiers)}
              categories={convertToCategoryLabelData(PMD.categories)}
              performanceMeasureArray={performanceMeasureArray}
              rateMultiplicationValue={100}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
