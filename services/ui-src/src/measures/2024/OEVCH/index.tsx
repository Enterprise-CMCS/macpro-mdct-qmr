import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as DC from "dataConstants";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "measures/2024/shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
//form type
import { DefaultFormData as FormData } from "measures/2024/shared/CommonQuestions/types";

export const OEVCH = ({
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
  const performanceMeasureArray = getPerfMeasureRateArray(data, PMD.data);

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
          <CMQ.MeasurementSpecification type={DC.ADA_DQA} />
          <CMQ.DataSource coreset="child" />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation childMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} calcTotal />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              adultMeasure={false}
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
