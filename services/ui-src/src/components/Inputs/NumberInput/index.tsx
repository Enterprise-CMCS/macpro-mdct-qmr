import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: (s: string) => void;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  displayAsFloat?: boolean | undefined;
}

export const decimalMask = (
  inputValue: string,
  displayAsFloat: boolean | undefined
): boolean => {
  return displayAsFloat
    ? /^-{0,1}\d*\.?\d{0,4}$/.test(inputValue)
    : /^-{0,1}\d*$/.test(inputValue);
};

export const NumberInput = ({
  numberInputProps,
  placeholder,
  onChange,
  value,
  isInvalidFunc,
  displayPercent,
  displayAsFloat,
  ...rest
}: NumberInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  const handleChange = (v: string) => {
    if (decimalMask(v, displayAsFloat)) {
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
