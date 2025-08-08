import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { AddSSMCard } from "./AddSSMCard";
import { CoreSetAbbr, MeasureStatus, MeasureData, coreSetType } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import { measureDescriptions } from "measures/measureDescriptions";
import { SPA } from "libs/spaLib";
import { useEffect, useState } from "react";
import {
  useDeleteMeasure,
  useGetCoreSet,
  useGetMeasure,
  useGetMeasures,
  useUpdateMeasure,
} from "hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/authHooks";
import { coreSetTitles } from "shared/coreSetByYear";
import { Alert } from "@cmsgov/design-system";
import { parseLabelToHTML } from "utils";
import { featuresByYear } from "utils/featuresByYear";

interface HandleDeleteMeasureData {
  coreSet: CoreSetAbbr;
  measure: string;
  state: string;
  year: string;
}

interface MeasureTableItem {
  Type: coreSetType;
  title: string;
  abbr: string;
  path: string;
  reporting: string | undefined | null;
  rateComplete: number;
  createdAt: number;
  lastDateModified: number;
  id: string;
  userCreated?: boolean;
  actions: { itemText: string; handleSelect: () => void }[];
}

// Interface for handling location.state for a success flag, used when creating
// a new State Specific Measure.
interface LocationState {
  state: { success: boolean };
}

const QualifierStatus = ({ isComplete }: { isComplete: boolean }) => {
  if (isComplete) {
    return (
      <CUI.Flex alignItems="center">
        <CUI.Box pr="1" pt="2px" color="green.500">
          <HiCheckCircle />
        </CUI.Box>
        <CUI.Text data-cy="qualifier-status-text">Complete</CUI.Text>
      </CUI.Flex>
    );
  }
  return (
    <CUI.Text>
      Incomplete (Qualifier Questions must be complete to submit the Core Set)
    </CUI.Text>
  );
};

const QualifiersStatusAndLink = ({ coreSetId }: { coreSetId: CoreSetAbbr }) => {
  // get the core set qualifier measure for the coreset and display the status
  const { data, isLoading } = useGetMeasure({
    coreSet: coreSetId,
    measure: "CSQ",
  });
  let { state, year } = useParams();

  const coreSetInfo = coreSetId?.split("_") ?? [coreSetId];
  const tempSpa =
    coreSetInfo.length > 1
      ? SPA[year!].filter(
          (s) => s.id === coreSetInfo[1] && s.state === state
        )[0]
      : "";
  const spaName =
    tempSpa && tempSpa?.id && tempSpa?.name && tempSpa.state
      ? `: ${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
      : "";

  const isComplete = data?.Item?.status === MeasureStatus.COMPLETE;
  return (
    <CUI.Box fontWeight="semibold" fontSize="sm">
      <CUI.Text>Core Set Qualifiers</CUI.Text>
      <Link to={"CSQ"}>
        <CUI.Text color="blue" data-cy="core-set-qualifiers-link">
          {coreSetTitles(coreSetInfo[0], "Questions") + spaName}
        </CUI.Text>
      </Link>

      {isLoading ? (
        <CUI.SkeletonText maxW={48} noOfLines={1} mt="1" />
      ) : (
        <QualifierStatus isComplete={isComplete} />
      )}
    </CUI.Box>
  );
};

/**
 * Create an array of the measure data to be usable by the table component from db pull
 */
const useMeasureTableDataBuilder = () => {
  const queryClient = useQueryClient();
  const { state, year, coreSetId } = useParams();
  const {
    data,
    isLoading,
    isError,
    refetch: refetchMeasures,
    error,
  } = useGetMeasures();
  const [measures, setMeasures] = useState<MeasureTableItem[]>([]);
  const [coreSetStatus, setCoreSetStatus] = useState(
    CoreSetTableItem.Status.IN_PROGRESS
  );
  const { mutate: deleteMeasure } = useDeleteMeasure();
  const navigate = useNavigate();
  const { isStateUser } = useUser();

  interface ModalProps {
    isOpen: boolean;
    measure: MeasureData<any> | any;
  }
  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    measure: {},
  });

  useEffect(() => {
    let mounted = true;
    if (!isLoading && !isError && data && data.Items && mounted) {
      const handleDeleteMeasure = (data: HandleDeleteMeasureData) => {
        deleteMeasure(data, {
          onSuccess: () => {
            queryClient.refetchQueries();
          },
        });
      };

      const filteredItems = (data.Items as MeasureData[]).filter(
        // filter out the coreset qualifiers
        (item) => item.measure && item.measure !== "CSQ"
      );
      const measureTableData = (filteredItems as MeasureData[])
        .filter(
          (item) =>
            !item.measure.includes("SS-") ||
            // Don't show placeholder SS measures
            (item.userCreated && !item.placeholder)
        )
        .map((item) => {
          const actions = [
            {
              itemText: "View",
              handleSelect: () => {
                navigate(`${item.measure}`);
              },
            },
          ];

          // Let user delete user-created measures
          if (isStateUser && item.userCreated === true) {
            actions.push({
              itemText: "Edit",
              handleSelect: () =>
                setModalProps({ isOpen: true, measure: item }),
            });
            actions.push({
              itemText: "Delete",
              handleSelect: () =>
                handleDeleteMeasure({
                  coreSet: item.coreSet,
                  measure: item.measure,
                  state: item.state,
                  year: item.year.toString(),
                }),
            });
          }

          const foundMeasureDescription =
            measureDescriptions[item.year]?.[item.measure] || item.description;

          return {
            Type: coreSetType[item.coreSet],
            title: foundMeasureDescription || "",
            abbr: item.measure,
            path: `/${state}/${year}/${coreSetId}/${item.measure}`,
            reporting: item.reporting,
            rateComplete: item.status === MeasureStatus.COMPLETE ? 1 : 0,
            lastDateModified: item.lastAltered,
            createdAt: item.createdAt,
            autoCompleted: item.autoCompleted,
            measureType: item.measureType,
            id: item.measure,
            userCreated: item.userCreated,
            actions: actions,
          };
        });
      measureTableData.sort((a, b) => a?.abbr?.localeCompare(b?.abbr));
      mounted && setMeasures(measureTableData);

      // Edge case: Dev environments Complete All Button marks placeholders as complete.
      const completeItems = (data.Items as MeasureData[]).filter(
        (item) => !item.placeholder && item.status === MeasureStatus.COMPLETE
      );
      const numberOfCoreSets = 1; // Include qualifier in core set status check

      const coreStatus =
        measureTableData.length + numberOfCoreSets === completeItems.length
          ? CoreSetTableItem.Status.COMPLETED
          : CoreSetTableItem.Status.IN_PROGRESS;
      setCoreSetStatus(coreStatus);
    }

    return () => {
      mounted = false;
    };
  }, [
    coreSetId,
    data,
    deleteMeasure,
    isError,
    isLoading,
    isStateUser,
    navigate,
    queryClient,
    setMeasures,
    state,
    year,
  ]);
  return {
    coreSetStatus,
    measures,
    isLoading,
    isError,
    error,
    refetchMeasures,

    // update measure modal state variables
    modalProps,
    setModalProps,
  };
};

export const CoreSet = () => {
  const { state: locationState } = useLocation() as LocationState;
  const { isStateUser } = useUser();

  let { coreSetId, state, year } = useParams();
  coreSetId = coreSetId ?? "";
  state = state ?? "";
  year = year ?? "";

  const coreSet = coreSetId?.split("_") ?? [coreSetId];
  const tempSpa =
    coreSet.length > 1
      ? SPA[year].filter((s) => s.id === coreSet[1] && s.state === state)[0]
      : "";
  const spaName =
    tempSpa && tempSpa?.id && tempSpa?.name && tempSpa.state
      ? `: ${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
      : "";

  // It appears that spaName only has a value for HH Core Sets. Is this true?
  // Or should we determine whether or not this is a HH Core Set another way,
  // like checking the coreSetId for "HH"?
  const isHHCoreSet = spaName.length > 0;

  const { data } = useGetCoreSet({ coreSetId, state, year });
  const {
    coreSetStatus,
    measures,
    isLoading,
    isError,
    error,
    refetchMeasures,

    // update measure modal state variables
    modalProps,
    setModalProps,
  } = useMeasureTableDataBuilder();

  const { mutate: updateMeasure } = useUpdateMeasure();

  /*
   * If measure data exists and has changed, make an updateMeasure request
   */
  const handleModalResponse = (measureData: any) => {
    updateMeasure(measureData, { onSettled: () => refetchMeasures() });
    closeModal();
  };

  const closeModal = () => {
    setModalProps({ isOpen: false, measure: {} }); // reset state, close modal
  };

  const completedAmount = measures.filter(
    (measure) => measure.rateComplete > 0
  )?.length;

  const userCreatedMeasures = measures.filter((measure) => measure.userCreated);
  const userCreatedMeasureIds = userCreatedMeasures.map(
    (measure) => measure.id
  );

  const coreSetInstructions: { [key: string]: { [key: string]: string } } = {
    "2024": {
      ACSM: "Beginning with FFY 2024 reporting, states are required to report the behavioral health measures on the Adult Core Set. The behavioral health measures are denoted as mandatory in the measure list below. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      ACSC: "Beginning with FFY 2024 reporting, states are required to report the behavioral health measures on the Adult Core Set. The behavioral health measures are denoted as mandatory in the measure list below. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      ACS: "Beginning with FFY 2024 reporting, states are required to report the behavioral health measures on the Adult Core Set. The behavioral health measures are denoted as mandatory in the measure list below. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      CCSM: "Beginning with FFY 2024 reporting, states are required to report all of the measures on the Child Core Set. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      CCSC: "Beginning with FFY 2024 reporting, states are required to report all of the measures on the Child Core Set. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      CCS: "Beginning with FFY 2024 reporting, states are required to report all of the measures on the Child Core Set. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2023-12/sho23005_1.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Child and Adult Core Sets</a>.",
      HHCS: "States with approved Health Home Programs in operation by June 30, 2023 are required to report all of the measures on the Health Home Core Set. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2024-03/smd24002.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Health Home Core Sets</a>.",
    },
    "2025": {
      ACSM: "For 2025 Core Sets reporting, states are required to report the behavioral health measures on the Adult Core Set. The behavioral health measures are denoted as “Mandatory” in the measure list below. New behavioral health measures are denoted as “Provisional” in the measure list below and are available for voluntary reporting in 2025. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf' target='_blank'>2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official Letter</a>. <p>&nbsp;</p> For 2025 Core Sets reporting, states are expected to report stratified data for the following measures in the Adult Medicaid report: FUA-AD, FUH-AD, and IET-AD.",
      ACSC: "For 2025 Core Sets reporting, states are required to report the behavioral health measures on the Adult Core Set. Reporting of these measures for the separate CHIP population is highly encouraged but not mandatory. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf' target='_blank'>2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official Letter</a>.",
      CCSM: "For 2025 Core Sets reporting, states are required to report all of the measures on the Child Core Set (denoted as “Mandatory” in the measure list below). New measures are denoted as “Provisional” in the measure list below and are available for voluntary reporting in 2025. <p>&nbsp;</p> States with Title XXI-funded Medicaid expansion CHIP are expected to report data for this population in the Medicaid report (along with the Title XIX-funded Medicaid population). More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf' target='_blank'>2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official Letter</a>. <p>&nbsp;</p> For 2025 Core Sets reporting, states are expected to report stratified data for the following measures in the Child Medicaid report: FUH-CH, OEV-CH, PPC2-CH, W30-CH, and WCV-CH.",
      CCSC: "For 2025 Core Sets reporting, states are required to report all of the measures on the Child Core Set (denoted as “Mandatory” in the measure list below). New measures are denoted as “Provisional” in the measure list below and are available for voluntary reporting in 2025. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf' target='_blank'>2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official Letter</a>. <p>&nbsp;</p> For 2025 Core Sets reporting, states are expected to report stratified data for the following measures in the Child Separate CHIP report: FUH-CH, OEV-CH, PPC2-CH, W30-CH, and WCV-CH.",
      HHCS: "States with approved Health Home Programs in operation by July 1, 2024 are required to report all of the measures on the Health Home Core Set. More information on mandatory reporting requirements is included in the <a href='https://www.medicaid.gov/sites/default/files/2024-03/smd24002.pdf' target='_blank'>Initial Core Set Mandatory Reporting Guidance for the Health Home Core Sets</a>. <p>&nbsp;</p> For 2025 Core Sets reporting, states are expected to report stratified data for the following measures in the Health Home report: CBP-HH, COL-HH, and FUH-HH.",
    },
  };

  const coreSetPrefix = coreSet[0].slice(0, 4);
  return (
    <QMR.StateLayout
      breadcrumbItems={[
        {
          path: `/${state}/${year}`,
          name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
        },
        {
          path: `/${state}/${year}/${coreSetId}`,
          name: coreSetTitles(coreSet[0]) + spaName,
        },
      ]}
    >
      {featuresByYear.hasMandatoryReporting &&
        coreSetInstructions[year] &&
        coreSetInstructions[year][coreSetPrefix] && (
          <CUI.Box mb="8">
            <Alert heading="Mandatory Reporting">
              <CUI.Text sx={{ "& a": { textDecoration: "underline" } }}>
                {parseLabelToHTML(coreSetInstructions[year][coreSetPrefix])}
              </CUI.Text>
            </Alert>
          </CUI.Box>
        )}
      <QMR.UpdateInfoModal
        closeModal={closeModal}
        handleModalResponse={handleModalResponse}
        modalProps={modalProps}
      />
      {/* Show success banner after redirect from creating new SSMs */}
      {locationState && locationState.success === true && (
        <CUI.Box mb="6">
          <QMR.Notification
            alertDescription="The new State Specific Measures were successfully created and are ready for reporting."
            alertStatus="success"
            alertTitle="New State Specific Measures created"
          ></QMR.Notification>
        </CUI.Box>
      )}
      {/* Show success banner after redirect from creating new SSMs */}
      {locationState && locationState.success === false && (
        <CUI.Box mb="6">
          <QMR.Notification
            alertDescription="An error occurred. Unable to create State Specific Measures."
            alertStatus="error"
            alertTitle="Error creating State Specific Measures"
          ></QMR.Notification>
        </CUI.Box>
      )}
      <CUI.Stack direction={{ base: "column", md: "row" }}>
        <CUI.HStack
          justifyContent="space-between"
          flex="9"
          borderRadius="8"
          backgroundColor="gray.100"
          px="4"
          py="2"
        >
          <QualifiersStatusAndLink coreSetId={coreSetId as CoreSetAbbr} />

          <CUI.HStack>
            <CUI.Box
              textAlign="center"
              mr="2"
              fontWeight="semibold"
              fontSize="sm"
            >
              <CUI.Text>Total Measures Completed</CUI.Text>
            </CUI.Box>
            <QMR.ProgressCircle
              circularProgressProps={{ color: "green", size: "4.5rem" }}
              circularProgressLabelProps={{ fontSize: ".8rem" }}
              currentProgress={completedAmount}
              maxValue={measures.length}
            />
          </CUI.HStack>
        </CUI.HStack>
        <CUI.Spacer />
        <CUI.Box flex="1" textAlign="center" alignSelf="center">
          <QMR.SubmitCoreSetButton
            coreSet={coreSetId! as CoreSetAbbr}
            coreSetStatus={coreSetStatus}
            isSubmitted={data?.Item?.submitted}
            year={year!}
            styleProps={{
              helperText: {
                fontSize: ".5rem",
                paddingTop: "1",
              },
              button: { colorScheme: "blue" },
            }}
          />
        </CUI.Box>
      </CUI.Stack>
      <CUI.Box mt="4">
        <QMR.LoadingWrapper isLoaded={!isLoading && measures.length > 0}>
          {!isError && (
            <QMR.Table data={measures} columns={QMR.measuresColumns(year)} />
          )}
          {isError && (
            <QMR.Notification
              alertStatus="error"
              alertTitle="Error In Measure Retrieval"
              alertDescription={(error as Error)?.message}
            />
          )}
          {isHHCoreSet && (
            <CUI.HStack spacing="6">
              <AddSSMCard
                buttonText="Add State Specific Measure"
                enabled={
                  (isStateUser && userCreatedMeasureIds.length < 5) || false
                }
                title="Need to report on State Specific data?"
                to={`/${state}/${year}/${coreSetId}/add-ssm`}
                userCreatedMeasureIds={userCreatedMeasureIds}
              ></AddSSMCard>
            </CUI.HStack>
          )}
        </QMR.LoadingWrapper>
      </CUI.Box>
    </QMR.StateLayout>
  );
};
