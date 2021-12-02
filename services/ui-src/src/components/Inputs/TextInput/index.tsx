import React from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface TextInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name: string;
  textInputProps?: CUI.InputProps;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      textInputProps,
      placeholder,
      onChange,
      onBlur,
      name,
      isInvalidFunc,
      ...rest
    },
    ref
  ) => {
    let isInvalid = false;

    return (
      <QMR.InputWrapper isInvalid={isInvalid} {...rest}>
        <CUI.Input
          type="text"
          ref={ref}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...textInputProps}
        />
      </QMR.InputWrapper>
    );
  }
);
