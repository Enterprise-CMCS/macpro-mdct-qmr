import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import React from "react";

export interface RadioButtonOptionTest {
  id: string;
  displayValue: string;
  children?: JSX.Element[];
}

interface RadioButtonProps extends QMR.InputWrapperProps {
  value: string;
  options: RadioButtonOptionTest[];
  radioGroupProps?: CUI.RadioGroupProps;
  // These Three Props will be filled through the use of the register function of react-hook-form
  name: string;
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
}

export const RadioButtonTest = React.forwardRef<
  HTMLInputElement,
  RadioButtonProps
>(
  (
    {
      options,
      value,
      isInvalidFunc,
      radioGroupProps,
      name,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    let isInvalid = false;
    if (isInvalidFunc) {
      isInvalid = isInvalidFunc(value);
    }

    return (
      <QMR.InputWrapper isInvalid={isInvalid} {...rest}>
        <CUI.RadioGroup size="lg" {...radioGroupProps}>
          <CUI.Stack>
            {options.map((option) => {
              const isChecked = (
                document.querySelector(
                  `input[id="${option.id}"]`
                ) as HTMLInputElement
              )?.checked;

              const showChildren = isChecked;
              return (
                <CUI.Box key={option.displayValue}>
                  <CUI.Radio
                    id={option.id}
                    key={option.id}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                  >
                    <CUI.Text fontWeight="normal" fontSize="normal">
                      {option.displayValue}
                    </CUI.Text>
                  </CUI.Radio>
                  <CUI.Collapse in={showChildren} animateOpacity>
                    <QMR.QuestionChild show={!!option.children?.length}>
                      {option.children}
                    </QMR.QuestionChild>
                  </CUI.Collapse>
                </CUI.Box>
              );
            })}
          </CUI.Stack>
        </CUI.RadioGroup>
      </QMR.InputWrapper>
    );
  }
);
