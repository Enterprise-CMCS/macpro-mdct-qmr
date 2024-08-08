import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useController, useFormContext } from "react-hook-form";
import objectPath from "object-path";
import { ControllerRules } from "global";

export interface RadioButtonOption {
  displayValue: string;
  value: string;
  children?: JSX.Element[];
  removable?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

interface RadioButtonProps extends QMR.InputWrapperProps, ControllerRules {
  options: RadioButtonOption[];
  radioGroupProps?: CUI.RadioGroupProps;
  name: string;
  subTextElement?: JSX.Element;
  valueAsArray?: boolean;
}

export const RadioButton = ({
  options,
  radioGroupProps,
  name,
  subTextElement,
  rules,
  valueAsArray,
  ...rest
}: RadioButtonProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules,
  });

  const path = objectPath.get(errors, name);

  return (
    <QMR.InputWrapper
      isInvalid={!!path?.message || path?.type === "required"}
      errorMessage={
        path?.message ||
        (path?.type === "required" && "This is a required field.")
      }
      {...rest}
    >
      <CUI.RadioGroup
        name={field.name}
        ref={field.ref}
        id={field.name + "_radiogroup"}
        size="lg"
        value={!!valueAsArray ? field.value?.[0] : field.value}
        onBlur={field.onBlur}
        onChange={(newValue) => {
          field.onChange(!!valueAsArray ? [newValue] : newValue);
        }}
        {...radioGroupProps}
      >
        {subTextElement}
        <CUI.Stack>
          {options.map((option, idx) => {
            const compVal = valueAsArray ? field.value?.[0] : field.value;
            const showChildren = option.value === compVal;
            return (
              <QMR.DeleteWrapper
                key={option.displayValue}
                allowDeletion={option.removable}
                onDelete={option.onDelete}
              >
                <CUI.Radio
                  value={option.value}
                  key={option.value}
                  onClick={option.onClick}
                  data-cy={name + idx}
                >
                  <CUI.Text
                    onClick={option.onClick}
                    fontWeight="normal"
                    fontSize="normal"
                    className="prince-option-label-text"
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
