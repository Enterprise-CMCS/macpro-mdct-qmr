import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams, useNavigate } from "react-router-dom";
import { Params } from "Routes";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCustomRegister } from "hooks/useCustomRegister";
import { SPA } from "libs/spaLib";
import Joi from "joi";
import { SelectOption } from "components";
interface HealthHome {
  "HealthHomeCoreSet-SPA": string;
  "HealthHomeCoreSet-ShareSSM": string;
}

const HealthHomeValidationSchema = Joi.object<HealthHome>({
  "HealthHomeCoreSet-SPA": Joi.string(),
  "HealthHomeCoreSet-ShareSSM": Joi.string(),
});

export const AddHHCoreSet = () => {
  const navigate = useNavigate();
  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(HealthHomeValidationSchema),
  });

  const register = useCustomRegister<HealthHome>();

  const { state, year } = useParams<Params>();

  const sortedSPAs: SelectOption[] = SPA.filter((spa) => spa.postal === state)
    .map((spa) => {
      return {
        displayValue: spa.name,
        value: spa.id,
      };
    })
    .sort((a, b) => (a.displayValue > b.displayValue && 1) || -1);

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/add-hh`, name: "Add Health Homes Core Set" },
      ]}
    >
      <CUI.Box maxW="container.lg">
        <CUI.Heading fontSize="2xl" fontWeight="600" my="2">
          Health Homes Core Set Details
        </CUI.Heading>
        <CUI.Text>
          Complete the details below and when finished create the additional
          Health Homes Core Set package. You can submit one Health Home Core set
          for each SPA that requires reporting.
        </CUI.Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
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
                        value: "yes",
                      },
                      {
                        displayValue:
                          "No, I’ll add State Specific Measures later.",
                        value: "no",
                      },
                    ]}
                  />
                </CUI.ListItem>
                <CUI.ListItem>
                  <CUI.Box>
                    <CUI.Text fontWeight="600">
                      Finish to create a Health Homes Core Set
                    </CUI.Text>
                    <CUI.Text pt={1}>
                      Remember to complete all Health Homes Core Set Questions
                      and Health Homes Core Set Measures to submit for CMS
                      review.
                    </CUI.Text>

                    <CUI.HStack paddingTop="5">
                      <QMR.ContainedButton
                        buttonProps={{ type: "submit" }}
                        buttonText="Create"
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
    </QMR.StateLayout>
  );
};
