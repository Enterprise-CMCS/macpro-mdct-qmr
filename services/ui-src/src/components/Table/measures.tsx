import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Measure, TableColumn } from "./types";

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
      return <p>{data.year}</p>;
    },
  },
  {
    header: "Status",
    id: "status_column_header",
    cell: (data: Measure.Data) => <p>{data.title}</p>,
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
