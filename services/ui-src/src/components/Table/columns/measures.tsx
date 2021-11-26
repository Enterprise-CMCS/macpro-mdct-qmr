import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Measure, TableColumn } from "../types";

const getStatus = (data: Measure.Data) => {
  // If they have completed all measure questions or if they are not reporting -> Complete
  if (
    data.rateComplete === 1 ||
    (data.isReporting !== null && !data.isReporting)
  ) {
    return Measure.Status.COMPLETED;
  }

  // If they have completed some measure questions -> In Progress
  if (data.rateComplete > 0) {
    return Measure.Status.IN_PROGRESS;
  }

  // Otherwise they have not started
  return Measure.Status.NOT_STARTED;
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
      return (
        <>
          <CUI.Text fontSize="xs" textTransform="capitalize" fontWeight="bold">
            {status}
          </CUI.Text>
          {status === Measure.Status.IN_PROGRESS && (
            <CUI.Text fontSize="xs">90% complete</CUI.Text>
          )}
          {status === Measure.Status.COMPLETED && (
            <CUI.Text fontSize="xs">{data.lastDateModified}</CUI.Text>
          )}
        </>
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
