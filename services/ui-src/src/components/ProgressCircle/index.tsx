import * as CUI from "@chakra-ui/react";

interface IProgressCircleProps {
  currentProgress: number;
  maxValue: number;
}

export const ProgressCircle = ({
  currentProgress,
  maxValue,
}: IProgressCircleProps) => {
  return (
    <CUI.CircularProgress
      aria-label="Circular Progress "
      color="green.600"
      size="8rem"
      value={(currentProgress / maxValue) * 100}
    >
      <CUI.CircularProgressLabel fontSize="1.5rem">{`${currentProgress} of ${maxValue}`}</CUI.CircularProgressLabel>
    </CUI.CircularProgress>
  );
};
