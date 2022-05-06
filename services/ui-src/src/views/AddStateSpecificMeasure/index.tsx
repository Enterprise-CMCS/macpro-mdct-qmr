import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface StateSpecificMeasure {}

export const AddStateSpecificMeasure = () => {
  const { coreSetId, state, year } = useParams();

  const methods = useForm<StateSpecificMeasure>({
    shouldUnregister: true,
    mode: "all",
  });

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}/${coreSetId}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreSetId}/add-ssm`,
          name: "Add State-Specific Measures",
        },
      ]}
    >
      <CUI.Box maxW="container.lg">
        <CUI.Heading fontSize="2xl" fontWeight="600" my="2">
          Health Home Core Set Details
        </CUI.Heading>
        <FormProvider {...methods}>
          <QMR.AddSSM></QMR.AddSSM>
        </FormProvider>
      </CUI.Box>
    </QMR.StateLayout>
  );
};
