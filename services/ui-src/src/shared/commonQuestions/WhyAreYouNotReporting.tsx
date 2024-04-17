import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface Props {
  healthHomeMeasure?: boolean;
  removeLessThan30?: boolean;
}

export const WhyAreYouNotReporting = ({
  healthHomeMeasure,
  removeLessThan30,
}: Props) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const pheIsCurrent = useFlags()?.[`periodOfHealthEmergency${labels.year}`];
  const register = useCustomRegister<Types.WhyAreYouNotReporting>();

  return (
    <QMR.CoreQuestionWrapper
      testid="why-are-you-not-reporting"
      label="Why are you not reporting on this measure?"
    >
      <QMR.Checkbox
        {...register(DC.WHY_ARE_YOU_NOT_REPORTING)}
        helperText="Select all that apply:"
        renderHelperTextAbove
        options={[
          {
            displayValue: `Service not covered`,
            value: DC.SERVICE_NOT_COVERED,
          },
          {
            displayValue: `Population not covered`,
            value: DC.POP_NOT_COVERED,
            children: [
              <QMR.RadioButton
                {...register(DC.AMOUNT_OF_POP_NOT_COVERED)}
                options={[
                  {
                    displayValue: "Entire population not covered",
                    value: DC.ENTIRE_POP_NOT_COVERED,
                  },
                  {
                    displayValue: "Partial population not covered",
                    value: DC.PARTIAL_POP_NOT_COVERED,
                    children: [
                      <QMR.TextArea
                        label="Explain the partial population not covered:"
                        {...register(DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION)}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: `Data not available`,
            value: DC.DATA_NOT_AVAILABLE,
            children: [
              <QMR.Checkbox
                {...register(DC.WHY_IS_DATA_NOT_AVAILABLE)}
                label="Why is data not available?"
                renderHelperTextAbove
                helperText="Select all that apply:"
                options={[
                  {
                    displayValue: "Budget constraints",
                    value: DC.BUDGET_CONSTRAINTS,
                  },
                  {
                    displayValue: "Staff Constraints",
                    value: DC.STAFF_CONSTRAINTS,
                  },
                  {
                    displayValue: "Data inconsistencies/Accuracy",
                    value: DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES,
                    children: [
                      <QMR.TextArea
                        label="Explain the Data inconsistencies/Accuracy issues:"
                        {...register(DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES)}
                      />,
                    ],
                  },
                  ...(healthHomeMeasure
                    ? [
                        {
                          displayValue:
                            "Data not submitted by Providers to State",
                          value: DC.DATA_NOT_SUBMITTED_BY_PROVIDERS_TO_STATE,
                        },
                      ]
                    : []),
                  {
                    displayValue: "Data source not easily accessible",
                    value: DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE,
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        {...register(DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE)}
                        options={[
                          {
                            displayValue: "Requires medical record review",
                            value: DC.REQUIRES_MEDICAL_RECORD_REVIEW,
                          },
                          {
                            displayValue:
                              "Requires data linkage which does not currently exist",
                            value: DC.REQUIRES_DATA_LINKAGE,
                          },
                          {
                            displayValue: "Other",
                            value: DC.OTHER,
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                {...register(
                                  DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER
                                )}
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Information not collected",
                    value: DC.INFO_NOT_COLLECTED,
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        {...register(DC.INFO_NOT_COLLECTED)}
                        options={[
                          {
                            displayValue:
                              "Not Collected by Provider (Hospital/Health Plan)",
                            value: DC.NOT_COLLECTED_BY_PROVIDER,
                          },
                          {
                            displayValue: "Other",
                            value: DC.OTHER,
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                {...register(DC.INFO_NOT_COLLECTED_OTHER)}
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Other",
                    value: DC.OTHER,
                    children: [
                      <QMR.TextArea
                        label="Explain:"
                        {...register(DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER)}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          //for years 2023 and over, check the flag to see if the label should be enabled
          ...(labels.year < 2023 || pheIsCurrent
            ? [
                {
                  displayValue:
                    labels.WhyAreYouNotReporting?.limitWithDataCollection,
                  value: DC.LIMITATION_WITH_DATA_COLLECTION,
                  children: [
                    <QMR.TextArea
                      label={
                        labels.WhyAreYouNotReporting
                          ?.limitWithDataCollectionDesc
                      }
                      {...register(DC.LIMITATION_WITH_DATA_COLLECTION)}
                    />,
                  ],
                },
              ]
            : []),
          {
            displayValue: `Small sample size ${
              removeLessThan30 ? "" : "(less than 30)"
            }`,
            value: DC.SMALL_SAMPLE_SIZE,
            children: [
              <QMR.NumberInput
                {...register(DC.SMALL_SAMPLE_SIZE)}
                label="Enter specific sample size:"
                mask={removeLessThan30 ? /^[0-9]*$/i : /^([1-2]?\d)?$/i}
              />,
            ],
          },
          ...(healthHomeMeasure
            ? [
                {
                  displayValue:
                    "Continuous enrollment requirement not met due to start date of SPA",
                  value:
                    DC.CONTINUOUS_ENROLLMENT_REQUIREMENT_NOT_MET_DUE_TO_START_DATE_OF_SPA,
                },
              ]
            : []),
          {
            displayValue: "Other",
            value: DC.OTHER,
            children: [
              <QMR.TextArea
                label="Explain:"
                {...register(DC.WHY_ARE_YOU_NOT_REPORTING_OTHER)}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
