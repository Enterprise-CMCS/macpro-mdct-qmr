import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { allNumbers } from "utils/numberInputMasks";
import { BsPercent } from "react-icons/bs";

interface NumberInputProps extends QMR.InputWrapperProps {
  placeholder?: string;
  numberInputProps?: CUI.InputProps;
  displayPercent?: boolean;
  name: string;
  mask?: RegExp;
  readonly?: boolean;
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
          id={name}
          data-cy={name}
          onChange={(v) =>
            mask.test(v.target.value) || !v.target.value
              ? field.onChange(v.target.value || "")
              : null
          }
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
