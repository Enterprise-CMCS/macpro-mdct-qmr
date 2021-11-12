import * as CUI from "@chakra-ui/react";

interface TextAreaProps {
  label?: string;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  textAreaProps?: CUI.TextareaProps;
  placeholder?: string;
  value: string;
  isInvalid?: boolean;
  errorMessage?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({
  label,
  helperText,
  value,
  onChange,
  formControlProps,
  formLabelProps,
  placeholder,
  textAreaProps,
  isInvalid,
  errorMessage,
}: TextAreaProps) => {
  return (
    <CUI.FormControl {...formControlProps} isInvalid={isInvalid}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      <CUI.Textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...textAreaProps}
      />
      <CUI.FormErrorMessage>
        {errorMessage || "An Error Occured"}
      </CUI.FormErrorMessage>
      {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
    </CUI.FormControl>
  );
};
