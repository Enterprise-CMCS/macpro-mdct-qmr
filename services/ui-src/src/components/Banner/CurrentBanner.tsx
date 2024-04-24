import { Banner } from "./Banner";
import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BannerData } from "types";
import { checkDateRangeStatus, convertDateUtcToEt } from "utils";
import { Spinner, Button } from "@cmsgov/design-system";

export const CurrentBanner = ({
  bannerData,
  onDelete: onDeleteHandler,
  ...props
}: Props) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isBannerActive, setIsBannerActive] = useState<boolean>(false);
  useEffect(() => {
    let bannerActivity = false;
    if (bannerData) {
      bannerActivity = checkDateRangeStatus(
        bannerData.startDate,
        bannerData.endDate
      );
    }
    setIsBannerActive(bannerActivity);
  }, [bannerData]);

  const deleteBanner = async () => {
    setDeleting(true);
    onDeleteHandler();
    bannerData = undefined;
    setDeleting(false);
  };

  return (
    <div className="ds-l-row">
      <div className="ds-l-col">
        {bannerData && (
          <Box sx={sx.currentBanner} data-cy="active banner">
            <Text>
              Status:{" "}
              <span
                className={isBannerActive ? "active" : "inactive"}
                data-cy="banner status"
              >
                {isBannerActive ? "Active" : "Inactive"}
              </span>
            </Text>
            <Text>
              Start Date:{" "}
              <span>{convertDateUtcToEt(bannerData?.startDate)}</span>
            </Text>
            <Text>
              End Date: <span>{convertDateUtcToEt(bannerData?.endDate)}</span>
            </Text>

            <div className="ds-u-padding-top--2 ds-u-padding-bottom--2">
              <Banner bannerData={bannerData} {...props} />
            </div>

            <Button onClick={deleteBanner} variation="solid">
              {deleting ? <Spinner size="small" /> : "Delete Current Banner"}
            </Button>
          </Box>
        )}
        {!bannerData && <Text>There is no current banner</Text>}
      </div>
    </div>
  );
};
interface Props {
  bannerData: BannerData | undefined;
  onDelete: () => void;
  [key: string]: any;
}

const sx = {
  currentBanner: {
    marginLeft: "0.5rem",
    span: {
      textAlign: "right",
      "&.active": {
        color: "#12890e", //$color-success
      },
      "&.inactive": {
        color: "#e31c3d", //$color-error
      },
    },
  },
};
