import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Q from "./";

interface Props {
  completeEnabled: boolean;
}

export const CompleteCoreSets = ({ completeEnabled }: Props) => {
  return (
    <CUI.ListItem>
      <Q.QualifierHeader
        header="Complete all Adult Core Set Questions and Child Core Set Measures to submit to CMS"
        description="Complete all Adult Core Set Questions and Adult Core Set Measures to submit to CMS for review"
      />

      <QMR.ContainedButton
        buttonText="Complete Core Set Questions"
        disabledStatus={!completeEnabled}
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
