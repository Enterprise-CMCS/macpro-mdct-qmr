import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import * as CMQ from "measures/CommonQuestions";
import * as PMD from "./data";
import { validationFunctions } from "./validation";
import { getPerfMeasureRateArray } from "measures/globalValidations";
import * as QMR from "components";
import { FormData } from "./types";
import * as DC from "dataConstants";

export const HPCMIAD = ({
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

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const dataSourceWatch = useWatch({ name: DC.DATA_SOURCE });
  const rateReadOnly =
    dataSourceWatch?.every(
      (source: string) => source === "AdministrativeData"
    ) ?? true;

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
          <CMQ.MeasurementSpecification type="NCQA" />
          <CMQ.DataSource data={PMD.dataSourceData} />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation hybridMeasure />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure
                data={PMD.data}
                rateReadOnly={rateReadOnly}
                hybridMeasure
              />
              <CMQ.DeviationFromMeasureSpec categories={PMD.categories} />
            </>
          )}
          {isOtherMeasureSpecSelected && <CMQ.OtherPerformanceMeasure />}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && (
            <CMQ.OptionalMeasureStrat
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
