import * as CUI from "@chakra-ui/react";
import { Notification } from "components";
import { CreateBanner } from "components/Banner/CreateBanner";
import { CurrentBanner } from "components/Banner/CurrentBanner";
import { useEffect, useState } from "react";
import { AdminBannerData, BannerData } from "types";
import { bannerId } from "utils";
import { useGetBanner, useWriteBanner, useDeleteBanner } from "hooks/api";

export const BANNER_ERRORS = {
  GET_BANNER_FAILED: "Banner could not be fetched. Please contact support.",
  DELETE_BANNER_FAILED:
    "Current banner could not be deleted. Please contact support.",
  REPLACE_BANNER_FAILED:
    "Current banner could not be replaced. Please contact support.",
};
export const AdminBannerView = () => {
  const [error, setError] = useState<string | undefined>();
  const [banner, setBanner] = useState<BannerData>();

  const getMutation = useGetBanner();
  const writeMutation = useWriteBanner();
  const deleteMutation = useDeleteBanner();

  const onSubmitHandler = (formData: any) => {
    const bannerData: AdminBannerData = {
      key: bannerId,
      title: formData.bannerTitle,
      description: formData.bannerDescription,
      link: formData.bannerLink,
      startDate: formData.startDateInMS,
      endDate: formData.endDateInMS,
    };
    writeMutation.mutate(bannerData, {
      onSuccess: () => {
        setBanner(bannerData);
      },
      onError: () => {
        setError(BANNER_ERRORS.REPLACE_BANNER_FAILED);
      },
    });
  };

  const onDeleteHandler = () => {
    deleteMutation.mutate(bannerId, {
      onSuccess: () => {
        setBanner(undefined);
      },
      onError: () => {
        setError(BANNER_ERRORS.DELETE_BANNER_FAILED);
      },
    });
  };

  const getBanner = () => {
    getMutation.mutate(bannerId, {
      onSuccess: async (response) => {
        if (/20\d/.test(response?.status)) {
          const bannerData = response.body?.Item as BannerData;
          setBanner(bannerData);
        } else if (/404/.test(response?.status)) {
          //DO NOTHING
        } else {
          setError(BANNER_ERRORS.GET_BANNER_FAILED);
        }
      },
      onError: (error) => {
        console.error("Unable to load banner", error);
      },
    });
  };

  const onErrorHandler = (errorMessage: string) => {
    setError(errorMessage);
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <CUI.Box sx={{ ...sx.pageBox, ...sx.pageFlex }} className="standard">
      <CUI.Flex sx={sx.contentFlex} className={`contentFlex standard`}>
        {error && (
          <Notification
            alertTitle="Banner Error"
            alertDescription={error}
            alertStatus="error"
          />
        )}
        <CUI.Box sx={sx.introTextBox}>
          <CUI.Text sx={sx.headerText}>Banner Admin</CUI.Text>
          <CUI.Text>Manage the announcement banner below.</CUI.Text>
        </CUI.Box>
        <CUI.Box sx={sx.currentBannerSectionBox}>
          <CUI.Text sx={sx.sectionHeader}>Current Banner</CUI.Text>
          <CurrentBanner
            bannerData={banner}
            sx={sx}
            onError={onErrorHandler}
            onDelete={onDeleteHandler}
          />
        </CUI.Box>
        <CreateBanner
          sx={sx}
          onSubmit={onSubmitHandler}
          onError={onErrorHandler}
        />
      </CUI.Flex>
    </CUI.Box>
  );
};

const sx = {
  pageBox: {
    "&.standard": {
      flexShrink: "0",
      paddingTop: "2rem",
    },
  },
  pageFlex: {
    flexDirection: "column",
    "&.standard": {
      maxWidth: "46rem",
      margin: "5.5rem auto 0",
      width: "100%",
    },
  },

  contentBox: {
    "&.standard": {
      flexShrink: "0",
    },
  },
  contentFlex: {
    flexDirection: "column",
    "&.standard": {
      maxWidth: "46rem",
      margin: "5.5rem auto 0",
    },
    padding: "0 2rem",
  },
  layout: {
    ".contentFlex": {
      marginTop: "3.5rem",
    },
  },
  errorAlert: {
    width: "100% !important",
    marginTop: "-4rem",
    marginBottom: "2rem",
  },
  introTextBox: {
    width: "100%",
    marginBottom: "2.25rem",
  },
  headerText: {
    marginBottom: "1rem",
    fontSize: "2rem",
    fontWeight: "normal",
  },
  currentBannerSectionBox: {
    width: "100%",
    marginBottom: "2.25rem",
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  currentBannerInfo: {
    flexDirection: "column",
    marginBottom: "0.5rem !important",
  },
  currentBannerStatus: {
    span: {
      marginLeft: "0.5rem",
      "&.active": {
        color: "green",
      },
      "&.inactive": {
        color: "red",
      },
    },
  },
  currentBannerDate: {
    span: {
      marginLeft: "0.5rem",
    },
  },
  currentBannerFlex: {
    flexDirection: "column",
  },
  spinnerContainer: {
    marginTop: "0.5rem",
    ".ds-c-spinner": {
      "&:before": {
        borderColor: "black",
      },
      "&:after": {
        borderLeftColor: "black",
      },
    },
  },
  deleteBannerButton: {
    width: "13.3rem",
    alignSelf: "end",
    marginTop: "1rem !important",
  },
  newBannerBox: {
    width: "100%",
    flexDirection: "column",
    marginBottom: "2.25rem",
  },
};
