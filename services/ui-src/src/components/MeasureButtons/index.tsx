import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { FaCheckCircle } from "react-icons/fa";
import { useUser } from "hooks/authHooks";
interface Props {
  handleSave: () => void;
  lastSavedText?: string;
}

export const MeasureButtons = ({ handleSave, lastSavedText }: Props) => {
  const { isStateUser } = useUser();

  const showCheck = lastSavedText?.toLowerCase() === "saved moments ago";

  return (
    <CUI.Stack width="15rem">
      <CUI.HStack pl="1">
        <QMR.ContainedButton
          disabledStatus={!isStateUser}
          buttonText={"Save"}
          buttonProps={{
            minWidth: "10rem",
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={handleSave}
        />
      </CUI.HStack>
      <CUI.Flex mb={{ base: "1", lg: "0" }} data-testid="last-saved-text">
        {showCheck && (
          <CUI.Box mt="1">
            <FaCheckCircle data-testid="circle-check-icon" />
          </CUI.Box>
        )}
        {lastSavedText && (
          <CUI.Text ml={showCheck ? 2 : 0} fontSize="sm">
            {lastSavedText}
          </CUI.Text>
        )}
      </CUI.Flex>
    </CUI.Stack>
  );
};
