//import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { CreateBanner } from "components/Banner/CreateBanner";
import { CurrentBanner } from "components/Banner/CurrentBanner";

export const AdminBannerView = () => {
  return (
    <CUI.Box sx={{ ...sx.contentBox, ...sx.layout }} className="standard">
      <CUI.Flex sx={sx.contentFlex} className="contentFlex standard">
        TODO ERROR
        <CUI.Box sx={sx.introTextBox}>
          <CUI.Heading
            as="h1"
            id="AdminHeader"
            tabIndex={-1}
            sx={sx.headerText}
          >
            Banner Admin
          </CUI.Heading>
          <CUI.Text>Manage the announcement banner below.</CUI.Text>
          <CUI.Flex sx={sx.contentFlex}></CUI.Flex>
        </CUI.Box>
      </CUI.Flex>
      <CurrentBanner />
      <CreateBanner sx={sx} />
    </CUI.Box>
  );
};

const sx = {
  contentBox: {
    "&.standard": {
      flexShrink: "0",
    },
    "&.report": {
      height: "100%",
    },
  },
  contentFlex: {
    flexDirection: "column",
    "&.standard": {
      maxWidth: "basicPageWidth",
      margin: "5.5rem auto 0",
    },
    "&.report": {
      height: "100%",
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
        color: "palette.success",
      },
      "&.inactive": {
        color: "palette.error",
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
        borderColor: "palette.black",
      },
      "&:after": {
        borderLeftColor: "palette.black",
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
