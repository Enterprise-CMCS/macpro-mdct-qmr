import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  name: string;
}

export const NumberInput = ({
  numberInputProps,
  placeholder,
  displayPercent,
  name,
  formControlProps,
  ...rest
}: NumberInputProps) => {
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
      <CUI.InputGroup>
        <CUI.Input
          type="number"
          placeholder={placeholder ?? ""}
          value={field.value ?? ""}
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
