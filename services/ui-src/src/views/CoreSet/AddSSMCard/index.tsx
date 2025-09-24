import * as CUI from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

interface AddSSMCardProps {
  buttonText: string;
  enabled?: boolean;
  title: string;
  to: string;
  userCreatedMeasureIds?: any[];
}

// "Add" card, used for adding a new State Specific Measure
export const AddSSMCard = ({
  buttonText,
  enabled = true,
  title,
  to,
  userCreatedMeasureIds = [],
}: AddSSMCardProps) => {
  const navigate = useNavigate();
  // Create a unique testId for each card based on destination in link
  const testId = to.substring(to.lastIndexOf("/") + 1) + "-button";

  return (
    <>
      <CUI.Box
        as="aside"
        borderRadius="base"
        borderWidth="thin"
        borderLeftWidth="1rem"
        borderLeftColor="blue.500"
        minW="363px"
        p="6"
      >
        <CUI.Stack spacing="6">
          <CUI.Text fontWeight="bold">{title}</CUI.Text>
          <CUI.Button
            data-cy={testId}
            variant={"outline-primary"}
            fontSize={"1.2rem"}
            rightIcon={<FaPlusCircle />}
            isDisabled={!enabled}
            href="#"
            onClick={() => {
              navigate(to, { state: { userCreatedMeasureIds } });
            }}
            //because they button acts like a link, it can never truly be disabled so we have to swap it away from a link when it's disabled
            as={!enabled ? undefined : CUI.Link}
          >
            {buttonText}
          </CUI.Button>
        </CUI.Stack>
      </CUI.Box>
      <CUI.Center w="44" textAlign="center">
        <CUI.Text fontStyle="italic" fontSize="sm">
          A maximum of five State Specific Measures may be added
        </CUI.Text>
      </CUI.Center>
    </>
  );
};
