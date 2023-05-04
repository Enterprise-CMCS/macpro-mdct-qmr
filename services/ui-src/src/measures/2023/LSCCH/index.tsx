import * as CMQ from "measures/2023/shared/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { FormData } from "./types";
import { getPerfMeasureRateArray } from "measures/2023/shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";

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
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation childMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} calcTotal hybridMeasure />
              <CMQ.DeviationFromMeasureSpec
                categories={PMD.categories}
                customTotalLabel={PMD.qualifiers.slice(-1)[0]} // use the actual Total label
              />
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
