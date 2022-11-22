import { useState } from "react";
import { useForm } from "react-hook-form";
import * as CUI from "@chakra-ui/react";
import { bannerId } from "utils/constants";
import { PreviewBanner } from "./PreviewBanner";
import { useWriteBanner } from "hooks/api";

export const CreateBannerForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const mutation = useWriteBanner();

  //const [data, setData] = useState("");
  const submitBanner = (formData: any) => {
    setSubmitting(true);
    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("wrote banner");
      },
      onError: (error) => {
        console.error(error);
      },
    });
    setSubmitting(false);
  };

  return (
    <form id={bannerId} onSubmit={handleSubmit(submitBanner)}>
      <CUI.Stack spacing="4" maxW="lg" py="4">
        <CUI.Stack spacing="1">
          <CUI.Text fontSize="sm" as="b">
            Title text
          </CUI.Text>
          <CUI.Input
            {...register("bannerTitle")}
            placeholder="New banner title"
            isRequired
          />
        </CUI.Stack>
        <CUI.Stack spacing="1">
          <CUI.Text fontSize="sm" as="b">
            Description text
          </CUI.Text>
          <CUI.Textarea
            {...register("bannerDescription")}
            placeholder="New banner description"
            isRequired
          />
          <CUI.Text fontSize="sm" as="b">
            Link
          </CUI.Text>
          <CUI.Text fontSize="sm" as="i">
            Optional
          </CUI.Text>
          <CUI.Input {...register("bannerLink")} />
          <CUI.Text fontSize="sm" as="b">
            Start Date
          </CUI.Text>
          <CUI.Text fontSize="sm">MM/DD/YYYY</CUI.Text>
          <CUI.Input {...register("bannerStartDate")} maxW="3xs" />
          <CUI.Text fontSize="sm" as="b">
            End Date
          </CUI.Text>
          <CUI.Text fontSize="sm">MM/DD/YYYY</CUI.Text>
          <CUI.Input {...register("bannerEndDate")} maxW="3xs" />
          <CUI.Flex sx={sx.previewFlex}>
            <PreviewBanner
              watched={watch([
                "bannerTitle",
                "bannerDescription",
                "bannerLink",
              ])}
            />
            <CUI.Button
              form={bannerId}
              type="submit"
              sx={sx.replaceBannerButton}
            >
              {submitting ? (
                <CUI.Spinner size="small" />
              ) : (
                "Replace Current Banner"
              )}
            </CUI.Button>
          </CUI.Flex>
        </CUI.Stack>
      </CUI.Stack>
    </form>
  );
};
const sx = {
  errorAlert: {
    maxWidth: "40rem",
  },
  previewFlex: {
    flexDirection: "column",
  },
  replaceBannerButton: {
    width: "14rem",
    marginTop: "1rem !important",
    alignSelf: "end",
  },
};
