import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MeasureTableItem, TableColumn } from "../types";
import { featuresByYear } from "utils/featuresByYear";

// Get status string from measure data
const getStatus = (data: MeasureTableItem.Data): MeasureTableItem.Status => {
  // If completed all questions or if not reporting -> Complete
  if (data.rateComplete === 1) return MeasureTableItem.Status.COMPLETED;

  // If the modified date is different than the creation date, it is in progress
  if (data.lastDateModified !== data.createdAt) {
    return MeasureTableItem.Status.IN_PROGRESS;
  }
  // Otherwise -> Not Started
  return MeasureTableItem.Status.NOT_STARTED;
};

// Format date string: ex. Nov 26, 2021 12:53 PM see: https://date-fns.org/v2.26.0/docs/format
const formatDate = (data: MeasureTableItem.Data) => {
  if (!data.lastDateModified) return null;
  const date = format(new Date(data.lastDateModified), "LLL d, yyyy h:mm a");
  return date;
};

// ✅ icon to show if measure is complete
const CompleteCheck = () => (
  <CUI.Box
    color="green.600"
    position={{ base: "relative", lg: "absolute" }}
    ml={{ base: 0, lg: "-6" }}
  >
    <BsCheck fontSize="22px" />
  </CUI.Box>
);

// Measure status text. will show % if in progress or date if completed
const MeasureStatusText = ({
  status,
  date,
}: MeasureTableItem.StatusTextProps) => {
  return (
    <CUI.Box fontSize="xs">
      <CUI.Text textTransform="capitalize" fontWeight="bold">
        {status}
      </CUI.Text>
      <CUI.Text>{date}</CUI.Text>
    </CUI.Box>
  );
};

// Measure table columns with cell formatting
export const measuresColumns = (
  year: string
): TableColumn<MeasureTableItem.Data>[] => {
  return [
    {
      header: "Abbreviation",
      id: "aabr_column_header",
      styleProps: { textAlign: "center" },
      cell: (data: MeasureTableItem.Data) => {
        return (
          <CUI.Link
            as={Link}
            to={data.path}
            variant="unlined"
            data-cy={data.abbr}
          >
            {data.abbr}
          </CUI.Link>
        );
      },
    },
    {
      header: "Measure",
      id: "title_column_header",
      cell: (data: MeasureTableItem.Data) => {
        return (
          <CUI.Link
            as={Link}
            to={data.path}
            variant="unlined"
            data-cy={data.path}
          >
            {data.title}
          </CUI.Link>
        );
      },
    },
    ...(featuresByYear.displayMandatoryMeasuresColumn ||
    featuresByYear.displayTypeMeasuresColumn
      ? [
          {
            header: featuresByYear.displayMandatoryMeasuresColumn
              ? "Mandatory"
              : "Type",
            id: "mandatory_column_header",
            styleProps: { textAlign: "center" },
            cell: (data: MeasureTableItem.Data) => {
              if (!data?.measureType) {
                // This coreset is neither marked mandatory nor provisional
                return <></>;
              }
              if (
                data.typeTagForCoreSets &&
                !data.typeTagForCoreSets.includes(data.coreSet)
              ) {
                // This coreset is explicitly excluded from tagging
                return <></>;
              }
              return (
                <CUI.Badge
                  fontSize="xs"
                  backgroundColor="blue.50"
                  textTransform="capitalize"
                  borderRadius="lg"
                  px="2"
                >
                  <CUI.Text fontWeight="normal">{data.measureType}</CUI.Text>
                </CUI.Badge>
              );
            },
          },
        ]
      : []),
    {
      header:
        `Reporting ${featuresByYear.displayFFYLanguage ? "FFY" : ""} ` + year,
      id: "reporting_column_header",
      styleProps: { textAlign: "center" },
      cell: (data: MeasureTableItem.Data) => {
        let reportingText = "--";
        if (data.reporting) reportingText = data.reporting;
        if (data?.autoCompleted) reportingText = "N/A";
        return (
          <CUI.Text fontSize="xs" textTransform="capitalize">
            {reportingText}
          </CUI.Text>
        );
      },
    },
    {
      header: "Status",
      id: "status_column_header",
      cell: (data: MeasureTableItem.Data) => {
        const status = getStatus(data);
        const date: string | null = formatDate(data);
        const isComplete =
          status === MeasureTableItem.Status.COMPLETED && !!date;
        const isInProgress = status === MeasureTableItem.Status.IN_PROGRESS;
        return (
          <CUI.Flex ml="inherit">
            {/* <CUI.Flex ml={isComplete ? -6 : "inherit"}> */}
            {isComplete && <CompleteCheck />}
            <MeasureStatusText
              isComplete={isComplete}
              isInProgress={isInProgress}
              date={date}
              rateComplete={data.rateComplete}
              status={status}
            />
          </CUI.Flex>
        );
      },
    },
    {
      header: "Measure Actions",
      id: "actions_column_header",
      styleProps: { textAlign: "center" },
      cell: (data: MeasureTableItem.Data) => (
        <CUI.Box textAlign="center">
          <QMR.KebabMenu
            menuItems={data.actions}
            menuLabel={data.abbr}
            headerText="Delete Measure"
          />
        </CUI.Box>
      ),
    },
  ];
};
