import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { ControllerRules } from "global";

interface TextInputProps extends QMR.InputWrapperProps, ControllerRules {
  isRequired?: boolean;
  name: string;
  placeholder?: string;
  textInputProps?: CUI.InputProps;
}

export const TextInput = ({
  isRequired = false,
  name,
  placeholder,
  rules,
  textInputProps,
  ...rest
}: TextInputProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules,
  });

  const path = objectPath.get(errors, name);

  return (
    <QMR.InputWrapper
      isInvalid={!!path?.message || path?.type === "required"}
      errorMessage={
        path?.message ||
        (path?.type === "required" && `This is a required field`)
      }
      {...rest}
    >
      <CUI.Input
        type="text"
        name={name}
        placeholder={placeholder}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        data-cy={name}
        isRequired={isRequired}
        {...textInputProps}
      />
    </QMR.InputWrapper>
  );
};
