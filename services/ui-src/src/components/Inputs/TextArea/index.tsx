import * as CUI from "@chakra-ui/react";
import { InputWrapper } from "components/InputWrapper";

interface TextAreaProps {
  label?: string;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  placeholder?: string;
  value: string;
  errorMessage?: string;
  isInvalidFunc?: (v: string) => boolean;
  textAreaProps?: CUI.TextareaProps;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({
  value,
  onChange,
  placeholder,
  textAreaProps,
  isInvalidFunc,
  ...rest
}: TextAreaProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  return (
    <InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.Textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...textAreaProps}
      />
    </InputWrapper>
  );
};
