import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { HiCheckCircle } from "react-icons/hi";

interface Props {
  handleSave: () => void;
  handleSubmit: () => void;
  lastSavesText?: string;
}

export const MeasureButtons = ({
  handleSave,
  handleSubmit,
  lastSavesText,
}: Props) => {
  const showCheck = lastSavesText?.toLowerCase() === "saved moments ago";

  return (
    <CUI.HStack display={{ base: "block", lg: "flex" }} textAlign="center">
      <CUI.Flex
        fontSize="xl"
        justifyContent="center"
        mb={{ base: "1", lg: "0" }}
      >
        {showCheck && (
          <CUI.Box mt="2px">
            <HiCheckCircle />
          </CUI.Box>
        )}
        {lastSavesText && (
          <CUI.Text ml="2" fontSize="sm">
            {lastSavesText}
          </CUI.Text>
        )}
      </CUI.Flex>
      <CUI.HStack pl="2">
        <QMR.ContainedButton
          buttonText={"Save"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
            type: "submit",
          }}
          onClick={handleSave}
        />
        <QMR.ContainedButton
          buttonText={"Complete Measure"}
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
