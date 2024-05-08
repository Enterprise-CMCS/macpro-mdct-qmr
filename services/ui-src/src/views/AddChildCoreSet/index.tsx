import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Api from "hooks/api";
import { useQueryClient } from "react-query";
import { AnyObject, CoreSetAbbr, UserRoles } from "types";
import { useUser } from "hooks/authHooks";

enum ReportType {
  SEPARATE = "separate",
  COMBINED = "combined",
}

interface ChildCoreSetReportType {
  "ChildCoreSet-ReportType": ReportType;
}

export const AddChildCoreSet = () => {
  const mutation = Api.useAddCoreSet();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState, userRole } = useUser();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
  });

  const watchReportType = methods.watch("ChildCoreSet-ReportType");

  const { state, year } = useParams();
  const register = useCustomRegister<ChildCoreSetReportType>();

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
    switch (data["ChildCoreSet-ReportType"]) {
      case ReportType.SEPARATE:
        mutation.mutate(CoreSetAbbr.CCSM, {
          onSuccess: () => {
            mutation.mutate(CoreSetAbbr.CCSC, {
              onSuccess: () => {
                queryClient.refetchQueries(["coreSets", state, year]);
                navigate(`/${state}/${year}`);
              },
            });
          },
        });
        break;
      case ReportType.COMBINED:
        mutation.mutate(CoreSetAbbr.CCS, {
          onSuccess: () => {
            queryClient.refetchQueries(["coreSets", state, year]);
            navigate(`/${state}/${year}`);
          },
        });
    }
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/add-child`, name: "Add Child Core Set" },
      ]}
    >
      <CUI.Stack spacing="5">
        <CUI.Heading fontSize="2xl">Child Core Set Details</CUI.Heading>
        <CUI.Text>
          Complete the details below and when finished create the additional
          Child Core Set report(s).
        </CUI.Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CUI.Container maxW="container.xl" as="section">
              <CUI.Stack spacing="10">
                <QMR.RadioButton
                  formLabelProps={{ fontWeight: 600 }}
                  label="1. How are you reporting Child Core Set measures?"
                  {...register("ChildCoreSet-ReportType")}
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
                    2. Finish to create the Child Core Set report(s)
                  </CUI.Text>
                  <CUI.Text pl={4} pt={1}>
                    Remember to complete all Child Core Set Questions and Child
                    Core Set Measures to submit for CMS review.
                  </CUI.Text>

                  <CUI.HStack paddingTop="5">
                    <QMR.ContainedButton
                      buttonProps={{ type: "submit", background: "blue.500" }}
                      buttonText={mutation.isLoading ? "Loading" : "Create"}
                      disabledStatus={!watchReportType || mutation.isLoading}
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
