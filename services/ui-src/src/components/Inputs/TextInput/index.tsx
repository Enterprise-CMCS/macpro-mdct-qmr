import * as CUI from "@chakra-ui/react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  textInputProps?: CUI.InputProps;
  isInvalidFunc?: (v: string) => boolean;
}

export const TextInput = ({
  label,
  formLabelProps,
  textInputProps,
  placeholder,
  onChange,
  value,
  isInvalidFunc,
  helperText,
  errorMessage,
  formControlProps,
}: TextInputProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  return (
    <CUI.FormControl isInvalid={isInvalid} {...formControlProps}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      <CUI.Input
        type="text"
        placeholder={placeholder ?? ""}
        onChange={onChange}
        value={value}
        {...textInputProps}
      />
      <CUI.FormErrorMessage>
        {errorMessage || "An Error Occured"}
      </CUI.FormErrorMessage>
      {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
    </CUI.FormControl>
  );
};
