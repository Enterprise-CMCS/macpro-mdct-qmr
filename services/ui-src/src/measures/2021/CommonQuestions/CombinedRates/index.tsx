import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";

export const CombinedRates = () => {
  const register = useCustomRegister<Types.CombinedRates>();

  return (
    <QMR.CoreQuestionWrapper label="Combined Rate(s) from Multiple Reporting Units">
      <CUI.Text fontWeight={600}>
        Did you combine rates from multiple reporting units (e.g. health plans,
        delivery systems, programs) to create a State-Level rate?
      </CUI.Text>
      <CUI.Text mb={2}>
        For additional information refer to the{" "}
        <CUI.Link
          href="https://www.medicaid.gov/medicaid/quality-of-care/downloads/state-level-rates-brief.pdf"
          color="blue"
          isExternal
        >
          State-Level Rate Brief
        </CUI.Link>
        .
      </CUI.Text>
      <QMR.RadioButton
        options={[
          {
            displayValue:
              "Yes, we combined rates from multiple reporting units to create a State-Level rate.",
            value: "Yes, combine",
            children: [
              <QMR.RadioButton
                {...register("CombinedRates-CombinedRates")}
                options={[
                  {
                    displayValue:
                      "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a State-Level rate.",
                    value: "Combined Not Weighted Rates",
                  },
                  {
                    displayValue:
                      "The rates are weighted based on the size of the measure-eligible population for each reporting unit.",
                    value: "Combined Weighted Rates",
                  },
                  {
                    displayValue:
                      "The rates are weighted based on another weighting factor.",
                    value: "Combined Weighted Rates Other",
                    children: [
                      <QMR.TextArea
                        {...register(
                          "CombinedRates-CombinedRates-Other-Explanation"
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
            displayValue:
              "No, we did not combine rates from multiple reporting units to create a State-Level rate.",
            value: "No, did not combine",
          },
        ]}
        renderHelperTextAbove
        {...register("CombinedRates")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
