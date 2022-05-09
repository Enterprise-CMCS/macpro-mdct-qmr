import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

export const SingleSSM = () => {
  return (
    <CUI.Stack spacing={6}>
      <CUI.Divider />
      <QMR.TextInput
        label="Name the measure"
        name="measure-name"
      ></QMR.TextInput>
      <QMR.TextArea
        label="Please provide a description of the measure"
        name="measure-description"
      ></QMR.TextArea>
    </CUI.Stack>
  );
};
