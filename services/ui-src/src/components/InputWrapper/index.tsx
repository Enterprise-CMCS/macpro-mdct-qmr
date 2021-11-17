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
  isInvalidFunc?: (v: string | number) => boolean;
  isInvalid?: boolean;
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
}: InputWrapperProps) => {
  return (
    <CUI.FormControl {...formControlProps} isInvalid={isInvalid}>
      {label && <CUI.FormLabel {...formLabelProps}>{label}</CUI.FormLabel>}
      {children}
      <CUI.Flex>
        {helperText && <CUI.FormHelperText>{helperText}</CUI.FormHelperText>}
        <CUI.Spacer />
        <CUI.FormErrorMessage>
          {errorMessage || "An Error Occured"}
        </CUI.FormErrorMessage>
      </CUI.Flex>
    </CUI.FormControl>
  );
};
