import { Link, useParams } from "react-router-dom";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useUser } from "hooks/authHooks";

interface AddStateSpecificMeasureCardProps {
  buttonText: string;
  title: string;
}

export const AddStateSpecificMeasureCard = ({
  buttonText,
  title,
}: AddStateSpecificMeasureCardProps) => {
  const { state, year } = useParams();
  const { isStateUser } = useUser();

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
          to={`/${state}/${year}/add-hh`}
          style={{
            textDecoration: "none",
          }}
        >
          <QMR.ContainedButton
            disabledStatus={!isStateUser}
            icon="plus"
            testId="add-state-specific-measure-button"
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
