import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/2022/CommonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2022/globalValidations";
import * as QMR from "components";
import { FormData } from "./types";

export const AABAD = ({
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
          <CMQ.DataSource />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                RateComponent={QMR.AABRate}
              />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              data={PMD.data}
              RateComponent={QMR.AABRate}
            />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              adultMeasure
              componentFlag={"AAB"}
              customPrompt={PMD.data.customPrompt}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
