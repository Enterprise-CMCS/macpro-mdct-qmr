import * as CUI from "@chakra-ui/react";
import * as CoreQs from "components/CoreQuestions";
import * as QMR from "components";
import { useForm, FormProvider } from "react-hook-form";
import { DemoForm } from "views/DemoQuestions/DemoFormType";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "./ValidationSchema";

export const DemoQuestions = () => {
  const methods = useForm<DemoForm.DemoFormType>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });
  const { register } = methods;

  const handleSave = () => {
    console.log("saved");
    methods.handleSubmit((data) => console.log(data));
  };

  const handleSubmit = () => {
    console.log("submitted");
    methods.handleSubmit((data) => console.log(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
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
          <CUI.Container maxW="2xl">
            <CoreQs.AreYouReporting
              options={[
                {
                  displayValue: `Yes, I am reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality params.measure reporting.`,
                  value: "Yes, I am reporting",
                },
                {
                  displayValue: `No, I am not reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality measure reporting.`,
                  value: "No, I am not reporting",
                },
              ]}
            />
            <CoreQs.StatusOfDataReported
              options={[
                {
                  displayValue: "I am reporting provisional data",
                  value: "I am reporting provisional data",
                  children: [
                    <QMR.TextArea
                      {...register(
                        "statusOfDataReporting.statusOfDataReportingAdditional"
                      )}
                      label="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
                      formLabelProps={{
                        fontWeight: "normal",
                        fontSize: "normal",
                      }}
                      key="status-2a"
                    />,
                  ],
                },
                {
                  displayValue: "I am reporting final data",
                  value: "I am reporting final data",
                },
              ]}
            />
            <button>Submit</button>
          </CUI.Container>
        </QMR.StateLayout>
      </form>
    </FormProvider>
  );
};
