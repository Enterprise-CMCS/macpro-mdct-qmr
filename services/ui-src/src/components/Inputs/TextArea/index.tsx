import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import ResizeTextarea from "react-textarea-autosize";

interface TextAreaProps extends QMR.InputWrapperProps {
  isRequired?: boolean;
  maxLength?: number;
  name: string;
  placeholder?: string;
  textAreaProps?: CUI.TextareaProps;
}

export const TextArea = ({
  isRequired = false,
  maxLength,
  name,
  placeholder,
  textAreaProps,
  ...rest
}: TextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  return (
    <QMR.InputWrapper
      errorMessage={objectPath.get(errors, name)?.message}
      isInvalid={!!objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.Textarea
        as={ResizeTextarea}
        data-cy={name}
        isRequired={isRequired}
        maxLength={maxLength}
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={placeholder}
        value={field.value ?? ""}
        {...textAreaProps}
      />
    </QMR.InputWrapper>
  );
};
