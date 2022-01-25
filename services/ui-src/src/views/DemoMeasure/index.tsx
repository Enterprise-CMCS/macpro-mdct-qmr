import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "measures/schema";
import { Measure } from "measures/types";

export const DemoMeasure = () => {
  const methods = useForm<Measure.Form>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });
  const watchReportingRadio = methods.watch("DidReport");

  const handleSave = () => {
    console.log("saved");
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/OH/2021`, name: `FFY 2021` },
        { path: `/OH/2021/ACS`, name: `Adult` },
        { path: `/OH/2021/ACS/AIF-HH`, name: `DQT-AD: Demo Questions` },
      ]}
      buttons={
        <QMR.MeasureButtons
          handleSave={handleSave}
          lastSavedText="Saved Moments Ago"
        />
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Container maxW="2xl" as="section">
            <Q.Reporting
              reportingYear={2021}
              measureName="Admission to an Institution from the Community"
              measureAbbreviation="AIF-HH"
            />
            {!watchReportingRadio?.includes("No") && (
              <>
                <Q.Status />
                <Q.MeasurementSpecification />
                <Q.DataSource />
                <Q.DateRange type="adult" />
                <Q.DefinitionOfPopulation />
                <Q.DeviationFromMeasureSpec
                  options={Q.defaultDeviationOptions}
                />
                <Q.OptionalMeasureStratification
                  {...Q.DefaultOptionalMeasureStratProps}
                />
              </>
            )}
            <Q.CombinedRates />
            <CUI.Stack alignItems="flex-start">
              <CUI.Heading fontSize="xl" fontWeight="600">
                Complete the Measure
              </CUI.Heading>
              <CUI.Text p="3" pl="5">
                Complete the measure and mark it for submission to CMS for
                review
              </CUI.Text>
              <QMR.ContainedButton
                buttonProps={{
                  ml: "5",
                  type: "submit",
                  colorScheme: "blue",
                  textTransform: "capitalize",
                }}
                buttonText="Complete Measure"
              />
            </CUI.Stack>
            <Q.OtherPerformanceMeasure />
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
