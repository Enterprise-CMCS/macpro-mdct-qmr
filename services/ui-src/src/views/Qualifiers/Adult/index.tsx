import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";

import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "views/Qualifiers/Adult/schema";
import { ACSQualifierForm } from "./types";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

export const ACSQualifiers = () => {
  const { state, year } = useParams<Params>();
  const methods = useForm<ACSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/ACS`,
          name: ``,
        },
        {
          path: `/${state}/${year}/ACS/qualifiers`,
          name: `Adult Core Set Qualifiers`,
        },
      ]}
      buttons={
        <QMR.MeasureButtons
          handleSubmit={handleSubmit}
          submitButtonText="Complete Core Set Questions"
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
          <CUI.Box maxW="5xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h3" fontSize="xl" mb="3" fontWeight="bold">
                Adult Core Set Questions
              </CUI.Text>
              <QMR.SupportLinks />
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
          </CUI.Box>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
