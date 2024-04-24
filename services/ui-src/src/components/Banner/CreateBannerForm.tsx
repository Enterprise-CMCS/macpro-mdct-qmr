import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { convertDatetimeStringToNumber } from "utils";
import { bannerId } from "utils/constants";
import { Spinner, Button, Alert } from "@cmsgov/design-system";
import { TextField } from "./FormElements/TextField";
import { PreviewBanner } from "./PreviewBanner";
import { DateField } from "./FormElements/DateField";

const BANNER_FIELDS = {
  title: "bannerTitle",
  description: "bannerDescription",
  link: "bannerLink",
  startDate: "bannerStartDate",
  endDate: "bannerEndDate",
};

const FORM_ERRORS = {
  INVALID_START_DATE: "Invalid Start Date",
  INVALID_END_DATE: "Invalid End Date",
  DATE_MISMATCH: "End Date cannot be before Start Date",
};
export const CreateBannerForm = ({ writeAdminBanner, ...props }: Props) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm({
    shouldFocusError: false,
    mode: "onChange",
  });

  const onSubmit = (formData: any) => {
    setSubmitting(true);
    let startDateInMS = convertDatetimeStringToNumber(
      formData[BANNER_FIELDS.startDate],
      "startDate"
    );
    if (!startDateInMS) {
      setError(FORM_ERRORS.INVALID_START_DATE);
    } else {
      let endDateInMS = convertDatetimeStringToNumber(
        formData[BANNER_FIELDS.endDate],
        "endDate"
      );
      if (!endDateInMS) {
        setError(FORM_ERRORS.INVALID_END_DATE);
      } else if (startDateInMS > endDateInMS) {
        setError(FORM_ERRORS.DATE_MISMATCH);
      } else {
        setError("");
        writeAdminBanner({ ...formData, startDateInMS, endDateInMS });
      }
    }
    window.scrollTo(0, 0);
    setSubmitting(false);
  };
  return (
    <>
      {error && (
        <Alert heading="Banner Creation Error" variation="error">
          <p className="ds-c-alert__text">{error}</p>
        </Alert>
      )}
      <FormProvider {...form}>
        <form id={bannerId} onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <TextField
            label="Title Text"
            name={BANNER_FIELDS.title}
            placeholder="New banner title"
            data-cy="New banner title"
            required
          />
          <TextField
            label="Description text"
            name={BANNER_FIELDS.description}
            placeholder="New banner description"
            data-cy="New banner description"
            multiline
            required
          />
          <TextField
            label="Link"
            name={BANNER_FIELDS.link}
            data-cy="New banner link"
            requirementLabel="Optional"
          />
          <DateField
            label="Start Date"
            name={BANNER_FIELDS.startDate}
            errorMessageOverride={FORM_ERRORS.INVALID_START_DATE}
            data-cy="New banner start date"
            required
          />
          <DateField
            label="End Date"
            name={BANNER_FIELDS.endDate}
            errorMessageOverride={FORM_ERRORS.INVALID_END_DATE}
            data-cy="New banner end date"
            required
          />
        </form>
        <PreviewBanner />
      </FormProvider>
      <div className="ds-u-padding-top--2 .ds-u-float--right">
        <Button
          form={bannerId}
          type="submit"
          data-cy="replace current banner button"
        >
          {submitting ? <Spinner size="small" /> : "Replace Current Banner"}
        </Button>
      </div>
    </>
  );
};
interface Props {
  writeAdminBanner: Function;
  [key: string]: any;
}
