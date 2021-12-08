import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Measure, TableColumn } from "../types";

const KebabMenuItems: QMR.IKebabMenuItem[] = [
  { itemText: "Edit", itemIndex: 1 },
  { itemText: "Export", itemIndex: 2 },
  { itemText: "Clear Measure Entries", itemIndex: 3 },
];

// Get status string from measure data
const getStatus = (data: Measure.Data): Measure.Status => {
  // If completed all questions or if not reporting -> Complete
  if (
    data.rateComplete === 1 ||
    (data.isReporting !== null && !data.isReporting)
  ) {
    return Measure.Status.COMPLETED;
  }

  // If completed some questions -> In Progress
  if (data.rateComplete > 0) {
    return Measure.Status.IN_PROGRESS;
  }

  // Otherwise -> Not Started
  return Measure.Status.NOT_STARTED;
};

// Format date string: ex. Nov 26, 2021 12:53 PM see: https://date-fns.org/v2.26.0/docs/format
const formatDate = (data: Measure.Data) => {
  if (!data.lastDateModified) return null;
  const date = format(new Date(data.lastDateModified), "LLL d, yyyy h:m a");
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
  isInProgress,
  status,
  isComplete,
  date,
  rateComplete,
}: Measure.StatusTextProps) => {
  const completionPercentage = Math.floor(rateComplete * 100);
  return (
    <CUI.Box fontSize="xs">
      <CUI.Text textTransform="capitalize" fontWeight="bold">
        {status}
      </CUI.Text>
      {isInProgress && (
        <CUI.Text>{`${completionPercentage}% complete`}</CUI.Text>
      )}
      {isComplete && <CUI.Text>{date}</CUI.Text>}
    </CUI.Box>
  );
};

// Measure table columns with cell formatting
export const measuresColumns: TableColumn<Measure.Data>[] = [
  {
    header: "Abbreviation",
    id: "aabr_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: Measure.Data) => {
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
    cell: (data: Measure.Data) => {
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
    cell: (data: Measure.Data) => {
      let reportingText = "--";
      if (data.isReporting) reportingText = "yes";
      if (data.isReporting !== null && !data.isReporting) reportingText = "no";
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
    cell: (data: Measure.Data) => {
      const status = getStatus(data);
      const date = formatDate(data);
      const isComplete = status === Measure.Status.COMPLETED && !!date;
      const isInProgress = status === Measure.Status.IN_PROGRESS;
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
    cell: (data: Measure.Data) => (
      <CUI.Box textAlign="center">
        <QMR.KebabMenu
          menuItems={KebabMenuItems}
          handleItemClick={() => console.log(data.actions)}
        />
      </CUI.Box>
    ),
  },
];
