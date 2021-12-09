import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Control, useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface TextInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  control: Control<any, object>;
  name: string;
  textInputProps?: CUI.InputProps;
}

export const TextInput = ({
  textInputProps,
  control,
  placeholder,
  name,
  ...rest
}: TextInputProps) => {
  const { field } = useController({
    name,
    control,
  });

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
        name={name}
        placeholder={placeholder}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...textInputProps}
      />
    </QMR.InputWrapper>
  );
};
