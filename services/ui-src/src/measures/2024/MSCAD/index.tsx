import * as Q from "./questions";
import * as QMR from "components";
import * as CMQ from "measures/2024/shared/CommonQuestions";
import * as Types from "measures/2024/shared/CommonQuestions/types";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { useEffect } from "react";
import * as PMD from "./data";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

export const MSCAD = ({
  name,
  year,
  measureId,
  setValidationFunctions,

  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);
  const { watch } = useFormContext<Types.DefaultFormData>();
  const data = watch();

  console.log(data);
  return (
    <>
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={measureId}
      />
      <Q.HowDidYouReport
        reportingYear={year}
        healthHomeMeasure
        removeLessThan30
      />
      {data["DidReport"] !== "no" && (
        <>
          <CMQ.StatusOfData />
          <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
          <Q.DataSource type="adult" />
          <CMQ.DateRange type="adult" />
          <CMQ.DefinitionOfPopulation />
          {isPrimaryMeasureSpecSelected && (
            <>
              <CMQ.PerformanceMeasure data={PMD.data} rateReadOnly={false} />
              <CMQ.DeviationFromMeasureSpec />
            </>
          )}
          {/* Show Other Performance Measures when isHedis is not true  */}
          {isOtherMeasureSpecSelected && (
            <CMQ.OtherPerformanceMeasure rateAlwaysEditable />
          )}
          <CMQ.CombinedRates />
          {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
