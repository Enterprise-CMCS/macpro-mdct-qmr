import * as CUI from "@chakra-ui/react";
import * as Inputs from "components/Inputs";
import { RateChild, IRateChild } from "components/Rate/RateChild";
import { InputWrapperProps } from "components/InputWrapper";

interface RateProps extends InputWrapperProps {
  rateDataValue: IRate;
  updateRateData: () => void;
}
export interface IRate {
  rateDescriptionValue: string;
  rateNumeric: IRateChild[]
}

export function Rate({ rateDataValue, updateRateData, ...rest }: RateProps): JSX.Element {

  useEffect(() => {
    rowsToGenerate();
  });

  const setRateDescriptionRow = (value: string): void => {
    // update the rateDescriptValue in the object here
    updateRateData()
  };

  const rowsToGenerate = (): any => {

    const rowsToReturn = rateDataValue.rateNumeric.map((r,index) =>
      <RateChild 
        numerator={r.numerator} 
        denominator= {r.denominator} 
        rate = {r.rate}
        id = {index}
        setRateChildValues = {()=> setRateChildValues(rateChildValues)}
        />
    );

    return rowsToReturn;
  };

  return (
    <CUI.Stack spacing="6">
      <Inputs.TextInput
        value={rateDataValue.rateDescriptionValue}
        renderHelperTextAbove={true}
        onBlur={(e) => setRateDescriptionRow(e.target.value)}
        {...rest}
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
