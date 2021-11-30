import * as CUI from "@chakra-ui/react";

interface IProgressButtonProps {
  currentProgress: number;
  maxValue: number;
}

export const ProgressButton = ({
  currentProgress,
  maxValue,
}: IProgressButtonProps) => {
  return (
    <CUI.CircularProgress
      color="green.600"
      size="8rem"
      value={(currentProgress / maxValue) * 100}
    >
      <CUI.CircularProgressLabel fontSize="1.5rem">{`${currentProgress} of ${maxValue}`}</CUI.CircularProgressLabel>
    </CUI.CircularProgress>
  );
};
