import * as QMR from "components";
import { Measure } from "../validation/types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const defaultDeviationOptions = [
  { label: "Ages 18 to 64", id: 0 },
  { label: "Age 65 and older", id: 1 },
];

interface Props {
  options: { label: string; id: number }[];
  deviationConditions: {
    showAdvisingUsersAges18To64: boolean;
    showAdvisingUsers65AndOlder: boolean;
    showDiscussingMedicationsAges18To64: boolean;
    showDiscussingMedications65AndOlder: boolean;
    showDiscussingStrategiesAges18To64: boolean;
    showDiscussingStrategies65AndOlder: boolean;
    showPercentageUsersAges18To64: boolean;
    showPercentageUsers65AndOlder: boolean;
    showOtherPerformanceMeasureRates: boolean;
  };
}

interface OptionProps extends Props {
  name: string;
}

const deviationOptions = ({
  options,
  name,
  deviationConditions,
}: OptionProps): QMR.CheckboxOption[] => {
  let filteredOptions = options;
  if (name.includes("dvisingUsersToQuit")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showAdvisingUsersAges18To64 && option.id === 0) ||
        (deviationConditions.showAdvisingUsers65AndOlder && option.id === 1)
      );
    });
  }

  if (name.includes("DiscussingCessationMedications")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showDiscussingMedicationsAges18To64 &&
          option.id === 0) ||
        (deviationConditions.showDiscussingMedications65AndOlder &&
          option.id === 1)
      );
    });
  }

  if (name.includes("DiscussingCessationStrategies")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showDiscussingStrategiesAges18To64 &&
          option.id === 0) ||
        (deviationConditions.showDiscussingStrategies65AndOlder &&
          option.id === 1)
      );
    });
  }

  if (name.includes("PercentageOfUsers")) {
    filteredOptions = options.filter((option) => {
      return (
        (deviationConditions.showPercentageUsersAges18To64 &&
          option.id === 0) ||
        (deviationConditions.showPercentageUsers65AndOlder && option.id === 1)
      );
    });
  }

  return filteredOptions.map((item) => {
    return {
      displayValue: item.label,
      value: `${item.id}-${item.label.replace(/ /g, "")}`,
      children: [
        <QMR.Checkbox
          name={`${name}.${item.id}.options`}
          key={`${name}.${item.id}.options`}
          options={[
            {
              displayValue: "Numerator",
              value: `${item.id}.Numerator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.numerator`}
                  key={`${name}.${item.id}.numerator`}
                />,
              ],
            },
            {
              displayValue: "Denominator",
              value: `${item.id}.Denominator`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.denominator`}
                  key={`${name}.${item.id}.denominator`}
                />,
              ],
            },
            {
              displayValue: "Other",
              value: `${item.id}.Other`,
              children: [
                <QMR.TextArea
                  label="Explain:"
                  name={`${name}.${item.id}.other`}
                  key={`${name}.${item.id}.other`}
                />,
              ],
            },
          ]}
        />,
      ],
    };
  });
};

export const DeviationFromMeasureSpec = ({
  options,
  deviationConditions,
}: Props) => {
  const register = useCustomRegister<Measure.Form>();

  return (
    <QMR.CoreQuestionWrapper label="Deviations from Measure Specifications">
      <QMR.RadioButton
        renderHelperTextAbove
        {...register("DidCalculationsDeviate")}
        formLabelProps={{ fontWeight: 600 }}
        label="Did your calculation of the measure deviate from the measure specification in any way?"
        helperText="For example: deviation from measure specification might include different methodology, timeframe, or reported age groups."
        options={[
          {
            displayValue:
              "Yes, the calculation of the measure deviates from the measure specification.",
            value: "YesCalcDeviated",
            children: [
              <QMR.Checkbox
                {...register("DeviationOptions")}
                label="Select and explain the deviation(s):"
                // Dynamically hide or show children based on if performance measure AdvisingUsersToQuit sections were completed
                options={[
                  ...(deviationConditions.showAdvisingUsersAges18To64 ||
                  deviationConditions.showAdvisingUsers65AndOlder
                    ? [
                        {
                          value: "AdvisingUsersToQuit",
                          displayValue:
                            "Advising Smokers and Tobacco Users to Quit",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-AdvisingUsersToQuit-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register(
                                  "DeviationFields-AdvisingUsersToQuit"
                                ),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                  // Dynamically hide or show children based on if performance measure DiscussingMedications sections were completed
                  ...(deviationConditions.showDiscussingMedicationsAges18To64 ||
                  deviationConditions.showDiscussingMedications65AndOlder
                    ? [
                        {
                          value: "DiscussingCessationMedications",
                          displayValue: "Discussing Cessation Medications",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-DiscussingCessationMedications-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register(
                                  "DeviationFields-DiscussingCessationMedications"
                                ),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),

                  // Dynamically hide or show children based on if performance measure showDiscussingStrategies sections were completed
                  ...(deviationConditions.showDiscussingStrategiesAges18To64 ||
                  deviationConditions.showDiscussingStrategies65AndOlder
                    ? [
                        {
                          value: "DiscussingCessationStrategies",
                          displayValue: "Discussing Cessation Strategies",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-DiscussingCessationStrategies-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register(
                                  "DeviationFields-DiscussingCessationStrategies"
                                ),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),

                  // Dynamically hide or show children based on if performance measure showPercentageUsers sections were completed
                  ...(deviationConditions.showPercentageUsersAges18To64 ||
                  deviationConditions.showPercentageUsers65AndOlder
                    ? [
                        {
                          value: "PercentageOfUsers",
                          displayValue:
                            "Percentage of Current Smokers and Tobacco Users",
                          children: [
                            <QMR.Checkbox
                              {...register(
                                "DeviationOptions-PercentageOfUsers-AgeRange"
                              )}
                              formLabelProps={{ fontWeight: 600 }}
                              options={deviationOptions({
                                options,
                                ...register(
                                  "DeviationFields-PercentageOfUsers"
                                ),
                                deviationConditions,
                              })}
                            />,
                          ],
                        },
                      ]
                    : []),
                ]}
              />,
            ],
          },
          {
            displayValue:
              "No, the calculation of the measure does not deviate from the measure specification in any way.",
            value: "NoCalcDidNotDeviate",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
