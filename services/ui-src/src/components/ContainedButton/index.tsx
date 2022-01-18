import * as CUI from "@chakra-ui/react";
import { FaPlusCircle, FaPrint } from "react-icons/fa";
interface ContainedButtonProps {
  buttonText: any;
  buttonProps?: CUI.ButtonProps;
  disabledStatus?: boolean;
  helperText?: string;
  helperTextProps?: CUI.TextProps;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  zIndex?: number;
}

export const ContainedButton = ({
  disabledStatus,
  buttonText,
  buttonProps,
  helperText,
  helperTextProps,
  icon,
  onClick,
  zIndex,
}: ContainedButtonProps) => {
  const printIcon = icon === "print" ? <FaPrint /> : undefined;
  const plusIcon = icon === "plus" ? <FaPlusCircle /> : undefined;
  zIndex = zIndex ? zIndex : 1;

  return (
    <CUI.Box>
      <CUI.Button
        leftIcon={printIcon}
        rightIcon={plusIcon}
        onClick={onClick}
        disabled={disabledStatus}
        borderRadius="sm"
        zIndex={zIndex}
        {...buttonProps}
      >
        {buttonText}
      </CUI.Button>
      {helperText && <CUI.Text {...helperTextProps}>{helperText}</CUI.Text>}
    </CUI.Box>
  );
};
