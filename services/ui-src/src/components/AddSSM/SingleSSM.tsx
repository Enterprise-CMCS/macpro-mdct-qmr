import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface SingleSSMProps {
  index: number;
}

export const SingleSSM = ({ index }: SingleSSMProps) => {
  return (
    <CUI.Stack spacing={6}>
      <QMR.TextInput
        label="Name the measure"
        name={`ssm-name-${index}`}
      ></QMR.TextInput>
      <QMR.TextArea
        label="Please provide a description of the measure"
        name={`measure-description-${index}`}
      ></QMR.TextArea>
    </CUI.Stack>
  );
};
