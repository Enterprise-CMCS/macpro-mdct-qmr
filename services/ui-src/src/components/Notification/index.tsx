import * as CUI from "@chakra-ui/react";

interface NotificationProps {
  alertStatus: CUI.AlertStatus;
  alertProps?: CUI.AlertProps;
  alertTitle: string;
  alertDescription: string;
  close: React.MouseEventHandler<HTMLButtonElement>;
}

export const Notification = ({
  alertProps,
  alertTitle,
  alertDescription,
  alertStatus,
  close,
}: NotificationProps) => {
  let borderColor = "green.500";

  if (alertStatus === "error") {
    borderColor = "red.500";
  } else if (alertStatus === "warning") {
    borderColor = "yellow.500";
  } else if (alertStatus === "info") {
    borderColor = "blue.500";
  }

  return (
    <CUI.Alert
      pl={6}
      ml={2}
      borderLeft="8px"
      borderColor={borderColor}
      py={3}
      status={alertStatus}
      {...alertProps}
    >
      <CUI.AlertIcon />
      <CUI.AlertTitle>{alertTitle}</CUI.AlertTitle>
      <CUI.AlertDescription>{alertDescription}</CUI.AlertDescription>
      <CUI.CloseButton
        onClick={close}
        position="absolute"
        right="8px"
        top="8px"
      />
    </CUI.Alert>
  );
};
