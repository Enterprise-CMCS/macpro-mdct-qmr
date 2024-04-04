import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "measures/2022/shared/CommonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/2022/shared/globalValidations";
import * as QMR from "components";
//form type
import { DefaultFormData as FormData } from "measures/2022/shared/CommonQuestions/types";
import { convertToQualifierLabelData, convertToCategoryLabelData } from "utils";

export const SFMCH = ({
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
          <CMQ.MeasurementSpecification type="ADA-DQA" />
          <CMQ.DataSource />
          <CMQ.DateRange type="child" />
          <CMQ.DefinitionOfPopulation childMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} showtextbox={true} />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              performanceMeasureArray={performanceMeasureArray}
              qualifiers={convertToQualifierLabelData(PMD.qualifiers)}
              categories={convertToCategoryLabelData(PMD.categories)}
              adultMeasure={false}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
