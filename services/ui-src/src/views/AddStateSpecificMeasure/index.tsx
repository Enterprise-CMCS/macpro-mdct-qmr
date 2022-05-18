import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { CoreSetAbbr } from "types";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface StateSpecificMeasure {
  coreSet: string;
  measure: string;
  state: string;
  year: string;
}

interface NewMeasure {
  description: string;
  detailedDescription: string;
}

interface UserMeasuresLocationState {
  userCreatedMeasureIds: string[];
}

export const AddStateSpecificMeasure = () => {
  // Get the count of user-created SSMs (if any) from the location.state.
  const location = useLocation();
  const locationState = location.state as UserMeasuresLocationState;
  const userCreatedMeasureIds = locationState?.userCreatedMeasureIds ?? [];
  const userCreatedMeasuresCount = userCreatedMeasureIds.length;

  const mutation = Api.useAddMeasure();
  const navigate = useNavigate();
  const { coreSetId, state, year } = useParams();

  const methods = useForm<StateSpecificMeasure>({
    shouldUnregister: true,
    mode: "all",
  });

  // Save the new SSMs
  const handleSubmit = (data: any) => {
    if (!data["add-ssm"] || data["add-ssm"].length === 0) {
      console.error("Error finding State Specific Measures data");
      return;
    }

    data["add-ssm"].forEach((measure: NewMeasure) => {
      if (state && year) {
        const requestData = {
          body: {
            description: measure["description"],
            detailedDescription: measure["detailedDescription"],
            userState: state,
            userCreated: true,
          },
          coreSet: coreSetId as CoreSetAbbr,
          measure: measure["name"],
          state,
          year,
        };

        mutation.mutate(requestData, {
          onSuccess: () => {
            navigate(`/${state}/${year}/${coreSetId}`, {
              state: { success: true },
            });
          },
        });
      }
    });
  };

  const onErrors = (errors: any) => {
    console.error(errors);
  };

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit, onErrors)}>
          <CUI.Box maxW="container.lg">
            <CUI.Heading fontSize="2xl" fontWeight="600" my="2">
              Health Home Core Set Details
            </CUI.Heading>
            <QMR.AddSSM
              userCreatedCount={userCreatedMeasuresCount}
            ></QMR.AddSSM>
          </CUI.Box>
          <CUI.HStack paddingTop="5">
            <QMR.ContainedButton
              buttonProps={{
                type: "submit",
                colorScheme: "blue",
              }}
              buttonText="Create"
            />
            <QMR.ContainedButton
              buttonProps={{ color: "blue.500", colorScheme: "white" }}
              buttonText="Cancel"
              onClick={() => {
                navigate(`/${state}/${year}/${coreSetId}`);
              }}
            />
          </CUI.HStack>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
