import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { SPA } from "libs/spaLib";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/authHooks";
import { CoreSetAbbr, UserRoles } from "types";
import { featuresByYear } from "utils/featuresByYear";

interface HealthHome {
  "HealthHomeCoreSet-SPA": string;
  "HealthHomeCoreSet-ShareSSM": string;
  "HealthHomeCoreSet-ShareSSM-Name": string;
  "HealthHomeCoreSet-ShareSSM-Description": string;
  "add-ssm": NewMeasure[];
}

interface NewMeasure {
  name: string;
  description: string;
}

export const AddHHCoreSet = () => {
  const mutation = Api.useAddCoreSet();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userState, userRole } = useUser();
  const { data, isLoading } = Api.useGetCoreSets(true);
  const { state, year } = useParams();

  const methods = useForm<HealthHome>({
    shouldUnregister: true,
    mode: "all",
  });

  const register = useCustomRegister<HealthHome>();
  const watchSPAchoice = methods.watch("HealthHomeCoreSet-SPA");

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

  const sortedSPAs: QMR.SelectOption[] = SPA[year!]
    .filter((spa) => spa.state === state)
    .filter(
      (spa) =>
        !data?.Items.some((coreset: any) =>
          coreset.compoundKey.includes(spa.id)
        )
    )
    .map((spa) => {
      return {
        displayValue: `${spa.state} ${spa.id} - ${spa.name}`,
        value: spa.id,
      };
    })
    .sort((a, b) => (a.displayValue > b.displayValue && 1) || -1);

  const handleSubmit = (data: HealthHome) => {
    if (data["HealthHomeCoreSet-SPA"]) {
      const coreset: unknown = `${CoreSetAbbr.HHCS}_${data["HealthHomeCoreSet-SPA"]}`;
      mutation.mutate(coreset as CoreSetAbbr, {
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
        {
          path: `/${state}/${year}`,
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
        { path: `/${state}/${year}/add-hh`, name: "Add Health Home Core Set" },
      ]}
    >
      <CUI.Skeleton isLoaded={!isLoading}>
        <CUI.Box maxW="container.lg">
          <CUI.Heading fontSize="2xl" fontWeight="600" my="2">
            Health Home Core Set Details
          </CUI.Heading>
          <CUI.Text>
            Complete the details below and when finished create the additional
            Health Home Core Set package. You can submit one Health Home Core
            Set for each Health Home program that requires reporting.
          </CUI.Text>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <CUI.Box as="section" mt="6">
                <CUI.OrderedList spacing="10">
                  <CUI.ListItem>
                    <QMR.Select
                      placeholder="Select option"
                      selectProps={{
                        whiteSpace: "normal",
                        flexWrap: "wrap",
                        minH: "2.5em",
                        height: "-moz-fit-content",
                      }}
                      formLabelProps={{ fontWeight: 600 }}
                      {...register("HealthHomeCoreSet-SPA")}
                      options={sortedSPAs}
                      label="Select the Health Home program you are reporting on"
                    />
                  </CUI.ListItem>
                  <CUI.ListItem>
                    <CUI.Box>
                      <CUI.Text fontWeight="600">
                        Finish to create a Health Home Core Set
                      </CUI.Text>
                      <CUI.Text pt={1}>
                        Remember to complete all Health Home Core Set Questions
                        and Health Home Core Set Measures to submit for CMS
                        review.
                      </CUI.Text>

                      <CUI.HStack paddingTop="5">
                        <QMR.ContainedButton
                          buttonProps={{
                            type: "submit",
                            colorScheme: "blue",
                          }}
                          buttonText="Create"
                          disabledStatus={!sortedSPAs.length || !watchSPAchoice}
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
                  </CUI.ListItem>
                </CUI.OrderedList>
              </CUI.Box>
            </form>
          </FormProvider>
        </CUI.Box>
      </CUI.Skeleton>
    </QMR.StateLayout>
  );
};
