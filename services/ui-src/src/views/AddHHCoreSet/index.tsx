import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCustomRegister } from "hooks/useCustomRegister";
import { SPA } from "libs/spaLib";
import Joi from "joi";

interface HealthHome {
  "HealthHomeCoreSet-SPA": string;
  "HealthHomeCoreSet-ShareSSM": string;
}

const HealthHomeValidationSchema = Joi.object<HealthHome>({
  "HealthHomeCoreSet-SPA": Joi.string(),
  "HealthHomeCoreSet-ShareSSM": Joi.string(),
});

export const AddHHCoreSet = () => {
  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(HealthHomeValidationSchema),
  });

  const register = useCustomRegister<any>();

  const handleSave = () => {
    console.log("saved");
  };

  const { state, year } = useParams<Params>();

  const sortedSPAs = SPA.map((spa) => {
    return {
      displayValue: spa.name,
      value: spa.id,
    };
  }).sort((a, b) => {
    if (a.displayValue < b.displayValue) {
      return -1;
    }
    if (a.displayValue > b.displayValue) {
      return 1;
    }
    return 0;
  });

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        { path: `/${state}/${year}/add-hh`, name: "Add Health Homes Core Set" },
      ]}
      buttons={<QMR.ContainedButton buttonText="Save" onClick={handleSave} />}
    >
      <CUI.Text fontSize="2xl" fontWeight="600">
        Health Homes Core Set Details
      </CUI.Text>
      <CUI.Text>
        Complete the details below and when finished create the additionall
        Health Homes Core Set package. You can submit one Health Home Core set
        for each SPA that requires reporting.
      </CUI.Text>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Container maxW="container.xl" as="section">
            <CUI.Stack spacing="10">
              <QMR.Select
                selectProps={{ maxW: "30rem" }}
                formLabelProps={{ fontWeight: 600 }}
                {...register("HealthHomeCoreSet-SPA")}
                options={sortedSPAs}
                label="1. Select the SPA you are reporting on?"
              />

              <QMR.RadioButton
                formLabelProps={{ fontWeight: 600 }}
                label="2. Do you want to add State Specific Measures now?"
                {...register("HealthHomeCoreSet-ShareSSM")}
                options={[
                  {
                    displayValue:
                      "Yes, I want to add State Specific Measures now.",
                    value: "yes",
                  },
                  {
                    displayValue: "No, I’ll add State Specific Measures later.",
                    value: "no",
                  },
                ]}
              />

              <CUI.Box>
                <CUI.Text fontWeight="600">
                  3. Finish to create a Health Homes Core Set
                </CUI.Text>
                <CUI.Text pl={4} pt={1}>
                  Remember to complete all Health Homes Core Set Questions and
                  Health Homes Core Set Measures to submit for CMS review.
                </CUI.Text>

                <CUI.HStack paddingTop="5">
                  <QMR.ContainedButton
                    buttonProps={{ type: "submit" }}
                    buttonText="Create"
                  />
                  <QMR.ContainedButton
                    buttonProps={{ color: "blue", colorScheme: "white" }}
                    buttonText="Cancel"
                  />
                </CUI.HStack>
              </CUI.Box>
            </CUI.Stack>
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
