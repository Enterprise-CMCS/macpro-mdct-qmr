import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Link } from "react-router-dom";
import { useUser } from "hooks/authHooks";

interface AddCardProps {
  buttonText: string;
  title: string;
  linkTo: string;
}

// "Add" card, used for adding a new State-Specific Measure
export const AddCard = ({ buttonText, title, linkTo }: AddCardProps) => {
  const { isStateUser } = useUser();
  const testId = title.replace(/\s/g, "-");

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
          to={linkTo}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            disabledStatus={!isStateUser}
            icon="plus"
            testId={testId}
            buttonText={buttonText}
            buttonProps={{
              colorScheme: "blue",
              variant: "outline",
              color: "blue.500",
            }}
          />
        </Link>
      </CUI.Stack>
    </CUI.Box>
  );
};
