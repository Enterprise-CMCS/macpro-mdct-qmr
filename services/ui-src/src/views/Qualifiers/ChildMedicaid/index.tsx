import { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { CCSMQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";

export const CCSMQualifiers = () => {
  const { state, year } = useParams();
  const mutation = useUpdateMeasure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // get qualifier data and prepoulate default values if data exists
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.CCSM,
    measure: "CSQ",
  });

  const methods = useForm<CCSMQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      PercentageEnrolledInEachDeliverySystem: [
        {
          label: "Fee-for-Service",
          UnderTwentyOne: "",
          userGenerated: false,
        },
        {
          label: "PCCM",
          UnderTwentyOne: "",
          userGenerated: false,
        },
        {
          label: "Managed Care",
          UnderTwentyOne: "",
          userGenerated: false,
        },
        {
          label: "Integrated Care Model (ICM)",
          UnderTwentyOne: "",
          userGenerated: false,
        },
      ],
      CoreSetMeasuresAuditedOrValidatedDetails: [Q.initialAuditValues],
    },
  });

  useEffect(() => {
    methods.reset(data?.Item?.data);
  }, [data, methods]);

  const handleSubmit = (data: CCSMQualifierForm) => {
    const requestData = {
      data,
      measure: "CSQ",
      status: MeasureStatus.COMPLETE,
      coreSet: CoreSetAbbr.CCSM,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);
        navigate(`/${state}/${year}/${CoreSetAbbr.CCSM}`);
      },
    });
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCSM}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCSM}/CSQ`,
          name: `Child Core Set Qualifiers`,
        },
      ]}
      buttons={
        data?.Item?.data && (
          <QMR.LastSavedText lastAltered={data?.Item.lastAltered} />
        )
      }
    >
      <FormProvider {...methods}>
        <QMR.AdminMask />
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <CUI.Box maxW="5xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
                Child Core Set Questions: Medicaid
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
