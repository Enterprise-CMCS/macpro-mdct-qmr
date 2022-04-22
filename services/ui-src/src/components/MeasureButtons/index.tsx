import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useUser } from "hooks/authHooks";
interface Props {
  handleSave: () => void;
  lastAltered?: number;
  isLoading?: boolean;
  isSubmitted?: boolean;
}

export const MeasureButtons = ({
  handleSave,
  lastAltered,
  isLoading,
  isSubmitted,
}: Props) => {
  const { isStateUser } = useUser();

  return (
    <CUI.Stack>
      <QMR.ContainedButton
        disabledStatus={!isStateUser || isLoading}
        buttonText={isLoading ? "Saving" : "Save"}
        buttonProps={{
          minWidth: "10rem",
          colorScheme: "blue",
          isFullWidth: true,
        }}
        onClick={handleSave}
      />
      {lastAltered && (
        <CUI.Flex mb={{ base: "1", lg: "0" }} data-testid="last-saved-text">
          <QMR.LastSavedText
            lastAltered={lastAltered}
            isSubmitted={isSubmitted}
          />
        </CUI.Flex>
      )}
    </CUI.Stack>
  );
};
