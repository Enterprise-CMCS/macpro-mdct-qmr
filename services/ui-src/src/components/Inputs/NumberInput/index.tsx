import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Control, useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  control: Control<any, object>;
  name: string;
}

export const NumberInput = ({
  numberInputProps,
  placeholder,
  displayPercent,
  name,
  control,
  formControlProps,
  ...rest
}: NumberInputProps) => {
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
      <CUI.InputGroup>
        <CUI.Input
          type="number"
          placeholder={placeholder ?? ""}
          name={name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...numberInputProps}
        />
        {displayPercent && (
          <CUI.InputRightElement
            pointerEvents="none"
            color="black.300"
            fontSize="1.3em"
            children="%"
          />
        )}
      </CUI.InputGroup>
    </QMR.InputWrapper>
  );
};
