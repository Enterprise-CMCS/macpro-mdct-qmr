import { ReactElement } from "react";
import * as CUI from "@chakra-ui/react";

type Inputs =
  | ReactElement<CUI.TextareaProps>
  | ReactElement<CUI.SelectProps>
  | ReactElement<CUI.RadioGroupProps>
  | ReactElement<CUI.InputProps>;

export interface InputWrapperProps {
  label?: string;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  errorMessage?: string;
  isInvalid?: boolean;
  renderHelperTextAbove?: boolean;
  children?: Inputs;
}

export const InputWrapper = ({
  label,
  helperText,
  formControlProps,
  formLabelProps,
  isInvalid,
  errorMessage,
  children,
  renderHelperTextAbove,
}: InputWrapperProps) => {
  return (
    <CUI.FormControl {...formControlProps} isInvalid={isInvalid}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      {helperText && renderHelperTextAbove && (
        <CUI.FormHelperText mb={2}>{helperText}</CUI.FormHelperText>
      )}
      {children}
      <CUI.Flex>
        {helperText && !renderHelperTextAbove && (
          <CUI.FormHelperText>{helperText}</CUI.FormHelperText>
        )}
        <CUI.Spacer />
        <CUI.FormErrorMessage>
          {errorMessage || "An Error Occured"}
        </CUI.FormErrorMessage>
      </CUI.Flex>
    </CUI.FormControl>
  );
};
