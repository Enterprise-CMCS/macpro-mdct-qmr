import * as CUI from "@chakra-ui/react";
import { CreateBannerForm } from "./CreateBannerForm";

export const CreateBanner = (sx: any) => {
  return (
    <>
      <CUI.Box sx={{ ...sx.contentBox, ...sx.layout }} className="standard">
        <CUI.Flex sx={sx.contentFlex} className="contentFlex standard">
          <CUI.Flex sx={sx.newBannerBox}>
            <CUI.Text sx={sx.sectionHeader}>Create a New Banner</CUI.Text>
            <CreateBannerForm />
          </CUI.Flex>
        </CUI.Flex>
      </CUI.Box>
    </>
  );
};
