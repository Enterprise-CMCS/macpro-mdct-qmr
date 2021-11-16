import * as CUI from "@chakra-ui/react";

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
}: NumberInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  return (
    <CUI.FormControl isInvalid={isInvalid} {...formControlProps}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      <CUI.Input
        type="number"
        placeholder={placeholder ?? ""}
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
