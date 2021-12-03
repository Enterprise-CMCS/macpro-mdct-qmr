import * as CUI from "@chakra-ui/react";
import * as CoreQs from "components/CoreQuestions";
import * as QMR from "components/Inputs";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { useForm, FormProvider } from "react-hook-form";
import { DemoFormType } from "views/DemoQuestions/DemoFormType";

export const DemoQuestions = () => {
  const { year, measureId } = useParams<Params>();

  const methods = useForm<DemoFormType>({
    shouldUnregister: true,
    mode: "all",
  });
  const { register } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <CUI.Container maxW="2xl">
          <CUI.OrderedList>
            <CoreQs.AreYouReporting
              options={[
                {
                  displayValue: `Yes, I am reporting Admission to an Institution from the Community (${measureId}) for FFY ${year} quality measure reporting.`,
                  value: "Yes, I am reporting",
                },
                {
                  displayValue: `No, I am not reporting Admission to an Institution from the Community (${measureId}) for FFY ${year} quality measure reporting.`,
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
          </CUI.OrderedList>
          <button>Submit</button>
        </CUI.Container>
      </form>
    </FormProvider>
  );
};
