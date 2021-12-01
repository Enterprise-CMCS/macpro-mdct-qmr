import * as CUI from "@chakra-ui/react";

interface IProgressCircleProps {
  currentProgress: number;
  maxValue: number;
  circularProgressProps?: CUI.CircularProgressProps;
  circularProgressLabelProps?: CUI.CircularProgressLabelProps;
}

export const ProgressCircle = ({
  currentProgress,
  maxValue,
  circularProgressProps,
  circularProgressLabelProps,
}: IProgressCircleProps) => {
  return (
    <CUI.CircularProgress
      aria-label="Circular Progress Bar"
      {...circularProgressProps}
      value={(currentProgress / maxValue) * 100}
    >
      <CUI.CircularProgressLabel
        aria-label="Current Progress"
        {...circularProgressLabelProps}
      >{`${currentProgress} of ${maxValue}`}</CUI.CircularProgressLabel>
    </CUI.CircularProgress>
  );
};
