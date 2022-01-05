import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./qualifiers";

// import { useEffect } from "react";

import {
  useForm,
  FormProvider,
  // useFormContext
} from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "coreSets/adultMeasures/schema";
import { Measure } from "measures/types";

export const DemoQualifier = () => {
  const methods = useForm<Measure.Form>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });
  // const watchReportingRadio = methods.watch("DidReport");

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
        <form
          onSubmit={methods.handleSubmit((data) =>
            console.log("I am, here", data)
          )}
        >
          <CUI.Container maxW="2xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h3" fontSize="xl" mb="3" ml="3.5" fontWeight="bold">
                Adult Core Set Questions
              </CUI.Text>
              <CUI.Text mb="3" ml="3.5">
                For technical questions regaring use of this application, please
                reach out to{" "}
                <CUI.Link href="mailto:MDCT_help@cms.hhs.gov" color="blue.600">
                  MDCT_help@cms.hhs.gov
                </CUI.Link>
                . For content related questions, such as about measure
                specifications or what information to enter into each field,
                please reach out to{" "}
                <CUI.Link
                  href="mailto:MACQualityTA@cms.hhs.gov"
                  color="blue.600"
                >
                  MACQualityTA@cms.hhs.gov
                </CUI.Link>
                .
              </CUI.Text>
            </CUI.Box>

            <Q.DeliverySystems
              deliverySystemList={[
                {
                  key: "feeForService",
                  label: "Fee-for-Service",
                  twentyOneToSixtyFour: 0,
                  greaterThanSixtyFour: 0,
                  type: "default",
                },
                {
                  key: "pccm",
                  label: "PCCM",
                  twentyOneToSixtyFour: 0,
                  greaterThanSixtyFour: 0,
                  type: "default",
                },
                {
                  key: "managedCare",
                  label: "Managed Care",
                  twentyOneToSixtyFour: 0,
                  greaterThanSixtyFour: 0,
                  type: "default",
                },
                {
                  key: "integtatedCareModel",
                  label: "Integrated Care Model (ICM)",
                  twentyOneToSixtyFour: 0,
                  greaterThanSixtyFour: 0,
                  type: "default",
                },
              ]}
            />
            <Q.Audit />
            <Q.ExternalContractor />
            <Q.CompleteCoreSets />
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
