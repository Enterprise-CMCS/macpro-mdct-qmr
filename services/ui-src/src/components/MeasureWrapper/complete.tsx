import * as QMR from "components";
import * as CUI from "@chakra-ui/react";

interface Props {
  type: "AD" | "CH" | "HH";
  handleValidation: (data: any) => void;
  handleSubmit: (data: any) => void;
}

export const CompleteCoreSets = ({
  handleValidation,
  handleSubmit,
  type,
}: Props) => {
  let qualifierType = type === "AD" ? "Adult" : "Child";
  if (type === "HH") {
    qualifierType = "Health Home";
  }

  return (
    <CUI.Box data-cy="complete-CoreSet">
      <CUI.Stack spacing="4" mt="10">
        <CUI.Text fontWeight="bold">{`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS`}</CUI.Text>
        <CUI.Text data-cy={"qualifier-header-description"} as="h3">
          {`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS for review.`}
        </CUI.Text>
      </CUI.Stack>

      <CUI.Stack direction={{ base: "column", md: "row" }} width="100%" my="5">
        <QMR.ContainedButton
          testId="validate-core-set-questions-button"
          buttonText="Validate Core Set Questions"
          onClick={handleValidation}
          variant="green"
        />

        <QMR.ContainedButton
          testId="complete-core-set-questions-button"
          buttonText="Complete Core Set Questions"
          onClick={handleSubmit}
        />
      </CUI.Stack>
    </CUI.Box>
  );
};
