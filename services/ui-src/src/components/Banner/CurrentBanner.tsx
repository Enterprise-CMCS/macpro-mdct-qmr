import { Banner } from "./Banner";
import * as CUI from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BannerData } from "types";
import { checkDateRangeStatus, convertDateUtcToEt } from "utils";

export const CurrentBanner = ({
  bannerData,
  sx,
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
    setDeleting(false);
  };

  return (
    <CUI.Flex sx={sx.currentBannerFlex}>
      {bannerData && (
        <>
          <CUI.Text sx={sx.currentBannerStatus}>
            Status:{" "}
            <span className={isBannerActive ? "active" : "inactive"}>
              {isBannerActive ? "Active" : "Inactive"}
            </span>
          </CUI.Text>
          <CUI.Text sx={sx.currentBannerDate}>
            Start Date: <span>{convertDateUtcToEt(bannerData?.startDate)}</span>
          </CUI.Text>
          <CUI.Text sx={sx.currentBannerDate}>
            End Date: <span>{convertDateUtcToEt(bannerData?.endDate)}</span>
          </CUI.Text>
          <Banner bannerData={bannerData} {...props} />
          <CUI.Button sx={sx.deleteBannerButton} onClick={deleteBanner}>
            {deleting ? <CUI.Spinner size="small" /> : "Delete Current Banner"}
          </CUI.Button>
        </>
      )}
      {!bannerData && <CUI.Text>There is no current banner</CUI.Text>}
    </CUI.Flex>
  );
};
interface Props {
  bannerData: BannerData | undefined;
  sx: any;
  onDelete: () => void;
  [key: string]: any;
}
