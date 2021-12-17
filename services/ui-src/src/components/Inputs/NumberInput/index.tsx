import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  name: string;
  allowNegative?: boolean;
  maximumDecimal?: number;
}

export const NumberInput = ({
  numberInputProps,
  placeholder,
  displayPercent,
  name,
  formControlProps,
  allowNegative,
  maximumDecimal,
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

  const regex = new RegExp(
    `^${(allowNegative && "-?") || ""}\\d*${
      (maximumDecimal && `.?\\d{0,${maximumDecimal}}`) || ""
    }$`,
    "i"
  );

  return (
    <QMR.InputWrapper
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.InputGroup>
        <CUI.Input
          placeholder={placeholder ?? ""}
          value={field.value ?? ""}
          name={name}
          onChange={(v) =>
            regex.test(v.target.value) ? field.onChange(v.target.value) : null
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
