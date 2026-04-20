import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export interface Props {
  label: string;
  children: any;
  testid?: string;
}

export const CoreQuestionWrapper = ({ label, children, testid }: Props) => {
  const { measureId } = useParams();

  const outOfScopeMeasures = [
    "SS-1-HH",
    "SS-2-HH",
    "SS-3-HH",
    "SS-4-HH",
    "SS-5-HH",
    "CPA-AD",
    "MSC-AD",
    "PCR-AD",
    "PRC-HH",
  ];

  const boxSpacingProps =
    measureId && outOfScopeMeasures.includes(measureId)
      ? { my: 4 }
      : { mt: 8, mb: 6 };

  return (
    <CUI.Box {...boxSpacingProps}>
      <CUI.FormLabel
        fontWeight="bold"
        data-testid={testid}
        fontSize="lg"
        data-cy={label}
        as="h2"
      >
        {label}
      </CUI.FormLabel>
      <fieldset>{children}</fieldset>
    </CUI.Box>
  );
};
