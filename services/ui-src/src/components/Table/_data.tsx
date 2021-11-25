import * as CUI from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export interface SetProgress {
  numAvailable: number;
  numComplete: number;
}

export interface SetInfo {
  text: string;
  to: string;
}

enum SetType {
  ADULT = "adult",
  CHILD = "child",
  HEALTH_HOMES = "health homes",
}

enum Status {
  IN_PROGRESS = "in progress",
  NOT_STARTED = "not started",
  COMPLETED = "complete",
  SUBMITTED = "submitted",
}

export type SetData = {
  id: string;
  info: SetInfo;
  type: SetType;
  status: SetProgress;
  // when we have a core actions component this type will change
  actions: string;
};

export const data: SetData[] = [
  {
    info: { text: "Adult Core Set Measures", to: "/adult" },
    type: SetType.ADULT,
    status: { numAvailable: 12, numComplete: 4 },
    actions: "adult actions here",
    id: "test1",
  },
  {
    info: { text: "Child Core Set Measures: CHIP", to: "/child" },
    type: SetType.CHILD,
    status: { numAvailable: 12, numComplete: 12 },
    actions: "chip actions here",
    id: "test2",
  },
  {
    info: { text: "Child Core Set Measures: Medicaid", to: "/child" },
    type: SetType.CHILD,
    status: { numAvailable: 12, numComplete: 4 },
    actions: "medicaid actions here",
    id: "test3",
  },
  {
    info: {
      text: "Health Homes Core Set Questions: SPA Name",
      to: "/health-homes",
    },
    type: SetType.HEALTH_HOMES,
    status: { numAvailable: 12, numComplete: 4 },
    actions: "health home actions here",
    id: "test4",
  },
];

const badgeEnum: Record<string, string> = {
  [SetType.ADULT]: "green",
  [SetType.CHILD]: "blue",
  [SetType.HEALTH_HOMES]: "purple",
};

const getStatus = ({ numAvailable, numComplete }: SetProgress): Status => {
  let status: Status = Status.IN_PROGRESS;
  if (!numComplete) status = Status.NOT_STARTED;
  if (numComplete === numAvailable) status = Status.COMPLETED;
  return status;
};

const CoreSetStatus = (progress: any) => {
  const status = getStatus(progress);

  return (
    <CUI.Box>
      <CUI.Text fontWeight="bold" textTransform="capitalize">
        {status}
      </CUI.Text>
      <CUI.Text>{`${progress.numComplete} of ${progress.numAvailable} complete`}</CUI.Text>
    </CUI.Box>
  );
};

export const columns = [
  {
    header: "Core Set Name",
    id: "info",
    cell: (data: SetData) => {
      return (
        <Link to={data.info.to}>
          <CUI.Text fontWeight="bold" color="blue.600">
            {data.info.text}
          </CUI.Text>
        </Link>
      );
    },
  },
  {
    header: "Type",
    id: "type",
    cell: (data: SetData) => {
      return (
        <CUI.Badge fontSize="xs" colorScheme={badgeEnum[data.type]}>
          {data.type}
        </CUI.Badge>
      );
    },
  },
  {
    header: "Status",
    accessors: ["status"],
    cell: (data: SetData) => <CoreSetStatus {...data.status} />,
  },
  {
    id: "status",
    cell: (data: SetData) => {
      const status = getStatus(data.status);
      return (
        <CUI.Box maxW="2xs" textAlign="center">
          <CUI.Button
            w="full"
            disabled={status !== Status.COMPLETED}
            colorScheme="blue"
          >
            Submit Core Set
          </CUI.Button>
          <CUI.Text fontSize="xs" lineHeight="1rem" mt="1">
            Complete all Adult Core Set Questions and Adult Core Set Measures to
            submit FFY 2021
          </CUI.Text>
        </CUI.Box>
      );
    },
  },
  {
    header: "Core Set Actions",
    id: "actions",
    cell: (data: SetData) => (
      <CUI.Box textAlign="center">
        {/* when we have our core actions comp we would replace this */}
        <CUI.Button variant="ghost" onClick={() => console.log(data.actions)}>
          <BsThreeDotsVertical />
        </CUI.Button>
      </CUI.Box>
    ),
  },
];
