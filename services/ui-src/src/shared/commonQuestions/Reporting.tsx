import * as QMR from "components";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { WhyAreYouNotReporting } from "shared/commonQuestions/WhyAreYouNotReporting";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  measureName: string;
  measureAbbreviation: string;
  reportingYear: string;
  coreset?: string;
  removeLessThan30?: boolean;
}

export const Reporting = ({
  measureName,
  reportingYear,
  measureAbbreviation,
  coreset,
  removeLessThan30,
}: Props) => {
  const { watch } = useFormContext<Types.DidReport>();
  const watchRadioStatus = watch(DC.DID_REPORT);

  return (
    <>
      <QMR.CoreQuestionWrapper
        testid="reporting"
        label="Are you reporting on this measure?"
      >
        <QMR.RadioButton
          name={DC.DID_REPORT}
          key={DC.DID_REPORT}
          options={[
            {
              displayValue: `Yes, I am reporting ${measureName} (${measureAbbreviation}) for ${
                featuresByYear.displayFFYLanguage ? "FFY" : ""
              } ${reportingYear} quality measure reporting.`,
              value: DC.YES,
            },
            {
              displayValue: `No, I am not reporting ${measureName} (${measureAbbreviation}) for ${
                featuresByYear.displayFFYLanguage ? "FFY" : ""
              } ${reportingYear} quality measure reporting.`,
              value: DC.NO,
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
      {watchRadioStatus === DC.NO && (
        <WhyAreYouNotReporting
          coreset={coreset}
          removeLessThan30={removeLessThan30}
        />
      )}
    </>
  );
};
