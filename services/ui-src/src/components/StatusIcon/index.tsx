import { Box } from "@chakra-ui/react";
import { CoreSetTableItem } from "components/Table/types";
import { MeasureStatus } from "types";

interface Props {
  status: CoreSetTableItem.Status;
}
export const StatusIcon = ({ status }: Props) => {
  const getStatus = (status: CoreSetTableItem.Status | MeasureStatus) => {
    switch (status) {
      default:
      case MeasureStatus.INCOMPLETE:
      case CoreSetTableItem.Status.NOT_STARTED:
        return {
          src: "/icons/status/icon_status_alert.svg",
          alt: "not started icon",
          text: "Not started",
          textColor: "palette.error_darker",
        };
      case CoreSetTableItem.Status.IN_PROGRESS:
        return {
          src: "/icons/status/icon_status_inprogress.svg",
          alt: "in progress icon",
          text: "In progress",
          textColor: "palette.primary",
        };
      case MeasureStatus.COMPLETE:
      case CoreSetTableItem.Status.COMPLETED:
      case CoreSetTableItem.Status.SUBMITTED:
        return {
          src: "/icons/status/icon_status_check.svg",
          alt: "complete icon",
          text: "Complete",
          textColor: "palette.success",
        };
    }
  };

  const statusObject = getStatus(status);

  return (
    <Box minWidth="fit-content">
      <img src={statusObject.src} alt={statusObject.alt} />
    </Box>
  );
};
