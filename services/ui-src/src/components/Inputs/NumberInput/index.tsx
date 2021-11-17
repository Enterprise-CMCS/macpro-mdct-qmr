import * as CUI from "@chakra-ui/react";
import { String } from "aws-sdk/clients/chimesdkmeetings";
//import { number } from "yargs";

interface NumberInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
        type="number"
        placeholder={placeholder ?? ""}
        onChange={onChange}
        value={displayValue(value, numberOfDecimals, displayPercent)}
        {...numberInputProps}
      />
      <CUI.FormErrorMessage>
        {errorMessage || "An Error Occured"}
      </CUI.FormErrorMessage>
      {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
    </CUI.FormControl>
  );
};


// could be moved to a utils file
const displayValue = (inputValue: String, numberOfDecimals: number, displayPercent: boolean, ) => {
  let displayValue : number = +inputValue;
  displayValue = displayValue*Math.pow(10, numberOfDecimals)
  displayValue = Math.round(displayValue)/Math.pow(10, numberOfDecimals)
  if(displayPercent){
    return `${displayValue.toFixed(numberOfDecimals)}%`
  }
  return `${displayValue.toFixed(numberOfDecimals)}`
}