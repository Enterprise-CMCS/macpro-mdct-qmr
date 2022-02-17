import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";

export const CombinedRates = () => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Combined Rate(s) from Multiple Reporting Units">
      <QMR.RadioButton
        helperText=" For additional information refer to the State-Level Rate Brief."
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
                    value: "CombinedRates",
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
        label="Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?"
        formLabelProps={{ fontWeight: 600 }}
        renderHelperTextAbove
        {...register("CombinedRates")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
