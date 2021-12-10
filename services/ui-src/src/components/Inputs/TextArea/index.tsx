import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Control, useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface TextAreaProps extends QMR.InputWrapperProps {
  placeholder?: string;
  name: string;
  control?: Control<any, object>;
  isRequired?: boolean;
  textAreaProps?: CUI.TextareaProps;
}

export const TextArea = ({
  placeholder,
  textAreaProps,
  name,
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
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.Textarea
        name={name}
        value={field.value}
        placeholder={placeholder}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...textAreaProps}
      />
    </QMR.InputWrapper>
  );
};
