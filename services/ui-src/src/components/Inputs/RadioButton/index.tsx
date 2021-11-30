import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

// This interface will be needed in other files to setup the RadioButtonOptions Array
export interface RadioButtonOption {
  displayValue: string;
  value: string | number;
}

interface RadioButtonProps extends QMR.InputWrapperProps {
  value: string;
  onChange: (nextValue: string) => void;
  options: RadioButtonOption[];
  radioGroupProps?: CUI.RadioGroupProps;
}

export const RadioButton = ({
  options,
  value,
  onChange,
  isInvalidFunc,
  radioGroupProps,
  ...rest
}: RadioButtonProps) => {
  let isInvalid = false;
  if (isInvalidFunc) {
    isInvalid = isInvalidFunc(value);
  }

  return (
    <QMR.InputWrapper isInvalid={isInvalid} {...rest}>
      <CUI.RadioGroup
        size="lg"
        value={value}
        onChange={onChange}
        {...radioGroupProps}
      >
        <CUI.Stack>
          {options.map(({ displayValue, value }) => (
            <CUI.Radio value={value} key={value}>
              {displayValue}
            </CUI.Radio>
          ))}
        </CUI.Stack>
      </CUI.RadioGroup>
    </QMR.InputWrapper>
  );
};
