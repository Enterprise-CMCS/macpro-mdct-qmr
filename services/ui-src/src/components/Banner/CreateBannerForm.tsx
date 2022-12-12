import { useForm } from "react-hook-form";
import * as CUI from "@chakra-ui/react";
import { bannerId } from "utils/constants";
import { PreviewBanner } from "./PreviewBanner";
import { useState } from "react";
import { convertDatetimeStringToNumber } from "utils";

const FORM_ERRORS = {
  INVALID_START_DATE: "Invalid Start Date",
  INVALID_END_DATE: "Invalid End Date",
  DATE_MISMATCH: "End Date cannot be before Start Date",
};

export const CreateBannerForm = (props: any) => {
  const { register, handleSubmit, watch, reset } = useForm();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");

  const onSubmit = (formData: any) => {
    setSubmitting(true);
    let startDateInMS = convertDatetimeStringToNumber(
      formData["bannerStartDate"],
      "startDate"
    );
    if (!startDateInMS) {
      setStartDateError(FORM_ERRORS.INVALID_START_DATE);
    } else {
      let endDateInMS = convertDatetimeStringToNumber(
        formData["bannerEndDate"],
        "endDate"
      );
      if (!endDateInMS) {
        setEndDateError(FORM_ERRORS.INVALID_END_DATE);
        return;
      } else if (startDateInMS > endDateInMS) {
        setEndDateError(FORM_ERRORS.DATE_MISMATCH);
        return;
      } else {
        props.onSubmit({ ...formData, startDateInMS, endDateInMS });
        reset();
      }
    }
    setSubmitting(false);
  };

  const validateStartDate = (event: any) => {
    setStartDateError(
      event.target.value === "" ||
        /[01][0-9]\/[0-3][0-9]\/20\d\d/.test(event.target.value)
        ? ""
        : FORM_ERRORS.INVALID_START_DATE
    );
  };
  const validateEndDate = (event: any) => {
    setEndDateError(
      event.target.value === "" ||
        /[01][0-9]\/[0-3][0-9]\/20\d\d/.test(event.target.value)
        ? ""
        : FORM_ERRORS.INVALID_END_DATE
    );
  };

  return (
    <form id={bannerId} onSubmit={handleSubmit(onSubmit)} {...props}>
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
          <CUI.FormControl isInvalid={startDateError !== ""}>
            <CUI.Text fontSize="sm" as="b">
              Start Date
            </CUI.Text>
            <CUI.Text fontSize="sm">MM/DD/YYYY</CUI.Text>
            <CUI.Input
              {...register("bannerStartDate")}
              maxW="3xs"
              isRequired
              onBlur={validateStartDate}
            />
            <CUI.FormErrorMessage>{startDateError}</CUI.FormErrorMessage>
          </CUI.FormControl>
          <CUI.FormControl isInvalid={endDateError !== ""}>
            <CUI.Text fontSize="sm" as="b">
              End Date
            </CUI.Text>
            <CUI.Text fontSize="sm">MM/DD/YYYY</CUI.Text>
            <CUI.Input
              {...register("bannerEndDate")}
              maxW="3xs"
              isRequired
              onBlur={validateEndDate}
            />
            <CUI.FormErrorMessage>{endDateError}</CUI.FormErrorMessage>
          </CUI.FormControl>
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
