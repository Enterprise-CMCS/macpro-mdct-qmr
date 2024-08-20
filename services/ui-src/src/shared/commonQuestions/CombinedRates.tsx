import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface Props {
  healthHomeMeasure?: boolean;
}

export const CombinedRates = ({ healthHomeMeasure }: Props) => {
  const register = useCustomRegister<Types.CombinedRates>();

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const combinedLabel = healthHomeMeasure
    ? labels.CombinedRates.healthHome
    : labels.CombinedRates.notHealthHome;

  return (
    <>
      {Number(labels.year) < 2024 && (
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
            options={[
              {
                displayValue: combinedLabel.optionYes,
                value: DC.YES,
                children: [
                  <QMR.RadioButton
                    {...register(DC.COMBINED_RATES_COMBINED_RATES)}
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
                            {...register(
                              DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION
                            )}
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
            {...register(DC.COMBINED_RATES)}
          />
        </QMR.CoreQuestionWrapper>
      )}
    </>
  );
};
