import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";

import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "./schema";
import { ACSQualifierForm } from "./types";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

export const ACSQualifiers = () => {
  const { state, year } = useParams<Params>();
  const methods = useForm<ACSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
    defaultValues: {
      PercentageEnrolledInEachDeliverySystem: [
        {
          key: "FeeForService",
          label: "Fee-for-Service",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "PCCM",
          label: "PCCM",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "ManagedCare",
          label: "Managed Care",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
        {
          key: "IntegtatedCareModel",
          label: "Integrated Care Model (ICM)",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
          userGenerated: false,
        },
      ],
    },
  });

  console.log(methods.formState.errors);

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
          path: `/${state}/${year}/ACS/CSQ`,
          name: `Adult Core Set Qualifiers`,
        },
      ]}
      buttons={
        <QMR.MeasureButtons
          handleSubmit={handleSubmit}
          submitButtonText="Complete Core Set Questions"
        />
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Box maxW="5xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
                Adult Core Set Questions
              </CUI.Text>
              <QMR.SupportLinks />
            </CUI.Box>
            <CUI.OrderedList>
              <Q.DeliverySystems />
              <Q.Audit />
              <Q.ExternalContractor />
              <Q.CompleteCoreSets />
            </CUI.OrderedList>
          </CUI.Box>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
