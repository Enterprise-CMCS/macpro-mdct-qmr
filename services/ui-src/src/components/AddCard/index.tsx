import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link } from "react-router-dom";
import { useUser } from "hooks/authHooks";

interface AddCardProps {
  buttonText: string;
  disabled?: boolean;
  title: string;
  to: string;
  userCreatedMeasureIds?: any[];
}

// "Add" card, used for adding a new State-Specific Measure
export const AddCard = ({
  buttonText,
  disabled = false,
  title,
  to,
  userCreatedMeasureIds = [],
}: AddCardProps) => {
  const { isStateUser } = useUser();

  // Create a unique testId for each card based on destination in link
  const testId = to.substring(to.lastIndexOf("/") + 1) + "-button";

  return (
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
        <Link
          to={to}
          state={{ userCreatedMeasureIds: userCreatedMeasureIds }}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
              variant: "outline",
              color: "blue.500",
            }}
            buttonText={buttonText}
            disabledStatus={!isStateUser || disabled}
            icon="plus"
            testId={testId}
          />
        </Link>
      </CUI.Stack>
    </CUI.Box>
  );
};
