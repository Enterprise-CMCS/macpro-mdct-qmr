import * as PMD from "./data";
import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { validationFunctions } from "./validation";
import { AABRateCalculation } from "utils/rateFormulas";
import { getPerfMeasureRateArray } from "shared/globalValidations";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

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
                rateCalc={AABRateCalculation}
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              customPrompt={PMD.data.customPrompt}
              rateCalc={AABRateCalculation}
            />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={PMD.qualifiers}
              categories={PMD.categories}
              coreset="adult"
              rateCalc={AABRateCalculation}
              customPrompt={PMD.data.customPrompt}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
