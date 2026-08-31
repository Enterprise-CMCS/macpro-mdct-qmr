import * as Api from "hooks/api";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { CoreSetAbbr, MeasureData } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { featuresByYear } from "utils/featuresByYear";
import { useState, useEffect } from "react";

interface NewMeasure {
  description: string;
  detailedDescription: string;
}

interface NewSSMs {
  "add-ssm": NewMeasure[];
}

export const AddStateSpecificMeasure = () => {
  const [existingMeasures, setExistingMeasures] = useState<MeasureData[]>([]);
  const [existingIds, setExistingIds] = useState<number[]>([]);
  const { isLoading, isError, data: allMeasureData } = Api.useGetMeasures();
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

  useEffect(() => {
    if (isLoading || isError) return;

    // This filter matches the logic in CoreSet/index.tsx#useMeasureTableDataBuilder
    const measures = allMeasureData!.Items!.filter(
      (measureData) =>
        measureData.userCreated &&
        !measureData.placeholder &&
        measureData.measure.startsWith("SS-")
    );
    const ids = measures
      .map((measureData) => measureData.measure.match(/\d+/))
      .filter((match) => !!match)
      .map(Number);

    setExistingMeasures(measures);
    setExistingIds(ids);
  }, [isLoading, isError, allMeasureData]);

  // Save each of the new SSMs
  const handleSubmit = (data: any) => {
    if (isLoading || isError) {
      console.error(
        `Cannot create new measure without first loading existing measures! isLoading: ${isLoading}, isError: ${isError}`
      );
      return;
    }

    const newMeasures = data["add-ssm"];

    if (!newMeasures || newMeasures.length === 0) {
      console.error("Error finding State Specific Measures data");
      return;
    }

    newMeasures.forEach((measure: NewMeasure, index: number) => {
      // Start by assuming this is a new SSM with ID 1.
      let measureIdNumber = index + 1;

      // If there's already an existing SSM, then use the next available ID number.
      // (For example, if a user creates SS-1-HH, SS-2-HH, and SS-3-HH and then
      // deletes SS-2-HH, we fill in the gap by assigning the next new SSM an ID
      // of SS-2-HH.)
      // if (existingIds.includes(measureIdNumber)) {
      //   while (existingIds.includes(measureIdNumber) && measureIdNumber < 5) {
      //     measureIdNumber++;
      //   }
      // }

      // Save the SSM with its corresponding ID (as the `measure` attribute).
      if (state && year) {
        // Add this measure ID to the existingIDs array so we don't overwrite
        // this SSM with the next one.
        setExistingIds([...existingIds, measureIdNumber]);

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
            <QMR.AddSSM userCreatedCount={existingMeasures.length}></QMR.AddSSM>
          </CUI.Box>
          <CUI.HStack paddingTop="5" gap="1rem">
            <QMR.ContainedButton type="submit" buttonText="Create" />
            <QMR.ContainedButton
              variant="link"
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
