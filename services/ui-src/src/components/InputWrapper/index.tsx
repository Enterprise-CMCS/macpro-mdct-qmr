import { ReactElement } from "react";
import * as CUI from "@chakra-ui/react";

type Inputs =
  | ReactElement<CUI.TextareaProps>
  | ReactElement<CUI.SelectProps>
  | ReactElement<CUI.RadioGroupProps>
  | ReactElement<CUI.InputProps>;

export interface InputWrapperProps {
  title?: string;
  label?: string | ReactElement;
  helperText?: string;
  formControlProps?: CUI.FormControlProps;
  formLabelProps?: CUI.FormLabelProps;
  errorMessage?: string;
  isInvalid?: boolean;
  renderHelperTextAbove?: boolean;
  children?: Inputs;
}

export const InputWrapper = ({
  title,
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
      {title && (
        <CUI.FormLabel {...formLabelProps} data-cy={label}>
          {title}
        </CUI.FormLabel>
      )}
      {helperText && renderHelperTextAbove && (
        <CUI.FormHelperText mb={2}>{helperText}</CUI.FormHelperText>
      )}
      {children}
      <CUI.Flex>
        {helperText && !renderHelperTextAbove && (
          <CUI.FormHelperText data-cy={helperText}>
            {helperText}
          </CUI.FormHelperText>
        )}
        <CUI.Spacer />
        <CUI.FormErrorMessage data-cy={"error-message-" + errorMessage}>
          {errorMessage || "An Error Occured"}
        </CUI.FormErrorMessage>
      </CUI.Flex>
    </CUI.FormControl>
  );
};
