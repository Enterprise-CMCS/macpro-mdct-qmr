import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { ComponentProps } from "react";

// Chakra UI v2 Collapse types are incompatible with React 19
const Collapse = CUI.Collapse as React.FC<
  ComponentProps<typeof CUI.Collapse> & { children?: React.ReactNode }
>;

export interface CheckboxOption {
  displayValue?: string;
  value: string | number;
  children?: JSX.Element[];
  removable?: boolean;
  onDelete?: () => void;
  childKey?: string;
}

interface CheckboxProps extends QMR.InputWrapperProps {
  options: CheckboxOption[];
  checkboxGroupProps?: CUI.CheckboxGroupProps;
  name: string;
}

export const Checkbox = ({
  options,
  checkboxGroupProps,
  name,
  ...rest
}: CheckboxProps) => {
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
      <CUI.CheckboxGroup
        size="lg"
        value={field.value}
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...checkboxGroupProps}
      >
        <CUI.Stack>
          {options.map((option, idx) => {
            const showChildren = !!field.value?.find(
              (valueToCheck: string) => valueToCheck === option.value
            );

            return (
              <QMR.DeleteWrapper
                key={option.childKey ?? option.value}
                allowDeletion={option.removable}
                onDelete={option.onDelete}
              >
                <CUI.Checkbox
                  value={option.value}
                  id={name + idx + "-checkbox"}
                  data-cy={name + idx}
                >
                  <CUI.Text
                    fontWeight="normal"
                    fontSize="normal"
                    className="prince-option-label-text"
                  >
                    {option.displayValue}
                  </CUI.Text>
                </CUI.Checkbox>
                <Collapse in={showChildren} animateOpacity>
                  {showChildren && (
                    <QMR.QuestionChild show={!!option.children?.length}>
                      {option.children}
                    </QMR.QuestionChild>
                  )}
                </Collapse>
              </QMR.DeleteWrapper>
            );
          })}
        </CUI.Stack>
      </CUI.CheckboxGroup>
    </QMR.InputWrapper>
  );
};
