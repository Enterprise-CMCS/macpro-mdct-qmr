import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

export interface TextInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  textInputProps?: CUI.InputProps;
}

export const TextInput = ({
  textInputProps,
  placeholder,
  onChange,
  value,
  isInvalidFunc,
  ...rest
}: TextInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }
  return (
    <InputWrapper isInvalid={isInvalid} {...rest}>
      <CUI.Input
        type="text"
        placeholder={placeholder ?? ""}
        onChange={onChange}
        value={value}
        {...textInputProps}
      />
    </InputWrapper>
  );
};
