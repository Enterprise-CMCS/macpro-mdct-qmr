import * as Q from "./questions";
import * as QMR from "components";
import * as CMQ from "shared/commonQuestions";
import { DefaultFormData } from "shared/types/FormData";
import { useFormContext } from "react-hook-form";
import { validationFunctions } from "./validation";
import { useEffect } from "react";
import * as PMD from "./data";
import * as DC from "dataConstants";
import { NotCollectingOMS } from "shared/commonQuestions/NotCollectingOMS";

export const MSCAD = ({
  year,
  setValidationFunctions,
  isPrimaryMeasureSpecSelected,
  showOptionalMeasureStrat,
  isOtherMeasureSpecSelected,
}: QMR.MeasureWrapperProps) => {
  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions({ functions: validationFunctions });
    }
  }, [setValidationFunctions]);
  const { watch } = useFormContext<DefaultFormData>();
  const data = watch();

  return (
    <>
      <Q.Reporting reportingYear={year} />
      {data[DC.DID_COLLECT] !== DC.NO && (
        <>
          <Q.HowDidYouReport reportingYear={year} />
          <>
            {data[DC.DID_REPORT] !== DC.NO && (
              <>
                <CMQ.StatusOfData />
                <CMQ.MeasurementSpecification type="HEDIS" coreset="adult" />
                <Q.DataSource type="adult" />
                <CMQ.DateRange type="adult" />
                <CMQ.DefinitionOfPopulation />
                {isPrimaryMeasureSpecSelected && (
                  <>
                    <CMQ.PerformanceMeasure
                      data={PMD.data}
                      rateReadOnly={false}
                    />
                    <CMQ.DeviationFromMeasureSpec />
                  </>
                )}
                {/* Show Other Performance Measures when isHedis is not true  */}
                {isOtherMeasureSpecSelected && (
                  <CMQ.OtherPerformanceMeasure rateAlwaysEditable />
                )}
                {showOptionalMeasureStrat && <NotCollectingOMS year={year} />}
              </>
            )}
          </>
        </>
      )}
      <CMQ.AdditionalNotes />
    </>
  );
};
