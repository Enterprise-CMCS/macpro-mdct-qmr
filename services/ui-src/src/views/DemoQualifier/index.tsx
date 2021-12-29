import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./qualifiers";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "measures/schema";
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
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Container maxW="2xl" as="section">
            <Q.DeliverySystems
              deliverySystemList={[
                {
                  set: [
                    {
                      key: "feeForService",
                      label: "Fee-for-Service",
                      twentyOneToSixtyFour: 0,
                      greaterThanSixtyFour: 0,
                    },
                    {
                      key: "pccm",
                      label: "PCCM",
                      twentyOneToSixtyFour: 0,
                      greaterThanSixtyFour: 0,
                    },
                    {
                      key: "managedCare",
                      label: "Managed Care",
                      twentyOneToSixtyFour: 0,
                      greaterThanSixtyFour: 0,
                    },
                    {
                      key: "integtatedCareModel",
                      label: "Integrated Care Model (ICM)",
                      twentyOneToSixtyFour: 0,
                      greaterThanSixtyFour: 0,
                    },
                  ],
                },
              ]}
              label="1. Delivery System"
            />
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
