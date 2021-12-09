import * as CUI from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPrint } from "@fortawesome/free-solid-svg-icons";

interface ContainedButtonProps {
  buttonText: any;
  buttonProps?: CUI.ButtonProps;
  disabledStatus?: boolean;
  helperText?: string;
  helperTextProps?: CUI.TextProps;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  const printIcon =
    icon === "print" ? <FontAwesomeIcon icon={faPrint} /> : undefined;
  const plusIcon =
    icon === "plus" ? <FontAwesomeIcon icon={faPlusCircle} /> : undefined;

  return (
    <CUI.Box textAlign="center">
      <CUI.Button
        leftIcon={printIcon}
        rightIcon={plusIcon}
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
