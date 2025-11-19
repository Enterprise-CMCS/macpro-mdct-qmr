import * as QMR from "components";
import { useFormContext } from "react-hook-form";
import { WhyDidYouNotCollect } from ".";
import { FormData } from "../types";
import * as DC from "dataConstants";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
}

export const Reporting = ({ reportingYear }: Props) => {
  const { watch } = useFormContext<FormData>();
  const watchRadioStatus = watch(DC.DID_COLLECT);

  return (
    <>
      <QMR.CoreQuestionWrapper
        testid="reporting"
        label="Did you collect this measure?"
      >
        <QMR.RadioButton
          key={DC.DID_COLLECT}
          name={DC.DID_COLLECT}
          options={[
            {
              displayValue: `Yes, we did collect data for the Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items (CPC-CH) for ${reportingYear} quality measure reporting`,
              value: "yes",
            },
            {
              displayValue: `No, we did not collect data for the Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items (CPC-CH) for ${reportingYear} quality measure reporting`,
              value: "no",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus?.includes("no") && <WhyDidYouNotCollect />}
    </>
  );
};
