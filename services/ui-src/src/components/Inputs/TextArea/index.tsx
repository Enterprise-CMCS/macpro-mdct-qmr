import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface TextAreaProps extends QMR.InputWrapperProps {
  placeholder?: string;
  value: string;
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
    <QMR.InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.Textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...textAreaProps}
      />
    </QMR.InputWrapper>
  );
};
