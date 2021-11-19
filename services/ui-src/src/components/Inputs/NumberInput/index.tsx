import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
}


export const NumberInput = ({
  numberInputProps,
  placeholder,
  onChange,
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
          type="text"
          placeholder={placeholder ?? ""}
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
