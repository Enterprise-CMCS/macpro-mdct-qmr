import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { validationFunctions } from "./validation";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { getPerfMeasureRateArray } from "shared/globalValidations";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

export const PQI92HH = ({
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
          <CMQ.MeasurementSpecification type="AHRQ" />
          <CMQ.DataSource />
          <CMQ.DateRange type="health" />
          <CMQ.DefinitionOfPopulation coreset="health" />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                rateScale={100000}
                allowNumeratorGreaterThanDenominator
                customMask={positiveNumbersWithMaxDecimalPlaces(1)}
                calcTotal={true}
              />
              <CMQ.DeviationFromMeasureSpecificationCheckboxes
                categories={PMD.qualifiers}
                customTotalLabel={PMD.qualifiers[2].label}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              allowNumeratorGreaterThanDenominator
              rateMultiplicationValue={100000}
              customMask={positiveNumbersWithMaxDecimalPlaces(1)}
            />
          )}
          <CMQ.CombinedRates coreset="health" />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              rateMultiplicationValue={100000}
              customMask={positiveNumbersWithMaxDecimalPlaces(1)}
              performanceMeasureArray={performanceMeasureArray}
              coreset="health"
              allowNumeratorGreaterThanDenominator
              calcTotal
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
