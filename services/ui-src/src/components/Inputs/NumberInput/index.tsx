import * as CUI from "@chakra-ui/react";
//import { String } from "aws-sdk/clients/chimesdkmeetings";
//import { number } from "yargs";

interface NumberInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  numberInputProps?: CUI.InputProps;
  isInvalidFunc?: (v: string) => boolean;
  numberOfDecimals?: number;
  displayPercent?: boolean;
}

export const NumberInput = ({
  label,
  formLabelProps,
  numberInputProps,
  placeholder,
  onChange,
  onBlur,
  value,
  isInvalidFunc,
  helperText,
  errorMessage,
  formControlProps,
  numberOfDecimals,
  displayPercent
}: NumberInputProps) => {
  //Set default values for optional props
  let isInvalid = isInvalidFunc ? isInvalidFunc(value) : false;
  numberOfDecimals = numberOfDecimals ? numberOfDecimals : 0;
  displayPercent = displayPercent ? displayPercent : false;

  return (
    <CUI.FormControl isInvalid={isInvalid} {...formControlProps}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      <CUI.Input
        type="string"
        placeholder={placeholder ?? ""}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...numberInputProps}
      />
      <CUI.FormErrorMessage>
        {errorMessage || "An Error Occured"}
      </CUI.FormErrorMessage>
      {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
    </CUI.FormControl>
  );
};
