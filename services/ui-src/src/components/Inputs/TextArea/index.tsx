import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import React from "react";

interface TextAreaProps extends QMR.InputWrapperProps {
  placeholder?: string;
  name: string;
  isRequired?: boolean;
  textAreaProps?: CUI.TextareaProps;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      onChange,
      placeholder,
      textAreaProps,
      isInvalidFunc,
      onBlur,
      name,
      ...rest
    },
    ref
  ) => {
    let isInvalid = false;

    return (
      <QMR.InputWrapper {...rest} isInvalid={isInvalid}>
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
