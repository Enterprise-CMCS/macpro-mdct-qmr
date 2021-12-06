import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { TiArrowUnsorted } from "react-icons/ti";
import { Control, useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

export interface SelectOption {
  displayValue: string;
  value: string | number;
}

interface SelectProps extends QMR.InputWrapperProps {
  selectProps?: CUI.SelectProps;
  placeholder?: string;
  options: SelectOption[];
  name: string;
  control: Control<any, object>;
}

export const Select = ({
  selectProps,
  placeholder,
  options,
  name,
  control,
  ...rest
}: SelectProps) => {
  const { field } = useController({
    name,
    control,
  });

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <QMR.InputWrapper
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.Select
        ref={field.ref}
        value={field.value}
        onBlur={field.onBlur}
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...selectProps}
        placeholder={placeholder}
        // isInvalid={isInvalid}
        icon={<TiArrowUnsorted />}
      >
        {options.map(({ displayValue, value }) => (
          <option value={value} key={value}>
            {displayValue}
          </option>
        ))}
      </CUI.Select>
    </QMR.InputWrapper>
  );
};
