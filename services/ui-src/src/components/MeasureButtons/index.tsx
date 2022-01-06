import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { FaCheckCircle } from "react-icons/fa";
import { useUser } from "hooks/authHooks";
interface Props {
  handleSave?: () => void;
  handleSubmit: () => void;
  submitButtonText?: string;
  lastSavedText?: string;
}

export const MeasureButtons = ({
  handleSave,
  handleSubmit,
  submitButtonText,
  lastSavedText,
}: Props) => {
  const { isStateUser } = useUser();

  const showCheck = lastSavedText?.toLowerCase() === "saved moments ago";

  return (
    <CUI.HStack display={{ base: "block", lg: "flex" }}>
      <CUI.Flex
        fontSize="xl"
        justifyContent="center"
        mb={{ base: "1", lg: "0" }}
        data-testid="last-saved-text"
      >
        {showCheck && (
          <CUI.Box mt="2px">
            <FaCheckCircle data-testid="circle-check-icon" />
          </CUI.Box>
        )}
        {lastSavedText && (
          <CUI.Text ml="2" fontSize="sm">
            {lastSavedText}
          </CUI.Text>
        )}
      </CUI.Flex>
      <CUI.HStack pl="2">
        {handleSave && (
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
        )}
        <QMR.ContainedButton
          disabledStatus={!isStateUser}
          buttonText={submitButtonText || "Complete Measure"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
            type: "submit",
          }}
          onClick={handleSubmit}
        />
      </CUI.HStack>
    </CUI.HStack>
  );
};
