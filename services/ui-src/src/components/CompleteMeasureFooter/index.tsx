import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useContext } from "react";
import { isDevEnv } from "config";
import SharedContext from "shared/SharedContext";
interface Props {
  // these functions do not return a value
  handleClear: () => void;
  handleSubmit: () => void;
  handleValidation: () => void;
  disabled?: boolean;
  validating?: boolean;
}

export const CompleteMeasureFooter = ({
  handleClear,
  handleSubmit,
  handleValidation,
  disabled = false,
  validating = false,
}: Props) => {
  const labels: any = useContext(SharedContext);

  return (
    <>
      <CUI.Stack
        alignItems="flex-start"
        data-testid="complete-measure-footer"
        className="hidden-print-items"
      >
        <CUI.Heading fontSize="xl" fontWeight="600">
          Complete the Measure
        </CUI.Heading>
        <CUI.Text data-cy="complete measure sub-1">
          {labels?.CompleteMeasureFooter?.validateMeasureCopy}
        </CUI.Text>
        <CUI.Text py="3" data-cy="complete measure sub-2">
          {labels?.CompleteMeasureFooter?.completeMeasureCopy}
        </CUI.Text>
        <CUI.Stack
          zIndex={disabled ? 2 : 0}
          direction={{ base: "column", md: "row" }}
          width="100%"
        >
          <QMR.ContainedButton
            variant="green"
            buttonText="Validate Measure"
            disabledStatus={disabled}
            loading={validating}
            onClick={handleValidation}
          />
          <QMR.ContainedButton
            buttonText="Complete Measure"
            disabledStatus={disabled}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
          {isDevEnv() && (
            <QMR.ContainedButton
              variant="red"
              buttonText="Clear Data"
              disabledStatus={disabled}
              onClick={handleClear}
            />
          )}
        </CUI.Stack>
      </CUI.Stack>
    </>
  );
};
