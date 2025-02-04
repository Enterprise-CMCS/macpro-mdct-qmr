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
  testId?: string;
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
  testId,
}: ContainedButtonProps) => {
  const printIcon = icon === "print" ? <FaPrint /> : undefined;
  const plusIcon = icon === "plus" ? <FaPlusCircle /> : undefined;
  zIndex = zIndex ? zIndex : 1;

  return (
    <CUI.Box>
      <CUI.Button
        data-cy={testId || buttonText}
        leftIcon={printIcon}
        rightIcon={plusIcon}
        onClick={onClick}
        isDisabled={disabledStatus}
        borderRadius="sm"
        zIndex={zIndex}
        fontSize="1.2rem"
        color="white"
        textTransform="capitalize"
        fontWeight="bold"
        {...buttonProps}
      >
        {buttonText}
      </CUI.Button>
      {helperText && <CUI.Text {...helperTextProps}>{helperText}</CUI.Text>}
    </CUI.Box>
  );
};
