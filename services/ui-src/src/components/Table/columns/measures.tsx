import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical, BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Measure, TableColumn } from "../types";

const getStatus = (data: Measure.Data) => {
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

  // Otherwise not started
  return Measure.Status.NOT_STARTED;
};

const formatDate = (data: Measure.Data) => {
  if (!data.lastDateModified) return null;
  const date = format(new Date(data.lastDateModified), "LLL d, yyyy h:m a");
  return date;
};

export const measuresColumns: TableColumn<Measure.Data>[] = [
  {
    header: "Abreviation",
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
      const isComplete = status === Measure.Status.COMPLETED && date;
      const isInProgress = status === Measure.Status.IN_PROGRESS;
      return (
        <CUI.Flex ml={isComplete ? [-3, -3, -5, -6] : "inherit"}>
          {isComplete && <BsCheck fontSize="22px" color="#12890E" />}
          <CUI.Box>
            <CUI.Text
              fontSize="xs"
              textTransform="capitalize"
              fontWeight="bold"
            >
              {status}
            </CUI.Text>
            {isInProgress && (
              <CUI.Text fontSize="xs">{`${Math.floor(
                data.rateComplete * 100
              )}% complete`}</CUI.Text>
            )}
            {isComplete && <CUI.Text fontSize="xs">{date}</CUI.Text>}
          </CUI.Box>
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
        <CUI.Button variant="ghost" onClick={() => console.log(data.actions)}>
          <BsThreeDotsVertical />
        </CUI.Button>
      </CUI.Box>
    ),
  },
];
