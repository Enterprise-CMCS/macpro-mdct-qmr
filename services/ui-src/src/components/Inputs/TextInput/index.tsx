import React from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface TextInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name: string;
  textInputProps?: CUI.InputProps;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ textInputProps, placeholder, onChange, onBlur, name, ...rest }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <QMR.InputWrapper
        isInvalid={!!objectPath.get(errors, name)?.message}
        errorMessage={objectPath.get(errors, name)?.message}
        {...rest}
      >
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
