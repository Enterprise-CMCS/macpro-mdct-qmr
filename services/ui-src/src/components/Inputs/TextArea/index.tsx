import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import ResizeTextarea from "react-textarea-autosize";
import { ControllerRules } from "global";

interface TextAreaProps extends QMR.InputWrapperProps, ControllerRules {
  name: string;
  textAreaProps?: CUI.TextareaProps;
}

export const TextArea = ({
  name,
  rules,
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
    rules,
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
        name={name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value ?? ""}
        {...textAreaProps}
      />
    </QMR.InputWrapper>
  );
};
