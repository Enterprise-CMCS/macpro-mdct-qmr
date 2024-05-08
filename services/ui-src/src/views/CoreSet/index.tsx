import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { AddSSMCard } from "./AddSSMCard";
import { CoreSetAbbr, MeasureStatus, MeasureData } from "types";
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
import { useQueryClient } from "react-query";
import { useUser } from "hooks/authHooks";

interface HandleDeleteMeasureData {
  coreSet: CoreSetAbbr;
  measure: string;
  state: string;
  year: string;
}

enum coreSetType {
  ACS = "Adult",
  ACSM = "Adult - Medicaid",
  ACSC = "Adult - CHIP",
  CCS = "Child",
  CCSM = "Child - Medicaid",
  CCSC = "Child - CHIP",
  HHCS = "Health Home",
}

export enum coreSetMeasureTitle {
  ACS = "Adult Core Set Measures",
  ACSM = "Adult Core Set: Medicaid",
  ACSC = "Adult Core Set: CHIP",
  CCS = "Child Core Set Measures: Medicaid & CHIP",
  CCSM = "Child Core Set Measures: Medicaid",
  CCSC = "Child Core Set Measures: CHIP",
  HHCS = "Health Home Core Set Measures: ",
}

enum coreSetQuestionsText {
  ACS = "Adult Core Set Questions",
  ACSM = "Adult Core Set Questions: Medicaid",
  ACSC = "Adult Core Set Questions: CHIP",
  CCS = "Child Core Set Questions: Medicaid & CHIP",
  CCSM = "Child Core Set Questions: Medicaid",
  CCSC = "Child Core Set Questions: CHIP",
  HHCS = "Health Home Core Set Questions: ",
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
      ? `${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
      : "";

  const isComplete = data?.Item?.status === MeasureStatus.COMPLETE;
  return (
    <CUI.Box fontWeight="semibold" fontSize="sm">
      <CUI.Text>Core Set Qualifiers</CUI.Text>
      <Link to={"CSQ"}>
        <CUI.Text color="blue" data-cy="core-set-qualifiers-link">
          {coreSetQuestionsText[
            coreSetInfo[0] as keyof typeof coreSetQuestionsText
          ] + spaName}
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
            id: item.measure,
            userCreated: item.userCreated,
            actions: actions,
          };
        });
      measureTableData.sort((a, b) => a?.abbr?.localeCompare(b?.abbr));
      mounted && setMeasures(measureTableData);

      let numCompleteItems = 0;
      // include qualifier in core set status check
      for (const m of data.Items as MeasureData[]) {
        if (m.status === "complete") {
          numCompleteItems++;
        }
      }

      const numberOfCoreSets = 1;
      const coreSetStatus =
        measureTableData.length + numberOfCoreSets === numCompleteItems
          ? CoreSetTableItem.Status.COMPLETED
          : CoreSetTableItem.Status.IN_PROGRESS;
      setCoreSetStatus(coreSetStatus);
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
      ? `${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
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

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreSetId}`,
          name:
            coreSetMeasureTitle[
              coreSet[0] as keyof typeof coreSetMeasureTitle
            ] + spaName,
        },
      ]}
    >
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

      <CUI.Flex>
        <CUI.HStack
          justifyContent="space-between"
          flex="8"
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
      </CUI.Flex>
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
