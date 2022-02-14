import * as CUI from "@chakra-ui/react";

interface NotificationProps {
  alertStatus: CUI.AlertStatus;
  alertProps?: CUI.AlertProps;
  alertTitle: string;
  alertDescription?: string;
  close?: React.MouseEventHandler<HTMLButtonElement>;
}

enum BorderColor {
  success = "green.500",
  error = "red.500",
  warning = "yellow.500",
  info = "blue.500",
}

export const Notification = ({
  alertProps,
  alertTitle,
  alertDescription,
  alertStatus,
  close,
}: NotificationProps) => {
  return (
    <CUI.Alert
      borderLeft="8px"
      borderColor={BorderColor[alertStatus]}
      py={3}
      status={alertStatus}
      {...alertProps}
    >
      <CUI.AlertIcon alignSelf="start" />
      <CUI.Box>
        <CUI.AlertTitle data-cy={alertTitle}>{alertTitle}</CUI.AlertTitle>
        {alertDescription && (
          <CUI.AlertDescription data-cy={alertDescription}>
            {alertDescription}
          </CUI.AlertDescription>
        )}
      </CUI.Box>
      {close && (
        <CUI.CloseButton
          onClick={close}
          position="absolute"
          right="8px"
          top="5"
          data-testid="close"
        />
      )}
    </CUI.Alert>
  );
};
