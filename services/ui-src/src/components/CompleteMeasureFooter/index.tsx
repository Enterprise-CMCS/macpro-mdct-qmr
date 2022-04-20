import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

import config from "config";
interface Props {
  // these functions do not return a value
  handleClear: () => void;
  handleSubmit: () => void;
  handleValidation: () => void;
}

export const CompleteMeasureFooter = ({
  handleClear,
  handleSubmit,
  handleValidation,
}: Props) => {
  return (
    <>
      <CUI.Stack alignItems="flex-start" className="hidden-print-items">
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
        <CUI.HStack>
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "green",
            }}
            buttonText="Validate Measure"
            onClick={handleValidation}
          />
          <QMR.ContainedButton
            buttonProps={{
              colorScheme: "blue",
            }}
            buttonText="Complete Measure"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
          {config.BRANCH_NAME !== undefined && config.BRANCH_NAME !== "prod" && (
            <QMR.ContainedButton
              buttonProps={{
                colorScheme: "red",
              }}
              buttonText="Clear Data"
              onClick={handleClear}
            />
          )}
        </CUI.HStack>
      </CUI.Stack>
    </>
  );
};
