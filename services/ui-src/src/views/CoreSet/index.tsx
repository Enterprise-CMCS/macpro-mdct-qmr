import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useGetMeasure, useGetMeasures } from "hooks/api";
import { CoreSetAbbr, MeasureStatus, MeasureData } from "types";
import { HiCheckCircle } from "react-icons/hi";
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
  const coreSetInfo = coreSetId?.split("_") || [coreSetId];
  const spaName = coreSetInfo?.[1]
    ? SPA.filter((s) => s.id === coreSetInfo[1])[0].name
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
  const { state, year, coreSetId } = useParams();

  const { isStateUser } = useUser();

  const { measures, isLoading, isError, error } = useMeasureTableDataBuilder();
  const completedAmount = measures.filter(
    (measure) => measure.rateComplete > 0
  )?.length;

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${coreSetId}`,
          name: coreSetMeasureTitle[
            coreSetId as keyof typeof coreSetMeasureTitle
          ],
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
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
            }}
            buttonText="Submit Core Set"
            disabledStatus={!isStateUser}
            helperText={`Complete all ${
              coreSetType[coreSetId as keyof typeof coreSetType]
            } Core Set Questions and ${
              coreSetType[coreSetId as keyof typeof coreSetType]
            } Core Set Measures to submit FFY 2021`}
            helperTextProps={{
              fontSize: ".5rem",
              paddingTop: "1",
            }}
          />
        </CUI.Box>
      </CUI.Flex>
      <CUI.Box mt="4">
        <QMR.LoadingWrapper isLoaded={!isLoading}>
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
        </QMR.LoadingWrapper>
      </CUI.Box>
    </QMR.StateLayout>
  );
};
