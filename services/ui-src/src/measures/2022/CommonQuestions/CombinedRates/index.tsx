import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";

interface Props {
  healthHomeMeasure?: boolean;
}

export const CombinedRates = ({ healthHomeMeasure }: Props) => {
  const register = useCustomRegister<Types.CombinedRates>();

  return (
    <QMR.CoreQuestionWrapper
      testid="combined-rates"
      label="Combined Rate(s) from Multiple Reporting Units"
    >
      <CUI.Text fontWeight={600}>
        {!healthHomeMeasure ? (
          <>
            Did you combine rates from multiple reporting units (e.g. health
            plans, delivery systems, programs) to create a State-Level rate?
          </>
        ) : (
          <>
            Did you combine rates from multiple reporting units (e.g. Health
            Home Providers) to create a Health Home SPA-Level rate?
          </>
        )}
      </CUI.Text>
      <CUI.Text mb={2}>
        For additional information refer to the{" "}
        <CUI.Link
          href="https://www.medicaid.gov/medicaid/quality-of-care/downloads/state-level-rates-brief.pdf"
          color="blue"
          isExternal
          aria-label="Additional state level brief information"
        >
          State-Level Rate Brief
        </CUI.Link>
        .
      </CUI.Text>
      <QMR.RadioButton
        options={[
          {
            displayValue: !healthHomeMeasure
              ? "Yes, we combined rates from multiple reporting units to create a State-Level rate."
              : "Yes, we combined rates from multiple reporting units to create a Health Home SPA-Level rate.",
            value: DC.YES,
            children: [
              <QMR.RadioButton
                {...register(DC.COMBINED_RATES_COMBINED_RATES)}
                options={[
                  {
                    displayValue: !healthHomeMeasure
                      ? "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a State-Level rate."
                      : "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a SPA-Level rate.",
                    value: DC.COMBINED_NOT_WEIGHTED_RATES,
                  },
                  {
                    displayValue:
                      "The rates are weighted based on the size of the measure-eligible population for each reporting unit.",
                    value: DC.COMBINED_WEIGHTED_RATES,
                  },
                  {
                    displayValue:
                      "The rates are weighted based on another weighting factor.",
                    value: DC.COMBINED_WEIGHTED_RATES_OTHER,
                    children: [
                      <QMR.TextArea
                        {...register(
                          DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION
                        )}
                        label="Describe the other weighting factor:"
                        formLabelProps={{ fontWeight: 400 }}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: !healthHomeMeasure
              ? "No, we did not combine rates from multiple reporting units to create a State-Level rate."
              : "No, we did not combine rates from multiple reporting units to create a SPA-Level rate for Health Home measures.",
            value: DC.NO,
          },
        ]}
        renderHelperTextAbove
        {...register(DC.COMBINED_RATES)}
      />
    </QMR.CoreQuestionWrapper>
  );
};
