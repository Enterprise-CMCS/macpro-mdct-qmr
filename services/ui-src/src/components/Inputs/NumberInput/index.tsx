import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
}

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

  return (
    <InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.InputGroup>
        <CUI.Input
          type="number"
          placeholder={placeholder ?? ""}
          onBlur={onBlur}
          onChange={onChange}
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
