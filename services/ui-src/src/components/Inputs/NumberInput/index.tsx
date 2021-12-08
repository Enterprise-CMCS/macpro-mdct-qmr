import * as CUI from "@chakra-ui/react";
import { InputWrapper, InputWrapperProps } from "components/InputWrapper";
import React from "react";
import { useFormContext } from "react-hook-form";
import objectPath from "object-path";

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
      displayPercent,
      onBlur,
      name,
      onChange,
      ...rest
    },
    ref
  ) => {
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <InputWrapper
        isInvalid={!!objectPath.get(errors, name)?.message}
        errorMessage={objectPath.get(errors, name)?.message}
        {...rest}
      >
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
