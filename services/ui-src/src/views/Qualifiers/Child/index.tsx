import { useEffect } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { DeliverySystems } from "./deliverySystems";
import * as Common from "../Common";
import { useForm, FormProvider } from "react-hook-form";
import { CCSQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";

export const CCSQualifiers = () => {
  const { state, year } = useParams();
  const mutation = useUpdateMeasure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // get qualifier data and prepoulate default values if data exists
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.CCS,
    measure: "CSQ",
  });

  const methods = useForm<CCSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      PercentageEnrolledInEachDeliverySystem: [
        {
          label: "Fee-for-Service",
          UnderTwentyOneMedicaid: "",
          UnderTwentyOneCHIP: "",
        },
        {
          label: "PCCM",
          UnderTwentyOneMedicaid: "",
          UnderTwentyOneCHIP: "",
        },
        {
          label: "Managed Care",
          UnderTwentyOneMedicaid: "",
          UnderTwentyOneCHIP: "",
        },
        {
          label: "Integrated Care Model (ICM)",
          UnderTwentyOneMedicaid: "",
          UnderTwentyOneCHIP: "",
        },
      ],
      CoreSetMeasuresAuditedOrValidatedDetails: [Common.initialAuditValues],
    },
  });

  useEffect(() => {
    if (!methods.formState.isDirty) {
      methods.reset(data?.Item?.data);
    }
  }, [data, methods]);

  const handleValidation = (data: CCSQualifierForm) => {
    // handle save
    handleSave(data);
    // validateAndSetErrors
    console.log(data);
  };

  const handleSubmit = (data: CCSQualifierForm) => {
    // validateAndSetErrors
    // proceed to submit?
    handleSave(data, true);
  };

  const handleSave = (data: CCSQualifierForm, navigateAway?: boolean) => {
    const requestData = {
      data,
      measure: "CSQ",
      status: MeasureStatus.COMPLETE,
      coreSet: CoreSetAbbr.CCS,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);
        navigateAway && navigate(`/${state}/${year}/${CoreSetAbbr.CCS}`);
      },
    });
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCS}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.CCS}/CSQ`,
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
                Child Core Set Questions: Medicaid & CHIP
              </CUI.Text>
              <QMR.SupportLinks />
            </CUI.Box>
            <CUI.OrderedList>
              <DeliverySystems />
              <Common.Audit type="CH" />
              <Common.ExternalContractor />
              <Common.CompleteCoreSets
                handleValidation={methods.handleSubmit(handleValidation)}
                type="CH"
              />
            </CUI.OrderedList>
          </CUI.Box>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
