import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: (s: string) => void;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  allowSymbols?: boolean;
}

export const decimalMask = (inputValue: string): boolean => {
  return /^\d*\.?\d{0,4}$/.test(inputValue);
};

export const symbolMask = (inputValue: string): boolean => {
  return /^e?\+?-?\d*\.?\d{0,4}$/.test(inputValue);
};

export const NumberInput = ({
  numberInputProps,
  placeholder,
  onChange,
  value,
  isInvalidFunc,
  displayPercent,
  allowSymbols,
  ...rest
}: NumberInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  const handleChange = (v: string) => {
    if (allowSymbols && symbolMask(v)) {
      return onChange(v);
    }

    if (decimalMask(v)) {
      onChange(v);
    }
  };

  return (
    <InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.InputGroup>
        <CUI.Input
          type="text"
          placeholder={placeholder ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
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
    </InputWrapper>
  );
};
