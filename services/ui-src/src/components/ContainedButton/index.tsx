import * as CUI from "@chakra-ui/react";
import { FaPlusCircle, FaPrint } from "react-icons/fa";
interface ContainedButtonProps {
  type?: "button" | "submit";
  buttonText: any;
  disabledStatus?: boolean;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  testId?: string;
  loading?: boolean;
  variant?: string;
}

export const ContainedButton = ({
  type = "button",
  disabledStatus,
  buttonText,
  variant = "primary",
  icon,
  onClick,
  testId,
  loading = false,
}: ContainedButtonProps) => {
  const printIcon = icon === "print" ? <FaPrint /> : undefined;
  const plusIcon = icon === "plus" ? <FaPlusCircle /> : undefined;

  return (
    <CUI.Box>
      <CUI.Button
        data-cy={testId || buttonText}
        leftIcon={printIcon}
        rightIcon={plusIcon}
        onClick={onClick}
        isDisabled={disabledStatus}
        isLoading={loading}
        loadingText={buttonText}
        variant={variant}
        type={type}
      >
        {buttonText}
      </CUI.Button>
    </CUI.Box>
  );
};
