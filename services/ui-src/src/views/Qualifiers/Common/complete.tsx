import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from ".";

interface Props {
  type: "AD" | "CH";
  handleValidation: (data: any) => void;
}

export const CompleteCoreSets = ({ handleValidation, type }: Props) => {
  const qualifierType = type === "AD" ? "Adult" : "Child";

  return (
    <CUI.ListItem data-cy="complete-CoreSet">
      <Common.QualifierHeader
        header={`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS`}
        description={`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS for review`}
      />

      <CUI.HStack>
        <QMR.ContainedButton
          testId="validate-core-set-questions-button"
          buttonText="Validate Core Set Questions"
          onClick={handleValidation}
          buttonProps={{
            colorScheme: "green",
            my: "5",
            type: "submit",
          }}
        />

        <QMR.ContainedButton
          testId="complete-core-set-questions-button"
          buttonText="Complete Core Set Questions"
          buttonProps={{
            colorScheme: "blue",
            my: "5",
            type: "submit",
          }}
        />
      </CUI.HStack>
    </CUI.ListItem>
  );
};
