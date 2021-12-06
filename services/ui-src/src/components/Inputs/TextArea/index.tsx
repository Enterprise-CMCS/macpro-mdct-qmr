import React from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface TextAreaProps extends QMR.InputWrapperProps {
  placeholder?: string;
  name: string;
  isRequired?: boolean;
  textAreaProps?: CUI.TextareaProps;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ onChange, placeholder, textAreaProps, onBlur, name, ...rest }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    console.log(name, errors);
    return (
      <QMR.InputWrapper
        isInvalid={!!objectPath.get(errors, name)?.message}
        errorMessage={objectPath.get(errors, name)?.message}
        {...rest}
      >
        <CUI.Textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...textAreaProps}
        />
      </QMR.InputWrapper>
    );
  }
);
