import { Badge, Button, Box, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export interface DataStatus {
  numAvailable: number;
  numComplete: number;
}

export interface DataName {
  text: string;
  to: string;
}

export type Data = {
  name: DataName;
  type: string;
  status: DataStatus;
  actions: string;
};

export type Cell = DataName & DataStatus & string;

export const data: Data[] = [
  {
    name: { text: "Adult Core Set Measures", to: "/adult" },
    type: "adult",
    status: { numAvailable: 12, numComplete: 4 },
    actions: "blog",
  },
  {
    name: { text: "Child Core Set Measures: CHIP", to: "/child" },
    type: "child",
    status: { numAvailable: 12, numComplete: 12 },
    actions: "home",
  },
  {
    name: { text: "Child Core Set Measures: Medicaid", to: "/child" },
    type: "child",
    status: { numAvailable: 12, numComplete: 4 },
    actions: "home",
  },
  {
    name: { text: "Adult Core Set Measures", to: "/health-homes" },
    type: "health homes",
    status: { numAvailable: 12, numComplete: 4 },
    actions: "design-system",
  },
];

const badgeEnum: Record<string, string> = {
  adult: "green",
  child: "blue",
  "health homes": "purple",
};

const getStatus = ({ numAvailable, numComplete }: DataStatus) => {
  let status = "In Progress";
  if (!numComplete) status = "Not Started";
  if (numComplete === numAvailable) status = "Complete";
  return status;
};

const CoreSetStatus = (data: DataStatus) => {
  const status = getStatus(data);

  return (
    <Box>
      <Text fontWeight="bold">{status}</Text>
      <Text>{`${data.numComplete} of ${data.numAvailable} complete`}</Text>
    </Box>
  );
};

export const columns = [
  {
    header: "Core Set Name",
    accessor: "name",
    cell: ({ to, text }: DataName) => {
      return (
        <Link to={to}>
          <Text fontWeight="bold" color="blue.600">
            {text}
          </Text>
        </Link>
      );
    },
  },
  {
    header: "Type",
    accessor: "type",
    cell: (data: string) => {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      );
    },
  },
  {
    header: "Status",
    accessor: "status",
    cell: (data: DataStatus) => <CoreSetStatus {...data} />,
  },
  {
    accessor: "status",
    cell: (data: DataStatus) => {
      const status = getStatus(data);
      return (
        <Box maxW="2xs" textAlign="center">
          <Button w="full" disabled={status !== "Complete"} colorScheme="blue">
            Submit Core Set
          </Button>
          <Text fontSize="xs" lineHeight="1rem" mt="1">
            Complete all Adult Core Set Questions and Adult Core Set Measures to
            submit FFY 2021
          </Text>
        </Box>
      );
    },
  },
  {
    header: "Core Set Actions",
    accessor: "actions",
    cell: (data: string) => (
      <Box textAlign="center">
        {/* when we have our core actions comp we would replace this */}
        <Button variant="ghost" onClick={() => console.log(data)}>
          <BsThreeDotsVertical />
        </Button>
      </Box>
    ),
  },
];
