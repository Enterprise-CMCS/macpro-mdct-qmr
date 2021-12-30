import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { Params } from "Routes";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { Measure } from "measures/types";

export const FUAAD = ({ name, year, handleSubmit }: Measure.Props) => {
  const { coreSetId } = useParams<Params>();
  const { watch } = useFormContext<Measure.Form>();
  const watchReportingRadio = watch("DidReport");
  const { readOnly } = useUser();

  return (
    <>
      {readOnly && (
        <CUI.Box
          top={0}
          left={0}
          position={"fixed"}
          width={"100vw"}
          height={"100vh"}
          zIndex={999}
          // backgroundColor={"red"}
          backgroundImage={"none"}
        />
      )}
      <>
        <Q.Reporting
          reportingYear={year}
          measureName={name}
          measureAbbreviation={coreSetId as string}
        />

        {!watchReportingRadio?.includes("No") && (
          <>
            <Q.Status />
            <Q.MeasurementSpecification />
            <Q.DataSource />
            <Q.DateRange type="adult" />
            <Q.DefinitionOfPopulation />
            <Q.PerformanceMeasure />
            <Q.DeviationFromMeasureSpec options={Q.defaultDeviationOptions} />
            <Q.OtherPerformanceMeasure />
          </>
        )}
        <Q.CombinedRates />
        <Q.AdditionalNotes />
        <Q.OptionalMeasureStratification
          {...Q.DefaultOptionalMeasureStratProps}
        />
        <CUI.Stack alignItems="flex-start">
          <CUI.Heading fontSize="xl" fontWeight="600">
            Complete the Measure
          </CUI.Heading>
          <CUI.Text p="3" pl="5">
            Complete the measure and mark it for submission to CMS for review
          </CUI.Text>
          <QMR.ContainedButton
            buttonProps={{
              ml: "5",
              type: "submit",
              colorScheme: "blue",
              textTransform: "capitalize",
            }}
            buttonText="Complete Measure"
            onClick={handleSubmit}
          />
        </CUI.Stack>
      </>
    </>
  );
};
