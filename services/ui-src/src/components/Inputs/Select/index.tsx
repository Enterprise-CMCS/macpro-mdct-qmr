import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { TiArrowUnsorted } from "react-icons/ti";
import { Control, FieldValues, useController } from "react-hook-form";

export interface SelectOption {
  displayValue: string;
  value: string | number;
}

interface SelectProps extends QMR.InputWrapperProps {
  selectProps?: CUI.SelectProps;
  placeholder?: string;
  options: SelectOption[];
  name: string;
  control: Control<FieldValues, object>;
}

export const Select = ({
  selectProps,
  placeholder,
  options,
  isInvalidFunc,
  name,
  control,
  ...rest
}: SelectProps) => {
  const { field } = useController({
    name,
    control,
  });

  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(field.value);
  }

  return (
    <QMR.InputWrapper {...rest} isInvalid={isInvalid}>
      <CUI.Select
        ref={field.ref}
        value={field.value}
        onBlur={field.onBlur}
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...selectProps}
        placeholder={placeholder}
        isInvalid={isInvalid}
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
