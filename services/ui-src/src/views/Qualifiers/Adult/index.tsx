import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "./schema";
import { ACSQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { Params } from "Routes";
import { useUpdateMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";

export const ACSQualifiers = () => {
  const { state, year } = useParams<Params>();
  const mutation = useUpdateMeasure();
  const navigate = useNavigate();

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
      CoreSetMeasuresAuditedOrValidatedDetails: [
        {
          MeasuresAuditedOrValidated: [],
          WhoConductedAuditOrValidation: "",
        },
      ],
    },
  });

  const handleSubmit = (data: ACSQualifierForm) => {
    const requestData = {
      data,
      measure: "CSQ",
      status: MeasureStatus.COMPLETE,
      coreSet: CoreSetAbbr.ACS,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page
        navigate(`/${state}/${year}/${CoreSetAbbr.ACS}`);
      },
    });
    // submit data basically update measure , redirect back to core set list and display that coreset qualifiers have been submitted
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.ACS}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.ACS}/CSQ`,
          name: `Adult Core Set Qualifiers`,
        },
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
