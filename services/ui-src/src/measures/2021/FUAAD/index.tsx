import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { Params } from "Routes";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Measure } from "measures/types";

export const FUAAD = ({ name, year, handleSubmit }: Measure.Props) => {
  const { coreSetId } = useParams<Params>();
  const { watch } = useFormContext<Measure.Form>();
  const watchReportingRadio = watch("DidReport");
  const watchMeasureSpecification = watch("MeasurementSpecification");
  const watchDataSourceAdmin = watch("DataSource");
  const isOtherDataSource =
    watchDataSourceAdmin?.indexOf("Other Data Source") !== -1;
  console.log(isOtherDataSource);
  const isHEIDS = watchMeasureSpecification === "NCQA/HEDIS";
  const isOtherSpecification = watchMeasureSpecification === "Other";

  console.log(isHEIDS);

  return (
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
          {isHEIDS && <Q.PerformanceMeasure />}
          {!isOtherSpecification && (
            <Q.DeviationFromMeasureSpec options={Q.defaultDeviationOptions} />
          )}
          {!isHEIDS && (isOtherSpecification || isOtherDataSource) && (
            <Q.OtherPerformanceMeasure />
          )}
          <Q.CombinedRates />
          <Q.OptionalMeasureStratification
            {...Q.DefaultOptionalMeasureStratProps}
          />
        </>
      )}
      <Q.AdditionalNotes />
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
  );
};
