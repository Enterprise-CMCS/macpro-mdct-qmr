/* eslint-disable no-console */
import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { featuresByYear } from "utils/featuresByYear";

interface NewMeasure {
  description: string;
  detailedDescription: string;
}

interface NewSSMs {
  "add-ssm": NewMeasure[];
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
  const userInfo = useUser();

  const mutation = Api.useAddMeasure();
  const navigate = useNavigate();
  const { coreSetId, state, year } = useParams();

  const updateCoreSet = Api.useEditCoreSet().mutate;

  const methods = useForm<NewSSMs>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      "add-ssm": [{ description: "", detailedDescription: "" }],
    },
  });

  // Create an array of IDs for existing user-created SSMs for the core set (if any).
  const existingIds: number[] = [];
  userCreatedMeasureIds.forEach((id) => {
    // Get the ID number from the string.
    const matches = id.match(/\d+/) || [];

    // Add it to the existingIDs array
    if (matches.length) {
      existingIds.push(parseInt(matches[0]!));
    }
  });

  // Save each of the new SSMs
  const handleSubmit = (data: any) => {
    const newMeasures = data["add-ssm"];

    if (!newMeasures || newMeasures.length === 0) {
      console.error("Error finding State Specific Measures data");
      return;
    }

    newMeasures.forEach((measure: NewMeasure, index: number) => {
      // Start by assuming this is a new SSM with ID 1.
      let measureIdNumber = index + 1;

      /*
       * If there's already an existing SSM, then use the next available ID number.
       * (For example, if a user creates SS-1-HH, SS-2-HH, and SS-3-HH and then
       * deletes SS-2-HH, we fill in the gap by assigning the next new SSM an ID
       * of SS-2-HH.)
       */
      if (existingIds.includes(measureIdNumber)) {
        while (existingIds.includes(measureIdNumber) && measureIdNumber < 5) {
          measureIdNumber++;
        }
      }

      // Save the SSM with its corresponding ID (as the `measure` attribute).
      if (state && year) {
        /*
         * Add this measure ID to the existingIDs array so we don't overwrite
         * this SSM with the next one.
         */
        existingIds.push(measureIdNumber);

        const requestData = {
          body: {
            description: measure["description"],
            detailedDescription: measure["detailedDescription"],
            placeholder: false,
            userState: state,
            userCreated: true,
          },
          coreSet: coreSetId as CoreSetAbbr,
          measure: `SS-${measureIdNumber}-HH`,
          state,
          year,
        };

        mutation.mutate(requestData, {
          onSuccess: () => {
            updateCoreSet({
              coreSet: coreSetId as CoreSetAbbr,
              state: state ?? "",
              year,
              body: {
                submitted: false,
                status: CoreSetTableItem.Status.IN_PROGRESS,
                userRole: userInfo.userRole,
                userState: userInfo.userState,
              },
            });

            navigate(`/${state}/${year}/${coreSetId}`, {
              state: { success: true },
            });
          },
          onError: () => {
            navigate(`/${state}/${year}/${coreSetId}`, {
              state: { success: false },
            });
          },
        });
      }
    });
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: `/${state}/${year}/${coreSetId}`,
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
        {
          path: `/${state}/${year}/${coreSetId}/add-ssm`,
          name: "Add State Specific Measures",
        },
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <CUI.Box maxW="container.lg">
            <CUI.Heading fontSize="2xl" fontWeight="600" my="2">
              Health Home State Specific Measure Details
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
