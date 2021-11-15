import * as CUI from "@chakra-ui/react";

// This interface will be needed in other files to setup the RadioButtonOptions Array
export interface RadioButtonOption {
  displayValue: string;
  value: string | number;
}

interface RadioButtonProps {
  value: string;
  onChange: (nextValue: string) => void;
  options: RadioButtonOption[];
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const RadioButton = ({
  options,
  value,
  onChange,
  label,
  helperText,
  errorMessage,
  formControlProps,
  formLabelProps,
}: RadioButtonProps) => {
  return (
    <CUI.FormControl {...formControlProps}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      <CUI.RadioGroup value={value} onChange={onChange}>
        <CUI.Stack>
          {options.map(({ displayValue, value }) => (
            <CUI.Radio value={value} key={value}>
              {displayValue}
            </CUI.Radio>
          ))}
        </CUI.Stack>
      </CUI.RadioGroup>
      <CUI.FormErrorMessage>
        {errorMessage || "An Error Occured"}
      </CUI.FormErrorMessage>
      {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
    </CUI.FormControl>
  );
};
