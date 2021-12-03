import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPrint } from "@fortawesome/free-solid-svg-icons";

interface ContainedButtonProps extends QMR.InputWrapperProps {
  disabledStatus?: boolean;
  buttonText: any;
  buttonProps: CUI.ButtonProps;
  helperText?: string;
  helperTextProps?: CUI.TextProps;
  icon?: string;
  onClick: () => void;
}

export const ContainedButton = ({
  disabledStatus,
  buttonText,
  buttonProps,
  helperText,
  helperTextProps,
  icon,
  onClick,
}: ContainedButtonProps) => {
  const leftIcon =
    icon === "print" ? <FontAwesomeIcon icon={faPrint} /> : undefined;
  const rightIcon =
    icon === "plus" ? <FontAwesomeIcon icon={faPlusCircle} /> : undefined;

  return (
    <CUI.Box textAlign="center">
      <CUI.Button
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onClick={onClick}
        disabled={disabledStatus}
        {...buttonProps}
      >
        {buttonText}
      </CUI.Button>
      {helperText && <CUI.Text {...helperTextProps}>{helperText}</CUI.Text>}
    </CUI.Box>
  );
};
