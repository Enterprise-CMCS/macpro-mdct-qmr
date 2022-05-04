import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as QMR from "components";
import { SPA } from "libs/spaLib";
import { SelectOption } from "components";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useQueryClient } from "react-query";
import { CoreSetAbbr } from "types";
interface HealthHome {
  "HealthHomeCoreSet-SPA": string;
  "HealthHomeCoreSet-ShareSSM": string;
  "HealthHomeCoreSet-ShareSSM-Name": string;
  "HealthHomeCoreSet-ShareSSM-Description": string;
}

export const AddHHCoreSet = () => {
  const mutation = Api.useAddCoreSet();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data } = Api.useGetCoreSets();
  const { state, year } = useParams();

  const methods = useForm<HealthHome>({
    shouldUnregister: true,
    mode: "all",
  });

  const register = useCustomRegister<HealthHome>();
  const watchSPAchoice = methods.watch("HealthHomeCoreSet-SPA");

  const sortedSPAs: SelectOption[] = SPA.filter((spa) => spa.state === state)
    .filter(
      (spa) =>
        !data.Items.some((coreset: any) => coreset.compoundKey.includes(spa.id))
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
        { path: `/${state}/${year}`, name: `FFY ${year}` },
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
            set for each SPA that requires reporting.
          </CUI.Text>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <CUI.Box as="section" mt="6">
                <CUI.OrderedList spacing="10">
                  <CUI.ListItem>
                    <QMR.Select
                      placeholder="Select option"
                      selectProps={{ maxW: "30rem" }}
                      formLabelProps={{ fontWeight: 600 }}
                      {...register("HealthHomeCoreSet-SPA")}
                      options={sortedSPAs}
                      label="Select the SPA you are reporting on?"
                    />
                  </CUI.ListItem>
                  <CUI.ListItem>
                    <QMR.RadioButton
                      formLabelProps={{ fontWeight: 600 }}
                      label="Do you want to add State Specific Measures now?"
                      {...register("HealthHomeCoreSet-ShareSSM")}
                      options={[
                        {
                          displayValue:
                            "Yes, I want to add State Specific Measures now.",
                          value: DC.YES,
                          children: [
                            <CUI.Stack spacing={6} mb={6} key="add-ssm-stack">
                              <CUI.Text>
                                In addition to the CMS recommended core and
                                utilization measures, identify and define the{" "}
                                <em>
                                  <strong>measures</strong>
                                </em>{" "}
                                the State will use to assess its Health Home
                                model of service delivery.
                              </CUI.Text>
                              <CUI.Text>
                                You may associate up to five core measures with
                                this core set.
                              </CUI.Text>
                              <QMR.TextInput
                                label="Name the measure"
                                {...register("HealthHomeCoreSet-ShareSSM-Name")}
                              ></QMR.TextInput>
                              <QMR.TextArea
                                label="Please provide a description of the measure"
                                {...register(
                                  "HealthHomeCoreSet-ShareSSM-Description"
                                )}
                              ></QMR.TextArea>
                            </CUI.Stack>,
                          ],
                        },
                        {
                          displayValue:
                            "No, I’ll add State Specific Measures later.",
                          value: DC.NO,
                        },
                      ]}
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
