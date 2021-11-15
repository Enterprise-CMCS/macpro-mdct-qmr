import React from "react";
import { TextArea } from "components/Inputs/TextArea";
import * as CUI from "@chakra-ui/react";

export default function DemoComponents(): JSX.Element {
  const [textAreaValue, setTextAreaValue] = React.useState("");

  return (
    <CUI.Container>
      <CUI.Heading size="md">Components</CUI.Heading>
      <TextArea
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        label="test text area"
        helperText="put in something here"
      />
    </CUI.Container>
  );
}
