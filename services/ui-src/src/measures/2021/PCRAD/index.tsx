import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import * as CMQ from "measures/CommonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import { validationFunctions } from "./validation";
import { PCRADPerformanceMeasure } from "./questions/PerformanceMeasure";
import { PCRADOptionalMeasureStrat } from "./questions/OptionalMeasureStrat";
import { FormData } from "./types";

export const PCRAD = ({
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
          <CMQ.MeasurementSpecification type="HEDIS" />
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <PCRADPerformanceMeasure data={PMD.data} rateScale={1000} />
              <CMQ.DeviationFromMeasureSpec
                categories={PMD.qualifiers}
                measureName={measureId}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <PCRADOptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              adultMeasure
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
