import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

// This interface will be needed in other files to setup the RadioButtonOptions Array
export interface CheckboxOption {
  displayValue: string;
  value: string | number;
}

interface CheckboxProps extends QMR.InputWrapperProps {
  value: boolean;
  onChange: (nextValue: string) => void;
  options: CheckboxOption[];
  radioGroupProps?: CUI.RadioGroupProps;
}

export const Checkbox = ({
  options,
  value,
  onChange,
  isInvalidFunc,
  radioGroupProps,
  ...rest
}: CheckboxProps) => {
  let isInvalid = false;

  return (
    <QMR.InputWrapper isInvalid={isInvalid} {...rest}>
      <CUI.Stack>
        {options.map(({ displayValue, value }) => (
          <CUI.Radio value={value} key={value}>
            {displayValue}
          </CUI.Radio>
        ))}
      </CUI.Stack>
    </QMR.InputWrapper>
  );
};
