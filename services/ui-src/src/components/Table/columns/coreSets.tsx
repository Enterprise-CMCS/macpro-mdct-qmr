import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CoreSet, TableColumn } from "../types";
import { ContainedButton } from "components/ContainedButton";

// Get status string from core set data
const getStatus = ({ progress, submitted }: CoreSet.Data): CoreSet.Status => {
  if (submitted) return CoreSet.Status.SUBMITTED;

  const { numAvailable, numComplete } = progress;
  let status: CoreSet.Status = CoreSet.Status.IN_PROGRESS;
  if (!numComplete) status = CoreSet.Status.NOT_STARTED;
  if (numComplete === numAvailable) status = CoreSet.Status.COMPLETED;
  return status;
};

// Get core Set status text from core set data
const CoreSetStatusText = (data: CoreSet.Data) => {
  const status = getStatus(data);
  return (
    <CUI.Box fontSize="xs">
      <CUI.Text fontWeight="bold" textTransform="capitalize">
        {status}
      </CUI.Text>
      <CUI.Text>{`${data.progress.numComplete} of ${data.progress.numAvailable} complete`}</CUI.Text>
    </CUI.Box>
  );
};

// Core Set table columns with cell formatting
export const coreSetColumns: TableColumn<CoreSet.Data>[] = [
  {
    header: "Core Set Name",
    id: "info_column_header",
    cell: (data: CoreSet.Data) => {
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
    header: "Type",
    id: "type_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: CoreSet.Data) => {
      return (
        <CUI.Badge
          fontSize="xs"
          colorScheme="blue"
          textTransform="capitalize"
          borderRadius="lg"
          px="2"
        >
          <CUI.Text fontWeight="normal">{data.type}</CUI.Text>
        </CUI.Badge>
      );
    },
  },
  {
    header: "Status",
    id: "status_column_header",
    cell: (data: CoreSet.Data) => <CoreSetStatusText {...data} />,
  },
  {
    id: "submit_column_header",
    cell: (data: CoreSet.Data) => {
      const status = getStatus(data);
      const isSubmitted = status === CoreSet.Status.SUBMITTED;
      const buttonText = isSubmitted
        ? CoreSet.Status.SUBMITTED
        : "submit core set";
      const helperText = !isSubmitted
        ? `Complete all Core Set Questions and Core Set Measures to submit FFY ${data.year}`
        : undefined;
      return (
        <ContainedButton
          buttonText={buttonText}
          disabledStatus={status !== CoreSet.Status.COMPLETED}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
            w: "full",
          }}
          helperText={helperText}
          onClick={() => console.log("core set button")}
        />
      );
    },
  },
  {
    header: "Core Set Actions",
    id: "actions_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: CoreSet.Data) => (
      <CUI.Box textAlign="center">
        {/* we will update this when the actions comp is ready */}
        <CUI.Button variant="ghost" onClick={() => console.log(data.actions)}>
          <BsThreeDotsVertical />
        </CUI.Button>
      </CUI.Box>
    ),
  },
];
