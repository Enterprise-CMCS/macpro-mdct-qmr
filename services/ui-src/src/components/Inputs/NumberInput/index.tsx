import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { allNumbers } from "utils/numberInputMasks";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  name: string;
  mask?: RegExp;
  readonly?: boolean;
}

export const NumberInput = ({
  numberInputProps,
  placeholder,
  displayPercent,
  name,
  formControlProps,
  readonly,
  mask = allNumbers,
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
          isReadOnly={readonly}
          placeholder={placeholder ?? ""}
          value={field.value ?? ""}
          name={name}
          onChange={(v) =>
            mask.test(v.target.value) || !v.target.value
              ? field.onChange(v.target.value || "")
              : null
          }
          data-testid="test-number-input"
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
