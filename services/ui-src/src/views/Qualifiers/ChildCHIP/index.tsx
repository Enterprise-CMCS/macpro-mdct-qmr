import { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { DeliverySystems } from "./deliverySystems";
import * as Common from "../Common";
import { useForm, FormProvider } from "react-hook-form";
import { CCSCQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";

export const CCSCQualifiers = () => {
  const { state, year } = useParams();
  const mutation = useUpdateMeasure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // get qualifier data and prepoulate default values if data exists
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.CCSC,
    measure: "CSQ",
  });

  const methods = useForm<CCSCQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      PercentageEnrolledInEachDeliverySystem: [
        {
          label: "Fee-for-Service",
          UnderTwentyOne: "",
        },
        {
          label: "PCCM",
          UnderTwentyOne: "",
        },
        {
          label: "Managed Care",
          UnderTwentyOne: "",
        },
        {
          label: "Integrated Care Model (ICM)",
          UnderTwentyOne: "",
        },
      ],
      CoreSetMeasuresAuditedOrValidatedDetails: [Common.initialAuditValues],
    },
  });

  useEffect(() => {
    methods.reset(data?.Item?.data);
  }, [data, methods]);

  const handleSubmit = (data: CCSCQualifierForm) => {
    const requestData = {
      data,
      measure: "CSQ",
      status: MeasureStatus.COMPLETE,
      coreSet: CoreSetAbbr.CCSC,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);
        navigate(`/${state}/${year}/${CoreSetAbbr.CCSC}`);
      },
    });
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCSC}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCSC}/CSQ`,
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
                Child Core Set Questions: CHIP
              </CUI.Text>
              <QMR.SupportLinks />
            </CUI.Box>
            <CUI.OrderedList>
              <DeliverySystems />
              <Common.Audit type="CH" />
              <Common.ExternalContractor />
              <Common.CompleteCoreSets type="CH" />
            </CUI.OrderedList>
          </CUI.Box>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
