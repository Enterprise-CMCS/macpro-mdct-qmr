import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { useWatch } from "react-hook-form";
import { Measure } from "../validation/types";
import {
  allPositiveIntegers,
  percentageAllowOneDecimalMax,
} from "utils/numberInputMasks";

export const DefinitionOfPopulation = () => {
  const register = useCustomRegister<Measure.Form>();
  const showDeliverySystemOtherPopulation =
    useWatch({
      name: "DenominatorDefineTotalTechSpec",
    }) !== "NoRepresentsTotalEligiblePop";

  return (
    <QMR.CoreQuestionWrapper label="Definition of Population Included in the Measure">
      <CUI.Heading size="sm" as="h3">
        Definition of denominator
      </CUI.Heading>
      <CUI.Text mt="3">
        Please select all populations that are included. For example, if your
        data include both non-dual Medicaid beneficiaries and Medicare and
        Medicaid Dual Eligibles, select both:
      </CUI.Text>
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>Denominator includes Medicaid population</CUI.ListItem>
        <CUI.ListItem>
          Denominator includes Medicare and Medicaid Dually-Eligible population
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.Checkbox
        {...register("DefinitionOfDenominator")}
        options={[
          {
            displayValue: "Denominator includes Medicaid population",
            value: "DenominatorIncMedicaidPop",
          },
          {
            displayValue:
              "Denominator includes CHIP population (e.g. pregnant women)",
            value: "DenominatorIncCHIP",
          },
          {
            displayValue:
              "Denominator includes Medicare and Medicaid Dually-Eligible population",
            value: "DenominatorIncMedicareMedicaidDualEligible",
          },
          {
            displayValue: "Other",
            value: "DenominatorIncOther",
            children: [
              <QMR.TextArea
                formLabelProps={{ fontWeight: "400" }}
                label="Define the other denominator population:"
                {...register("DefinitionOfDenominator-Other")}
              />,
            ],
          },
        ]}
      />
      <CUI.Box my="5">
        <QMR.TextArea
          formLabelProps={{ fontWeight: "400" }}
          label="If there has been a change in the included population from the previous reporting year, please provide any available context below:"
          {...register("ChangeInPopulationExplanation")}
        />
      </CUI.Box>
      <CUI.Box my="5">
        <QMR.RadioButton
          formLabelProps={{ fontWeight: "600" }}
          label="Does this denominator represent your total measure-eligible population as defined by the Technical Specifications for this measure?"
          {...register("DenominatorDefineTotalTechSpec")}
          options={[
            {
              displayValue:
                "Yes, this denominator represents the total measure-eligible population as defined by the Technical Specifications for this measure.",
              value: "YesRepresentsTotalEligiblePop",
            },
            {
              displayValue:
                "No, this denominator does not represent the total measure-eligible population as defined by the Technical Specifications for this measure.",
              value: "NoRepresentsTotalEligiblePop",
              children: [
                <QMR.TextArea
                  {...register("DenominatorDefineTotalTechSpec-No-Explanation")}
                  label="Explain which populations are excluded and why:"
                />,
                <CUI.Box mt="10" key="DenominatorDefineTotalTechSpec-No-Size">
                  <QMR.NumberInput
                    mask={allPositiveIntegers}
                    {...register("DenominatorDefineTotalTechSpec-No-Size")}
                    label="Specify the size of the population excluded (optional):"
                  />
                </CUI.Box>,
              ],
            },
          ]}
        />
      </CUI.Box>
      <CUI.Box mt="5">
        <CUI.Heading size="sm" as="h3" my="2">
          {"Which delivery systems are represented in the denominator?"}
        </CUI.Heading>
        <QMR.Checkbox
          formLabelProps={{ fontWeight: "400" }}
          {...register("DeliverySysRepresentationDenominator")}
          label="Select all delivery systems that apply in your state (must select at least one); for each delivery system selected, enter the percentage of the measure-eligible population represented by that service delivery system."
          options={[
            {
              displayValue: "Fee-for-Service (FFS)",
              value: "FFS",
              children: [
                <QMR.RadioButton
                  {...register("DeliverySys-FreeForService")}
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Fee-for-Service (FFS) population included in this measure?"
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                      value: "YesAllFFS",
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                      value: "NoAllFFS",
                      children: [
                        <QMR.NumberInput
                          {...register("DeliverySys-FreeForService-No-Percent")}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Fee-for-Service (FFS) population are included in the measure?"
                          displayPercent
                          mask={percentageAllowOneDecimalMax}
                        />,
                        <CUI.Text my="5" key="AdditionalFFSText">
                          The percentage provided here should represent the
                          percentage of the denominator population(s) included
                          in the measure (i.e., Medicaid, CHIP, etc.) that
                          receives items/services through the selected delivery
                          system. For example, if the population included in the
                          reported data represents all managed care enrollees
                          and half of your state’s fee-for-service enrollees,
                          select managed care, and select fee-for-service and
                          enter 50.
                        </CUI.Text>,
                        <QMR.NumberInput
                          {...register(
                            "DeliverySys-FreeForService-No-Population"
                          )}
                          formLabelProps={{ fontWeight: "400" }}
                          mask={allPositiveIntegers}
                          label="What number of your measure-eligible Fee-for-Service (FFS) population are included in the measure? (optional)"
                        />,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              displayValue: "Primary Care Case Management (PCCM)",
              value: "PCCM",
              children: [
                <QMR.RadioButton
                  {...register("DeliverySys-PrimaryCareManagement")}
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Primary Care Case Management (PCCM) population included in this measure?"
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                      value: "YesAllPCCM",
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                      value: "NoAllPCCM",
                      children: [
                        <QMR.NumberInput
                          {...register(
                            "DeliverySys-PrimaryCareManagement-No-Percent"
                          )}
                          displayPercent
                          mask={percentageAllowOneDecimalMax}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Primary Care Case Management (PCCM) population are included in the measure?"
                        />,
                        <CUI.Box py="5" key="AdditionalPCCMText">
                          <CUI.Text my="3">
                            The percentage provided here should represent the
                            percentage of the denominator population(s) included
                            in the measure (i.e., Medicaid, CHIP, etc.) that
                            receives items/services through the selected
                            delivery system. For example, if the population
                            included in the reported data represents all managed
                            care enrollees and half of your state’s
                            fee-for-service enrollees, select managed care, and
                            select fee-for-service and enter 50.
                          </CUI.Text>
                        </CUI.Box>,
                        <QMR.NumberInput
                          {...register(
                            "DeliverySys-PrimaryCareManagement-No-Population"
                          )}
                          formLabelProps={{ fontWeight: "400" }}
                          mask={allPositiveIntegers}
                          label="What number of your measure-eligible Primary Care Case Management (PCCM) population are included in the measure? (optional)"
                        />,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              displayValue:
                "Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP)",
              value: "MCO-PIHP",
              children: [
                <CUI.Box pb="5" key="DeliverySys-MCO_POHP-Percent">
                  <QMR.NumberInput
                    displayPercent
                    mask={percentageAllowOneDecimalMax}
                    formLabelProps={{ fontWeight: "400" }}
                    label="What percent of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in the measure?"
                    {...register("DeliverySys-MCO_POHP-Percent")}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-MCO_POHP-NumberOfPlans">
                  <QMR.NumberInput
                    formLabelProps={{ fontWeight: "400" }}
                    mask={allPositiveIntegers}
                    label="What is the number of Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans that are included in the reported data?"
                    {...register("DeliverySys-MCO_POHP-NumberOfPlans")}
                  />
                </CUI.Box>,
                <CUI.Box pt="5" key="DeliverySys-MCO_POHP">
                  <QMR.RadioButton
                    {...register("DeliverySys-MCO_POHP")}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Is all of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population included in this measure?"
                    options={[
                      {
                        displayValue:
                          "Yes, all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                        value: "YesAllMCO-PIHP",
                      },
                      {
                        displayValue:
                          "No, not all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                        value: "NoAllMCO-PIHP",
                        children: [
                          <CUI.Text key="AdditionalMCOIncludedText">
                            {
                              "What percent of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are"
                            }
                            <CUI.Text as="i" fontWeight="600">
                              {" included "}
                            </CUI.Text>
                            {"in the measure?"}
                          </CUI.Text>,
                          <QMR.NumberInput
                            displayPercent
                            renderHelperTextAbove
                            helperText="The percentage provided here should represent the
                              percentage of the denominator population(s) included
                              in the measure (i.e., Medicaid, CHIP, etc.) that
                              receives items/services through the selected
                              delivery system. For example, if the population
                              included in the reported data represents all managed
                              care enrollees and half of your state’s
                              fee-for-service enrollees, select managed care, and
                              select fee-for-service and enter 50."
                            mask={percentageAllowOneDecimalMax}
                            {...register("DeliverySys-MCO_POHP-No-Included")}
                          />,
                          <CUI.Text my="5" key="AdditionalMCOExcludedText">
                            {" "}
                            {
                              "How many of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans are"
                            }
                            <CUI.Text as="i" fontWeight="600">
                              {" excluded "}
                            </CUI.Text>
                            {
                              "from the measure? If none are excluded, please enter zero."
                            }
                          </CUI.Text>,
                          <QMR.NumberInput
                            mask={allPositiveIntegers}
                            {...register("DeliverySys-MCO_POHP-No-Excluded")}
                          />,
                        ],
                      },
                    ]}
                  />
                </CUI.Box>,
              ],
            },
            {
              displayValue: "Integrated Care Models (ICM)",
              value: "ICM",
              children: [
                <QMR.RadioButton
                  formLabelProps={{ fontWeight: "400" }}
                  label="Is all of your measure-eligible Integrated Care Models (ICM) population included in this measure?"
                  {...register("DeliverySys-IntegratedCareModel")}
                  options={[
                    {
                      displayValue:
                        "Yes, all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                      value: "YesAllICM",
                    },
                    {
                      displayValue:
                        "No, not all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                      value: "NoAllICM",
                      children: [
                        <QMR.NumberInput
                          displayPercent
                          mask={percentageAllowOneDecimalMax}
                          formLabelProps={{ fontWeight: "400" }}
                          label="What percent of your measure-eligible Integrated Care Models (ICM) population are included in the measure?"
                          {...register(
                            "DeliverySys-IntegratedCareModel-No-Percent"
                          )}
                          helperText="The percentage provided here should represent the
                          percentage of the denominator population(s) included
                          in the measure (i.e., Medicaid, CHIP, etc.) that
                          receives items/services through the selected
                          delivery system. For example, if the population
                          included in the reported data represents all managed
                          care enrollees and half of your state’s
                          fee-for-service enrollees, select managed care, and
                          select fee-for-service and enter 50."
                          renderHelperTextAbove
                        />,
                        <QMR.NumberInput
                          formControlProps={{ paddingTop: "4" }}
                          mask={allPositiveIntegers}
                          formLabelProps={{ fontWeight: "400" }}
                          label="How many of your measure-eligible Integrated Care Models (ICM) plans are excluded from the measure? If none are excluded, please enter zero."
                          {...register(
                            "DeliverySys-IntegratedCareModel-No-Population"
                          )}
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
                <CUI.Box pb="5" key="DeliverySys-Other">
                  <QMR.TextArea
                    formLabelProps={{ fontWeight: "400" }}
                    label="Describe the Other Delivery System represented in the denominator:"
                    {...register("DeliverySys-Other")}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-Other-Percent">
                  <QMR.NumberInput
                    displayPercent
                    mask={percentageAllowOneDecimalMax}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Percentage of measure-eligible state population represented in data reported:"
                    {...register("DeliverySys-Other-Percent")}
                  />
                </CUI.Box>,
                <CUI.Box py="5" key="AdditionalOtherText">
                  <CUI.Text>
                    The percentage provided here should represent the percentage
                    of the denominator population(s) included in the measure
                    (i.e., Medicaid, CHIP, etc.) that receives items/services
                    through the selected delivery system. For example, if the
                    population included in the reported data represents all
                    managed care enrollees and half of your state’s
                    fee-for-service enrollees, select managed care, and select
                    fee-for-service and enter 50.
                  </CUI.Text>
                </CUI.Box>,
                <CUI.Box py="5" key="DeliverySys-Other-NumberOfHealthPlans">
                  <QMR.NumberInput
                    mask={allPositiveIntegers}
                    formLabelProps={{ fontWeight: "400" }}
                    label="If applicable, list the number of Health Plans represented:"
                    {...register("DeliverySys-Other-NumberOfHealthPlans")}
                  />
                </CUI.Box>,
                ...(showDeliverySystemOtherPopulation
                  ? [
                      <CUI.Box pt="5" key="DeliverySys-Other-Population">
                        <QMR.NumberInput
                          mask={allPositiveIntegers}
                          formLabelProps={{ fontWeight: "400" }}
                          label="Number of measure-eligible state population represented in data reported:"
                          {...register("DeliverySys-Other-Population")}
                        />
                      </CUI.Box>,
                    ]
                  : []),
              ],
            },
          ]}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
