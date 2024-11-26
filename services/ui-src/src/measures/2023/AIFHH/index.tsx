import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "shared/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { xNumbersYDecimals } from "utils";
//form type
import { DefaultFormData as FormData } from "shared/types/FormData";

export const AIFHH = ({
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
          <CMQ.MeasurementSpecification type="CMS" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation coreset="health" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                RateComponent={QMR.ComplexRate}
                calcTotal={true}
              />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              allowNumeratorGreaterThanDenominator
              customMask={xNumbersYDecimals(12, 1)}
            />
          )}
          <CMQ.CombinedRates coreset="health" />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              measureName={PMD.data.measureName}
              inputFieldNames={PMD.data.inputFieldNames}
              ndrFormulas={PMD.data.ndrFormulas}
              allowNumeratorGreaterThanDenominator
              coreset="health"
              calcTotal={true}
              customMask={xNumbersYDecimals(12, 1)}
              AIFHHPerformanceMeasureArray={performanceMeasureArray}
              componentFlag={"AIF"}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
