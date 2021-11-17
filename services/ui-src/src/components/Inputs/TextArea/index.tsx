import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface TextAreaProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  isRequired?: boolean;
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
