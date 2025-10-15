import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface Props {
  coreset?: string;
}

export const CombinedRates = ({ coreset }: Props) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const combinedLabel =
    coreset === "health"
      ? labels.CombinedRates?.healthHome
      : labels.CombinedRates?.notHealthHome;

  return (
    <>
      {labels.CombinedRates && (
        <QMR.CoreQuestionWrapper
          testid="combined-rates"
          label={labels.CombinedRates.header}
        >
          <CUI.Text fontWeight={600}>{combinedLabel?.question}</CUI.Text>
          <CUI.Text mb={2}>
            For additional information refer to the{" "}
            <CUI.Link
              href="https://www.medicaid.gov/medicaid/quality-of-care/downloads/state-level-rates-brief.pdf"
              color="blue"
              isExternal
              aria-label="Additional state level brief information"
            >
              <u>State-Level Rate Brief</u>
            </CUI.Link>
            .
          </CUI.Text>
          <QMR.RadioButton
            key={DC.COMBINED_RATES}
            name={DC.COMBINED_RATES}
            options={[
              {
                displayValue: combinedLabel.optionYes,
                value: DC.YES,
                children: [
                  <QMR.RadioButton
                    key={DC.COMBINED_RATES_COMBINED_RATES}
                    name={DC.COMBINED_RATES_COMBINED_RATES}
                    options={[
                      {
                        displayValue: combinedLabel.notWeightedRate,
                        value: DC.COMBINED_NOT_WEIGHTED_RATES,
                      },
                      {
                        displayValue: combinedLabel.weightedRate,
                        value: DC.COMBINED_WEIGHTED_RATES,
                      },
                      {
                        displayValue: combinedLabel.weightedRateOther,
                        value: DC.COMBINED_WEIGHTED_RATES_OTHER,
                        children: [
                          <QMR.TextArea
                            key={DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION}
                            name={DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION}
                            label={combinedLabel.weightedRateOtherExplain}
                            formLabelProps={{ fontWeight: 400 }}
                          />,
                        ],
                      },
                    ]}
                  />,
                ],
              },
              {
                displayValue: combinedLabel.optionNo,
                value: DC.NO,
              },
            ]}
            renderHelperTextAbove
          />
        </QMR.CoreQuestionWrapper>
      )}
    </>
  );
};
