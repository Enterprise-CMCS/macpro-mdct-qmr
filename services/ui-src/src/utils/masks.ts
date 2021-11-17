// this is the mask for the number input component
export const decimalMask = (inputValue: String): string => {
  // The max number of decimal places to display for this component
  // We got this information from Stephanie
  const numberOfDecimals: number = 5;
  let displayValue: number = +inputValue;
  displayValue = displayValue * Math.pow(10, numberOfDecimals);
  displayValue = Math.floor(displayValue) / Math.pow(10, numberOfDecimals);
  return `${displayValue}`;
};
