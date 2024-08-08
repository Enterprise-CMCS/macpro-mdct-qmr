import * as CUI from "@chakra-ui/react";
import { getLabelText } from "utils";

interface NotificationProps {
  alertStatus: CUI.AlertStatus;
  alertProps?: CUI.AlertProps;
  alertTitle: string;
  alertDescription?: string;
  extendedAlertList?: string[];
  close?: React.MouseEventHandler<HTMLButtonElement>;
}

enum BorderColor {
  success = "green.500",
  error = "red.500",
  warning = "yellow.500",
  info = "blue.500",
  loading = "yellow.500",
}

export const Notification = ({
  alertProps,
  alertTitle,
  alertDescription,
  alertStatus,
  extendedAlertList,
  close,
}: NotificationProps) => {
  const labelText = getLabelText();

  // If alternate text exists for a given label - display it instead
  let description = alertDescription;
  Object.keys(labelText).forEach((label: string) => {
    if (description?.includes(label) && labelText[label]) {
      // @ts-ignore
      description = description.replaceAll(label, labelText[label]);
    }
  });

  return (
    <CUI.Alert
      borderLeft="8px"
      className="hidden-print-items disabled-print-preview-items"
      borderColor={BorderColor[alertStatus]}
      py={3}
      status={alertStatus}
      {...alertProps}
    >
      <CUI.AlertIcon alignSelf="start" />
      <CUI.Box>
        <CUI.AlertTitle data-cy={alertTitle}>{alertTitle}</CUI.AlertTitle>
        {description && (
          <CUI.AlertDescription data-cy={description}>
            <CUI.Text>{description}</CUI.Text>
            {extendedAlertList?.length && (
              <CUI.UnorderedList ml={10}>
                {extendedAlertList.map((s, i) => (
                  <CUI.ListItem key={`errorListItem.${i}`}>{s}</CUI.ListItem>
                ))}
              </CUI.UnorderedList>
            )}
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
