import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface TextInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  name: string;
  textInputProps?: CUI.InputProps;
}

export const TextInput = ({
  textInputProps,
  placeholder,
  name,
  ...rest
}: TextInputProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  return (
    <QMR.InputWrapper
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.Input
        type="text"
        name={name}
        placeholder={placeholder}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...textInputProps}
      />
    </QMR.InputWrapper>
  );
};
