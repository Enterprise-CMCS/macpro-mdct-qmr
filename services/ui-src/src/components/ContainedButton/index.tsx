import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

interface ContainedButtonProps extends QMR.InputWrapperProps {
  disabledStatus?: boolean;
  buttonText: string;
  buttonProps: CUI.ButtonProps;
  helperText?: string;
}

export const ContainedButton = ({
  disabledStatus,
  buttonText,
  buttonProps,
  helperText,
}: ContainedButtonProps) => {
  return (
    <CUI.Box maxW="2xs" textAlign="center">
      <CUI.Button disabled={disabledStatus} {...buttonProps}>
        {buttonText}
      </CUI.Button>
      {helperText && (
        <CUI.Text fontSize="xs" lineHeight="1rem" mt="1">
          {helperText}
        </CUI.Text>
      )}
    </CUI.Box>
  );
};
