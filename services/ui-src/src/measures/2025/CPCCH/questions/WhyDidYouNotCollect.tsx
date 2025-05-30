import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";

export const WhyDidYouNotCollect = () => {
  const register = useCustomRegister<FormData>();
  return (
    <QMR.CoreQuestionWrapper
      testid="why-did-you-not-collect"
      label="Why did you not collect this measure"
    >
      <QMR.Checkbox
        {...register("WhyDidYouNotCollect")}
        helperText="Select all that apply:"
        renderHelperTextAbove
        options={[
          {
            displayValue: `Service not covered`,
            value: "ServiceNotCovered",
          },
          {
            displayValue: `Population not covered`,
            value: "PopulationNotCovered",
            children: [
              <QMR.RadioButton
                {...register("AmountOfPopulationNotCovered")}
                options={[
                  {
                    displayValue: "Entire population not covered",
                    value: "EntirePopulationNotCovered",
                  },
                  {
                    displayValue: "Partial population not covered",
                    value: "PartialPopulationNotCovered",
                    children: [
                      <QMR.TextArea
                        label="Explain the partial population not covered:"
                        {...register("PartialPopulationNotCoveredExplanation")}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: `Data not available`,
            value: "DataNotAvailable",
            children: [
              <QMR.Checkbox
                {...register("WhyIsDataNotAvailable")}
                label="Why is data not available?"
                renderHelperTextAbove
                helperText="Select all that apply:"
                options={[
                  {
                    displayValue: "Budget constraints",
                    value: "BudgetConstraints",
                  },
                  {
                    displayValue: "Staff Constraints",
                    value: "StaffConstraints",
                  },
                  {
                    displayValue: "Data inconsistencies/Accuracy",
                    value: "DataInconsistenciesAccuracyIssues",
                    children: [
                      <QMR.TextArea
                        label="Explain the Data inconsistencies/Accuracy issues:"
                        {...register("DataInconsistenciesAccuracyIssues")}
                      />,
                    ],
                  },
                  {
                    displayValue: "Data source not easily accessible",
                    value: "DataSourceNotEasilyAccessible",
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        {...register("DataSourceNotEasilyAccessible")}
                        options={[
                          {
                            displayValue: "Requires medical record review",
                            value: "RequiresMedicalRecordReview",
                          },
                          {
                            displayValue:
                              "Requires data linkage which does not currently exist",
                            value: "RequireDataLinkage",
                          },
                          {
                            displayValue: "Other",
                            value: "Other",
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                {...register(
                                  "DataSourceNotEasilyAccessible-Other"
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
                    value: "InformationNotCollected",
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        {...register("InformationNotCollected")}
                        options={[
                          {
                            displayValue:
                              "Not Collected by Provider (Hospital/Health Plan)",
                            value: "NotCollectedByProviderHospitalHealthPlan",
                          },
                          {
                            displayValue: "Other",
                            value: "Other",
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                {...register("InformationNotCollected-Other")}
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Other",
                    value: "Other",
                    children: [
                      <QMR.TextArea
                        label="Explain:"
                        {...register("WhyIsDataNotAvailable-Other")}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: "Small sample size",
            value: "SmallSampleSize",
            children: [
              <QMR.NumberInput
                {...register("SmallSampleSize")}
                label="Enter specific sample size:"
                mask={/^[0-9]*$/i}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Explain:"
                {...register("WhyDidYouNotCollect-Other")}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
