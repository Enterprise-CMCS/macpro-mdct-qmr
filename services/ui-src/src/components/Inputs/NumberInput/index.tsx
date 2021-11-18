import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEvent<HTMLInputElement>;
  onBlur?: React.FormEvent<HTMLInputElement>;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
}

const decimalMask = (inputValue: string): boolean => {
  const mask = new RegExp("^[0-9]*.?[0-9]{0,4}$");
  return mask.test(inputValue);
};

export const NumberInput = ({
  numberInputProps,
  placeholder,
  onChange,
  onBlur,
  value,
  isInvalidFunc,
  displayPercent,
  ...rest
}: NumberInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }
  
    const handleChange = (v : React.ChangeEvent<HTMLInputElement>) => {
      if (decimalMask(v.target.value)) {
      onChange(v.target.value)
  }
}

  return (
    <InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.InputGroup>
        <CUI.Input
          type="number"
          placeholder={placeholder ?? ""}
          onBlur={onBlur}
          onChange={handleChange}
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
