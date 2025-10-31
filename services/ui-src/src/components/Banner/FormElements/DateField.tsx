import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SingleInputDateField as CmsdsDateField } from "@cmsgov/design-system";
import { checkDateCompleteness } from "utils";

export const DateField = ({
  name,
  label,
  errorMessageOverride,
  ...props
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [displayValue, setDisplayValue] = useState<string>("");
  // get form context and register field
  const form = useFormContext();
  form.register(name);

  // update field display value and form field data on change
  const onChangeHandler = (rawValue: string, maskedValue: string) => {
    setDisplayValue(rawValue);
    const isValidDate = checkDateCompleteness(maskedValue);
    if (isValidDate || maskedValue === "") {
      form.setValue(name, maskedValue, { shouldValidate: true });
    }
  };

  // update form field data on blur
  const onBlurHandler = (event: InputChangeEvent) => {
    const fieldValue = event.target.value;
    const isValidDate = checkDateCompleteness(fieldValue);
    setErrorMessage(
      isValidDate || fieldValue === "" ? "" : errorMessageOverride
    );
  };

  return (
    <CmsdsDateField
      id={name}
      name={name}
      label={label || ""}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      errorMessage={errorMessage}
      value={displayValue}
      {...props}
    />
  );
};
interface Props {
  name: string;
  label: string;
  errorMessageOverride: string;
  [key: string]: any;
}
interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
