import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { Control, FieldValues, useController } from "react-hook-form";

export interface CheckboxOption {
  displayValue: string;
  value: string | number;
  children?: JSX.Element[];
}

interface CheckboxProps extends QMR.InputWrapperProps {
  options: CheckboxOption[];
  checkboxGroupProps?: CUI.CheckboxGroupProps;
  name: string;
  control: Control<FieldValues, object>;
}

export const Checkbox = ({
  options,
  checkboxGroupProps,
  name,
  control,
  ...rest
}: CheckboxProps) => {
  const { field } = useController({
    name,
    control,
  });

  let isInvalid = false;

  return (
    <QMR.InputWrapper isInvalid={isInvalid} {...rest}>
      <CUI.CheckboxGroup
        size="lg"
        value={field.value}
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...checkboxGroupProps}
      >
        <CUI.Stack>
          {options.map((option) => {
            const showChildren = !!field.value?.find(
              (valueToCheck: string) => valueToCheck === option.value
            );

            return (
              <CUI.Box key={option.displayValue}>
                <CUI.Checkbox value={option.value}>
                  <CUI.Text fontWeight="normal" fontSize="normal">
                    {option.displayValue}
                  </CUI.Text>
                </CUI.Checkbox>
                <CUI.Collapse in={showChildren} animateOpacity>
                  <QMR.QuestionChild show={!!option.children?.length}>
                    {option.children}
                  </QMR.QuestionChild>
                </CUI.Collapse>
              </CUI.Box>
            );
          })}
        </CUI.Stack>
      </CUI.CheckboxGroup>
    </QMR.InputWrapper>
  );
};
