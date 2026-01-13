import { Box } from "@chakra-ui/react";
import { CoreSetTableItem } from "components/Table/types";
import { MeasureStatus } from "types";

interface Props {
  status: CoreSetTableItem.Status;
}
export const StatusIcon = ({ status }: Props) => {
  const getIconInfo = (status: CoreSetTableItem.Status | MeasureStatus) => {
    switch (status) {
      default:
      case MeasureStatus.INCOMPLETE:
      case CoreSetTableItem.Status.NOT_STARTED:
        return {
          src: "/icons/status/icon_status_alert.svg",
          alt: "not started icon",
        };
      case CoreSetTableItem.Status.IN_PROGRESS:
        return {
          src: "/icons/status/icon_status_inprogress.svg",
          alt: "in progress icon",
        };
      case MeasureStatus.COMPLETE:
      case CoreSetTableItem.Status.COMPLETED:
      case CoreSetTableItem.Status.SUBMITTED:
        return {
          src: "/icons/status/icon_status_check.svg",
          alt: "complete icon",
        };
    }
  };

  const statusObject = getIconInfo(status);

  return (
    <Box minWidth="fit-content">
      <img src={statusObject.src} alt={statusObject.alt} />
    </Box>
  );
};
