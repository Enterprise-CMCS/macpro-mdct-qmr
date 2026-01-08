import { Box, Image } from "@chakra-ui/react";
import { CoreSetTableItem } from "components/Table/types";
import successIcon from "assets/icons/status/icon_status_check.svg";
import notStartedIcon from "assets/icons/status/icon_status_alert.svg";
import inProgressIcon from "assets/icons/status/icon_status_inprogress.svg";
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
          src: notStartedIcon,
          alt: "not started icon",
          text: "Not started",
          textColor: "palette.error_darker",
        };
      case CoreSetTableItem.Status.IN_PROGRESS:
        return {
          src: inProgressIcon,
          alt: "in progress icon",
          text: "In progress",
          textColor: "palette.primary",
        };
      case MeasureStatus.COMPLETE:
      case CoreSetTableItem.Status.COMPLETED:
      case CoreSetTableItem.Status.SUBMITTED:
        return {
          src: successIcon,
          alt: "complete icon",
          text: "Complete",
          textColor: "palette.success",
        };
    }
  };

  const statusObject = getStatus(status);

  return (
    <Box minWidth="fit-content">
      <Image src={statusObject.src} alt={statusObject.alt}></Image>
    </Box>
  );
};
