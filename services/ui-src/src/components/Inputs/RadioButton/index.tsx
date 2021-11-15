import * as CUI from "@chakra-ui/react";

interface RadioButtonOption {
  displayValue: string;
  value: string | number;
}

interface RadioButtonProps {
  value: string;
  options: RadioButtonOption[];
  onChange: (nextValue: string) => void;
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
  //   let isInvalid = false;
  //   if (isInvalidFunc) {
  //     isInvalid ?? isInvalidFunc(value);
  //   }

  return (
    //   {...formControlProps} isInvalid={isInvalid}
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
