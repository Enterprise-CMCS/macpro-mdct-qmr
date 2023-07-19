import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { allNumbers } from "utils";
import { BsPercent } from "react-icons/bs";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  name: string;
  mask?: RegExp;
  readonly?: boolean;
  onChange?: Function;
}

export const NumberInput = ({
  numberInputProps,
  placeholder,
  displayPercent,
  name,
  formControlProps,
  readonly,
  mask = allNumbers,
  ariaLabel = name,
  onChange,
  ...rest
}: NumberInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  //expanding onChange to allow the parent to access the event information
  const change = (v: any) => {
    onChange?.(v);

    return mask.test(v.target.value) || !v.target.value
      ? field.onChange(v.target.value || "")
      : null;
  };

  return (
    <QMR.InputWrapper
      isInvalid={!!objectPath.get(errors, name)?.message}
      errorMessage={objectPath.get(errors, name)?.message}
      formControlProps={formControlProps}
      {...rest}
    >
      <CUI.InputGroup>
        <CUI.Input
          isReadOnly={readonly}
          placeholder={placeholder ?? ""}
          value={field.value ?? ""}
          name={name}
          data-cy={name}
          onChange={change}
          data-testid="test-number-input"
          onBlur={field.onBlur}
          ref={field.ref}
          type="text"
          aria-label={ariaLabel}
          {...numberInputProps}
        />
        {displayPercent && (
          <CUI.InputRightElement
            pointerEvents="none"
            children={<BsPercent />}
          />
        )}
      </CUI.InputGroup>
    </QMR.InputWrapper>
  );
};
