import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { isDevEnv } from "config";
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
          Please select "Validate Measure" to check any error present on the
          measure prior to completion
        </CUI.Text>
        <CUI.Text py="3" data-cy="complete measure sub-2">
          Complete the measure and mark it for submission to CMS for review
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
