import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { RateChild, IRateChild } from "components/Rate/RateChild";
import { InputWrapperProps } from "components/InputWrapper";

interface RateProps extends InputWrapperProps {
  rateDataValue: IRate;
  updateRateData: React.Dispatch<React.SetStateAction<IRate | undefined>>;
}
export interface IRate {
  rateDescriptionValue: string;
  rateChildren: IRateChild[];
}

export function Rate({
  rateDataValue,
  updateRateData,
  label,
  helperText,
  errorMessage,
  isInvalidFunc,
}: RateProps): JSX.Element {
  const setRateChildrenValue = (child: IRateChild) => {
    const rateChildren = [...rateDataValue.rateChildren];
    rateChildren[child.id] = { ...child };

    updateRateData({
      ...rateDataValue,
      rateChildren,
    });
  };

  const setRateDescriptionRow = (rateChild: IRateChild) => {};

  const rowsToGenerate = (): any => {
    const rowsToReturn = rateDataValue.rateNumeric.map((r, index) => (
      <RateChild
        numerator={r.numerator}
        denominator={r.denominator}
        rate={r.rate}
        id={index}
        setRateChildValues={() => setRateChildValues(index)}
      />
    ));

    return rowsToReturn;
  };

  return (
    <CUI.Stack spacing="6">
      <Inputs.TextInput
        value={rateDataValue.rateDescriptionValue}
        renderHelperTextAbove={true}
        onBlur={(e) => setRateDescriptionRow(e.target.value)}
        label={label}
        helperText={helperText}
        errorMessage={errorMessage}
        formLabelProps={{ fontWeight: 600 }}
        isInvalidFunc={isInvalidFunc}
      />
      {rowsToGenerate()}
      <CUI.Button
        onClick={addNewRateRow}
        w="25%"
        colorScheme="blue"
        variant="outline"
      >
        + Add Another
      </CUI.Button>
    </CUI.Stack>
  );
}
