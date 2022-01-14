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
    <CUI.Stack>
      <CUI.HStack pl="2">
        <QMR.ContainedButton
          disabledStatus={!isStateUser}
          buttonText={"Save"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
            type: "submit",
          }}
          onClick={handleSave}
        />
        <CUI.Flex mb={{ base: "1", lg: "0" }} data-testid="last-saved-text">
          {showCheck && (
            <CUI.Box mt="1">
              <FaCheckCircle data-testid="circle-check-icon" />
            </CUI.Box>
          )}
          {lastSavedText && (
            <CUI.Text ml="2" fontSize="sm">
              {lastSavedText}
            </CUI.Text>
          )}
        </CUI.Flex>
      </CUI.HStack>
    </CUI.Stack>
  );
};
