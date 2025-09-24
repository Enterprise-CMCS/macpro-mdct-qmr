import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams, useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Api from "hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import { AnyObject, CoreSetAbbr, UserRoles } from "types";
import { useUser } from "hooks/authHooks";
import { featuresByYear } from "utils/featuresByYear";

enum ReportType {
  SEPARATE = "separate",
  COMBINED = "combined",
}

interface AdultCoreSetReportType {
  "AdultCoreSet-ReportType": ReportType;
}

export const AddAdultCoreSet = () => {
  const mutation = Api.useAddCoreSet();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState, userRole } = useUser();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
  });

  const watchReportType = methods.watch("AdultCoreSet-ReportType");

  const { state, year } = useParams();
  const register = useCustomRegister<AdultCoreSetReportType>();

  // block display from state users without permissions for the corresponding state
  if (userState && userState !== state && userRole === UserRoles.STATE_USER) {
    return (
      <CUI.Box data-testid="unauthorized-container">
        <QMR.Notification
          alertStatus="error"
          alertTitle="You are not authorized to view this page"
        />
      </CUI.Box>
    );
  }

  const onSubmit = (data: AnyObject) => {
    switch (data["AdultCoreSet-ReportType"]) {
      case ReportType.SEPARATE:
        mutation.mutate(CoreSetAbbr.ACSM, {
          onSuccess: () => {
            mutation.mutate(CoreSetAbbr.ACSC, {
              onSuccess: () => {
                queryClient.refetchQueries({
                  queryKey: ["coreSets", state, year],
                });
                navigate(`/${state}/${year}`);
              },
            });
          },
        });
        break;
      case ReportType.COMBINED:
        mutation.mutate(CoreSetAbbr.ACS, {
          onSuccess: () => {
            queryClient.refetchQueries({
              queryKey: ["coreSets", state, year],
            });
            navigate(`/${state}/${year}`);
          },
        });
    }
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: `/${state}/${year}`,
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
        { path: `/${state}/${year}/add-adult`, name: "Add Adult Core Set" },
      ]}
    >
      <CUI.Stack spacing="5">
        <CUI.Heading fontSize="2xl">Adult Core Set Details</CUI.Heading>
        <CUI.Text>
          Complete the details below and when finished create the additional
          Adult Core Set report(s).
        </CUI.Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CUI.Container maxW="container.xl" as="section">
              <CUI.Stack spacing="10">
                <QMR.RadioButton
                  formLabelProps={{ fontWeight: 600 }}
                  label="1. How are you reporting Adult Core Set measures?"
                  {...register("AdultCoreSet-ReportType")}
                  options={[
                    {
                      displayValue:
                        "Reporting Medicaid and CHIP measures in separate Core Sets",
                      value: ReportType.SEPARATE,
                    },
                    {
                      displayValue:
                        "Reporting Medicaid and CHIP measures in combined Core Sets",
                      value: ReportType.COMBINED,
                    },
                  ]}
                />
                <CUI.Box>
                  <CUI.Text fontWeight="600">
                    2. Finish to create the Adult Core Set report(s)
                  </CUI.Text>
                  <CUI.Text pl={4} pt={1}>
                    Remember to complete all Adult Core Set Questions and Adult
                    Core Set Measures to submit for CMS review.
                  </CUI.Text>

                  <CUI.HStack paddingTop="5">
                    <QMR.ContainedButton
                      buttonProps={{ type: "submit", background: "blue.500" }}
                      buttonText={mutation.isPending ? "Loading" : "Create"}
                      disabledStatus={!watchReportType || mutation.isPending}
                    />
                    <QMR.ContainedButton
                      buttonProps={{ color: "blue", colorScheme: "white" }}
                      buttonText="Cancel"
                      onClick={() => {
                        navigate(`/${state}/${year}`);
                      }}
                    />
                  </CUI.HStack>
                </CUI.Box>
              </CUI.Stack>
            </CUI.Container>
          </form>
        </FormProvider>
      </CUI.Stack>
    </QMR.StateLayout>
  );
};
