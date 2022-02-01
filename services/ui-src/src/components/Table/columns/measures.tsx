import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MeasureTableItem, TableColumn } from "../types";
import { measuresList } from "measures/measuresList";

// Get status string from measure data
const getStatus = (data: MeasureTableItem.Data): MeasureTableItem.Status => {
  // If completed all questions or if not reporting -> Complete
  if (
    data.rateComplete === 1 ||
    (data.isReporting && data.isReporting !== null && !data.isReporting)
  ) {
    return MeasureTableItem.Status.COMPLETED;
  }

  // Otherwise -> Not Started
  return MeasureTableItem.Status.IN_PROGRESS;
};

// Format date string: ex. Nov 26, 2021 12:53 PM see: https://date-fns.org/v2.26.0/docs/format
const formatDate = (data: MeasureTableItem.Data) => {
  if (!data.lastDateModified) return null;
  const date = format(new Date(data.lastDateModified), "LLL d, yyyy h:mm a");
  return date;
};

// ✅ icon to show if measure is complete
const CompleteCheck = () => (
  <CUI.Box color="green.600">
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
export const measuresColumns: TableColumn<MeasureTableItem.Data>[] = [
  {
    header: "Abbreviation",
    id: "aabr_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: MeasureTableItem.Data) => {
      return (
        <Link to={data.path}>
          <CUI.Text fontWeight="bold" color="blue.600">
            {data.abbr}
          </CUI.Text>
        </Link>
      );
    },
  },
  {
    header: "Measure",
    id: "title_column_header",
    cell: (data: MeasureTableItem.Data) => {
      return (
        <Link to={data.path}>
          <CUI.Text fontWeight="bold" color="blue.600">
            {data.title}
          </CUI.Text>
        </Link>
      );
    },
  },
  {
    header: "Reporting FFY 2021",
    id: "reporting_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: MeasureTableItem.Data) => {
      const autoCompletedMeasure = measuresList[2021]?.find(
        (measure) => measure.measureId === data.id
      )?.autocompleteOnCreation;

      let reportingText = "--";
      if (data.isReporting) reportingText = "yes";
      if (data.isReporting !== null && !data.isReporting) reportingText = "no";
      if (autoCompletedMeasure) reportingText = "N/A";
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
      const isComplete = status === MeasureTableItem.Status.COMPLETED && !!date;
      const isInProgress = status === MeasureTableItem.Status.IN_PROGRESS;
      return (
        <CUI.Flex ml={isComplete ? -6 : "inherit"}>
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
        <QMR.KebabMenu menuItems={data.actions} />
      </CUI.Box>
    ),
  },
];
