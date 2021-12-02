import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";
import React from "react";

interface NumberInputProps extends InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      numberInputProps,
      placeholder,
      isInvalidFunc,
      displayPercent,
      onBlur,
      name,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <InputWrapper {...rest}>
        <CUI.InputGroup>
          <CUI.Input
            type="number"
            placeholder={placeholder ?? ""}
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
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
  }
);
