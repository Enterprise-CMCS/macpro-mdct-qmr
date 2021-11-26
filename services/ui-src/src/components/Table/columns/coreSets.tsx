import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CoreSet, TableColumn } from "../types";

const badgeEnum: Record<string, string> = {
  [CoreSet.Type.ADULT]: "green",
  [CoreSet.Type.CHILD]: "blue",
  [CoreSet.Type.HEALTH_HOMES]: "purple",
};

const getStatus = ({ progress, submitted }: CoreSet.Data): CoreSet.Status => {
  if (submitted) return CoreSet.Status.SUBMITTED;

  const { numAvailable, numComplete } = progress;
  let status: CoreSet.Status = CoreSet.Status.IN_PROGRESS;
  if (!numComplete) status = CoreSet.Status.NOT_STARTED;
  if (numComplete === numAvailable) status = CoreSet.Status.COMPLETED;
  return status;
};

const CoreSetStatus = (data: CoreSet.Data) => {
  const status = getStatus(data);

  return (
    <CUI.Box>
      <CUI.Text fontWeight="bold" textTransform="capitalize">
        {status}
      </CUI.Text>
      <CUI.Text>{`${data.progress.numComplete} of ${data.progress.numAvailable} complete`}</CUI.Text>
    </CUI.Box>
  );
};

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
        <CUI.Badge fontSize="xs" colorScheme={badgeEnum[data.type]}>
          {data.type}
        </CUI.Badge>
      );
    },
  },
  {
    header: "Status",
    id: "status_column_header",
    cell: (data: CoreSet.Data) => <CoreSetStatus {...data} />,
  },
  {
    id: "submit_column_header",
    cell: (data: CoreSet.Data) => {
      const status = getStatus(data);
      const isSubmitted = status === CoreSet.Status.SUBMITTED;
      return (
        <CUI.Box maxW="2xs" textAlign="center">
          <CUI.Button
            w="full"
            disabled={status !== CoreSet.Status.COMPLETED}
            colorScheme="blue"
            textTransform="capitalize"
          >
            {isSubmitted ? CoreSet.Status.SUBMITTED : "submit core set"}
          </CUI.Button>
          {!isSubmitted && (
            <CUI.Text fontSize="xs" lineHeight="1rem" mt="1">
              {`Complete all Core Set Questions and Core Set Measures to submit FFY ${data.year}`}
            </CUI.Text>
          )}
        </CUI.Box>
      );
    },
  },
  {
    header: "Core Set Actions",
    id: "actions_column_header",
    styleProps: { textAlign: "center" },
    cell: (data: CoreSet.Data) => (
      <CUI.Box textAlign="center">
        <CUI.Button variant="ghost" onClick={() => console.log(data.actions)}>
          <BsThreeDotsVertical />
        </CUI.Button>
      </CUI.Box>
    ),
  },
];
