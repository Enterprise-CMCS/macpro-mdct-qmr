import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "./schema";
import { DemoForm } from "./DemoFormType";

export const DemoMeasure = () => {
  const methods = useForm<DemoForm.DemoFormType>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });
  const watchReportingRadio = methods.watch("DidReport");

  const handleSave = () => {
    console.log("saved");
  };

  const handleSubmit = () => {
    console.log("submitted");
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
          handleSubmit={handleSubmit}
          lastSavedText="Saved Moments Ago"
        />
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Container maxW="2xl" as="section">
            <Q.MeasurementSpecification />
            <Q.Reporting
              reportingYear={2021}
              measureName="Admission to an Institution from the Community"
              measureAbbreviation="AIF-HH"
            />
            {!watchReportingRadio?.includes("No") && (
              <>
                <Q.Status />
                <Q.DataSource />{" "}
              </>
            )}
            <Q.AdditionalNotes />
            <CUI.Stack alignItems="flex-start">
              <CUI.Heading fontSize="xl" fontWeight="600">
                8. Complete the Measure
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
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
