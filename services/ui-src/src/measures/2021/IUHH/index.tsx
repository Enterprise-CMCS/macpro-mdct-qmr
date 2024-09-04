import * as CMQ from "shared/commonQuestions";
import * as PMD from "./data";
import * as QMR from "components";
import { getPerfMeasureRateArray } from "measures/2021/globalValidations";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { xNumbersYDecimals } from "utils";
//form type
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

export const IUHH = ({
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
          <CMQ.DefinitionOfPopulation healthHomeMeasure={true} />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                RateComponent={QMR.ComplexRate}
                calcTotal={true}
              />
              <CMQ.DeviationFromMeasureSpecificationCheckboxes
                categories={PMD.categories}
                measureName={measureId}
              />
            </>
          )}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure
              allowNumeratorGreaterThanDenominator
              customMask={xNumbersYDecimals(12, 1)}
            />
          )}
          <CMQ.CombinedRates healthHomeMeasure={true} />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
              categories={PMD.categories}
              qualifiers={PMD.qualifiers}
              measureName={PMD.data.measureName}
              inputFieldNames={PMD.data.inputFieldNames}
              ndrFormulas={PMD.data.ndrFormulas}
              allowNumeratorGreaterThanDenominator
              adultMeasure={false}
              calcTotal={true}
              customMask={xNumbersYDecimals(12, 1)}
              IUHHPerformanceMeasureArray={performanceMeasureArray}
              componentFlag={"IU"}
            />
          )}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
