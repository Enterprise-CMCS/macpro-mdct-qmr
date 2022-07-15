import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { TiArrowUnsorted } from "react-icons/ti";
import { useController, useFormContext } from "react-hook-form";
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
}

export const Select = ({
  selectProps,
  placeholder,
  options,
  name,
  ...rest
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  return (
    <QMR.InputWrapper
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      {...rest}
    >
      <CUI.Select
        ref={field.ref}
        className={name}
        value={field?.value}
        defaultValue={field?.value ?? placeholder}
        onBlur={field.onBlur}
        borderRadius="sm"
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...selectProps}
        placeholder={placeholder}
        isInvalid={!!objectPath.get(errors, name)?.message}
        icon={<TiArrowUnsorted />}
        data-cy={name}
      >
        {options.map(({ displayValue, value }) => (
          <option value={value} key={value} data-cy={`${name}-${value}`}>
            {displayValue}
          </option>
        ))}
      </CUI.Select>
    </QMR.InputWrapper>
  );
};
