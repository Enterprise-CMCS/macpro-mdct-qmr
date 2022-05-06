import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { CoreSetAbbr, MeasureStatus, MeasureData } from "types";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useGetCoreSet, useGetMeasure, useGetMeasures } from "hooks/api";
import { useParams } from "react-router-dom";
import { CoreSetTableItem } from "components/Table/types";
import { SPA } from "libs/spaLib";

enum coreSetType {
  ACS = "Adult",
  CCS = "Child",
  CCSM = "Child - Medicaid",
  CCSC = "Child - CHIP",
  HHCS = "Health Home",
}

export enum coreSetMeasureTitle {
  ACS = "Adult Core Set Measures",
  CCS = "Child Core Set Measures: Medicaid & CHIP",
  CCSM = "Child Core Set Measures: Medicaid",
  CCSC = "Child Core Set Measures: CHIP",
  HHCS = "Health Home Core Set Measures: ",
}

enum coreSetQuestionsText {
  ACS = "Adult Core Set Questions",
  CCS = "Child Core Set Questions",
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
  actions: { itemText: string; handleSelect: () => void }[];
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
  return <CUI.Text>Incomplete</CUI.Text>;
};

const QualifiersStatusAndLink = ({ coreSetId }: { coreSetId: CoreSetAbbr }) => {
  // get the core set qualifier measure for the coreset and display the status
  const { data, isLoading } = useGetMeasure({
    coreSet: coreSetId,
    measure: "CSQ",
  });
  const coreSetInfo = coreSetId?.split("_") ?? [coreSetId];
  const tempSpa =
    coreSetInfo.length > 1 ? SPA.filter((s) => s.id === coreSetInfo[1])[0] : "";
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
  const { state, year, coreSetId } = useParams();
  const { data, isLoading, isError, error } = useGetMeasures();
  const [measures, setMeasures] = useState<MeasureTableItem[]>([]);
  useEffect(() => {
    let mounted = true;
    if (!isLoading && !isError && data && data.Items && mounted) {
      const filteredItems = (data.Items as MeasureData[]).filter(
        // filter out the coreset qualifiers
        (item) => item.measure && item.measure !== "CSQ"
      );
      const measureTableData = (filteredItems as MeasureData[]).map((item) => {
        return {
          Type: coreSetType[item.coreSet],
          title: item.description,
          abbr: item.measure,
          path: `/${state}/${year}/${coreSetId}/${item.measure}`,
          reporting: item.reporting,
          rateComplete: item.status === MeasureStatus.COMPLETE ? 1 : 0,
          lastDateModified: item.lastAltered,
          createdAt: item.createdAt,
          id: item.measure,
          actions: [
            {
              itemText: "Edit",
              handleSelect: () => console.log("Edit " + item.measure),
            },
          ],
        };
      });
      measureTableData.sort((a, b) => a?.abbr?.localeCompare(b?.abbr));
      mounted && setMeasures(measureTableData);
    }
    return () => {
      mounted = false;
    };
  }, [data, isLoading, isError, setMeasures, coreSetId, state, year]);

  return { measures, isLoading, isError, error };
};

export const CoreSet = () => {
  let { coreSetId, state, year } = useParams();
  coreSetId = coreSetId ?? "";
  state = state ?? "";
  year = year ?? "";

  const coreSet = coreSetId?.split("_") ?? [coreSetId];
  const tempSpa =
    coreSet.length > 1 ? SPA.filter((s) => s.id === coreSet[1])[0] : "";
  const spaName =
    tempSpa && tempSpa?.id && tempSpa?.name && tempSpa.state
      ? `${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
      : "";

  // It appears that spaName only has a value for HH Core Sets. Is this true?
  // Or should we determine whether or not this is a HH Core Set another way,
  // like checking the coreSetId for "HH"?
  const isHHCoreSet = spaName.length > 0;

  const { data } = useGetCoreSet({ coreSetId, state, year });
  const { measures, isLoading, isError, error } = useMeasureTableDataBuilder();

  const completedAmount = measures.filter(
    (measure) => measure.rateComplete > 0
  )?.length;

  const coreSetStatus =
    measures.length === completedAmount
      ? CoreSetTableItem.Status.COMPLETED
      : CoreSetTableItem.Status.IN_PROGRESS;

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
            <QMR.Table data={measures} columns={QMR.measuresColumns} />
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
              <QMR.AddCard
                buttonText="Add State Specific Measure"
                title="Need to report on State Specific data?"
                linkTo={`/${state}/${year}/${coreSetId}/add-ssm`}
              ></QMR.AddCard>
            </CUI.HStack>
          )}
        </QMR.LoadingWrapper>
      </CUI.Box>
    </QMR.StateLayout>
  );
};
