import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/2021/CommonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import * as QMR from "components";
//form type
import { DefaultFormData as FormData } from "measures/2021/CommonQuestions/types";

export const FUHHH = ({
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
        healthHomeMeasure
      />

      {!isNotReportingData && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation healthHomeMeasure={true} />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} calcTotal={true} />
              <CMQ.DeviationFromMeasureSpec
                categories={PMD.categories}
                customTotalLabel={PMD.qualifiers[3].label}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates healthHomeMeasure={true} />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              performanceMeasureArray={performanceMeasureArray}
              adultMeasure={false}
              calcTotal={true}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
