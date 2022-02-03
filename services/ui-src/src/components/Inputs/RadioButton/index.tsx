import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";

export interface RadioButtonOption {
  displayValue: string;
  value: string | number;
  children?: JSX.Element[];
  removable?: boolean;
  onDelete?: () => void;
}

interface RadioButtonProps extends QMR.InputWrapperProps {
  options: RadioButtonOption[];
  radioGroupProps?: CUI.RadioGroupProps;
  name: string;
  testId?: string;
}

export const RadioButton = ({
  options,
  radioGroupProps,
  name,
  testId,
  ...rest
}: RadioButtonProps) => {
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
      <CUI.RadioGroup
        name={field.name}
        ref={field.ref}
        id={field.name + "_radiogroup"}
        size="lg"
        value={field.value}
        onBlur={field.onBlur}
        onChange={(newValue) => {
          field.onChange(newValue);
        }}
        {...radioGroupProps}
      >
        <CUI.Stack>
          {options.map((option, idx) => {
            const showChildren = option.value === field.value;
            return (
              <QMR.DeleteWrapper
                key={option.displayValue}
                allowDeletion={option.removable}
                onDelete={option.onDelete}
              >
                <CUI.Radio
                  value={option.value}
                  key={option.value}
                  data-cy={(testId || name) + idx}
                >
                  <CUI.Text
                    fontWeight="normal"
                    fontSize="normal"
                    id={field.name + "-" + (option.value + "").replace("/", "")}
                  >
                    {option.displayValue}
                  </CUI.Text>
                </CUI.Radio>
                <CUI.Collapse in={showChildren} animateOpacity>
                  {showChildren && (
                    <QMR.QuestionChild show={!!option.children?.length}>
                      {option.children}
                    </QMR.QuestionChild>
                  )}
                </CUI.Collapse>
              </QMR.DeleteWrapper>
            );
          })}
        </CUI.Stack>
      </CUI.RadioGroup>
    </QMR.InputWrapper>
  );
};
