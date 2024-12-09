import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextField as CmsdsTextField } from "@cmsgov/design-system";

export const TextField = ({
  name,
  label,
  hint,
  placeholder,
  sxOverride,
  nested,
  ...props
}: Props) => {
  const [displayValue, setDisplayValue] = useState<string>("");
  // get form context and register field
  const form = useFormContext();
  form.register(name);

  // update display value and form field data on change
  const onChangeHandler = async (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setDisplayValue(value);
    form.setValue(name, value, { shouldValidate: true });
  };

  // prepare error message, hint, and classes
  const formErrorState = form?.formState?.errors;
  const errorMessage = formErrorState?.[name]?.message;

  return (
    <CmsdsTextField
      id={name}
      name={name}
      label={label || ""}
      placeholder={placeholder}
      onChange={(e) => onChangeHandler(e)}
      errorMessage={errorMessage as React.ReactNode}
      value={displayValue}
      {...props}
    />
  );
};
interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  nested?: boolean;
  [key: string]: any;
  children?: React.ReactNode;
}
interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
