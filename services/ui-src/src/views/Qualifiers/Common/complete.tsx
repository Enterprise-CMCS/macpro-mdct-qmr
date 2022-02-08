import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from ".";

interface Props {
  type: "AD" | "CH";
}

export const CompleteCoreSets = ({ type }: Props) => {
  const qualifierType = type === "AD" ? "Adult" : "Child";

  return (
    <CUI.ListItem>
      <Common.QualifierHeader
        header={`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS`}
        description={`Complete all ${qualifierType} Core Set Questions and ${qualifierType} Core Set Measures to submit to CMS for review`}
      />

      <QMR.ContainedButton
        testId="complete-core-set-questions-button"
        buttonText="Complete Core Set Questions"
        buttonProps={{
          bg: "blue.600",
          colorScheme: "blue",
          textTransform: "capitalize",
          my: "5",
          type: "submit",
        }}
      />
    </CUI.ListItem>
  );
};
