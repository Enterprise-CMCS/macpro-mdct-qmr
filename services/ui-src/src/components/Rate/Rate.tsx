import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";

export function Rate(): JSX.Element {
  // interface TextInputProps extends InputWrapperProps {

  // }
  return (
    // <CUI.Container mb="12">
    <>
      <CUI.Stack spacing="4">
        <Inputs.TextInput
          label="Desribe the rate:"
          value={"ADSD"}
          onChange={() => ""}
          isInvalidFunc={(value) => String(value).length > 3}
          helperText="For example,specify the age groups and whether you are rep[orting on a certain indicator:"
          errorMessage="Text is too long"
        ></Inputs.TextInput>
      </CUI.Stack>
      <CUI.Stack spacing="4"></CUI.Stack>
    </>
  );
}
