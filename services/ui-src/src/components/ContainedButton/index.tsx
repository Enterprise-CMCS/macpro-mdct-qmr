import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface ContainedButtonProps extends QMR.InputWrapperProps {
  disabledStatus?: boolean;
  buttonText: any;
  buttonProps: CUI.ButtonProps;
  helperText?: string;
  helperTextProps?: CUI.TextProps;
  onClick: () => void;
}

export const ContainedButton = ({
  disabledStatus,
  buttonText,
  buttonProps,
  helperText,
  helperTextProps,
  onClick,
}: ContainedButtonProps) => {
  return (
    <CUI.Box textAlign="center">
      <CUI.Button onClick={onClick} disabled={disabledStatus} {...buttonProps}>
        {buttonText}
      </CUI.Button>
      {helperText && <CUI.Text {...helperTextProps}>{helperText}</CUI.Text>}
    </CUI.Box>
  );
};
