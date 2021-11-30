import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

// This interface will be needed in other files to setup the RadioButtonOptions Array
export interface CheckboxOption {
  displayValue: string;
  value: string | number;
  children?: JSX.Element[];
}

interface CheckboxProps extends QMR.InputWrapperProps {
  value: string[];
  onChange: (nextValue: any) => void;
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
      <CUI.CheckboxGroup value={value} onChange={onChange}>
        <CUI.Stack>
          {options.map((option) => {
            console.log(option.value, "space", value);
            const showChildren = !!value.find(
              (valueToCheck) => valueToCheck === option.value
            );
            return (
              <CUI.Box key={option.displayValue}>
                <CUI.Checkbox
                  size="lg"
                  value={option.value}
                  key={option.displayValue}
                >
                  <CUI.Text fontWeight="normal" fontSize="normal">
                    {option.displayValue}
                  </CUI.Text>
                </CUI.Checkbox>
                <CUI.Collapse in={showChildren} animateOpacity>
                  {option.children}
                  {/* <QMR.QuestionChild show={!!option.children?.length}>
                  {option.children}
                </QMR.QuestionChild> */}
                </CUI.Collapse>
              </CUI.Box>
            );
          })}
        </CUI.Stack>
      </CUI.CheckboxGroup>
    </QMR.InputWrapper>
  );
};
