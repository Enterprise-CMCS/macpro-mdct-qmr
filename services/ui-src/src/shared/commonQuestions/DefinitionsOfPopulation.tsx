import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Types from "../types";
import {
  allPositiveIntegers,
  percentageAllowOneDecimalMax,
  parseLabelToHTML,
} from "utils";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { AnyObject } from "types";
import { useParams } from "react-router-dom";

interface Props {
  hybridMeasure?: boolean;
  populationSampleSize?: boolean;
  coreSetOptions?: CoreSetSpecificOptions;
  coreset?: Types.CoreSetKey;
  populationTotalTechSpec?: boolean;
  deliverySystems?: boolean;
  removeOtherOption?: boolean;
}
interface DefOfDenomOption {
  displayValue: string;
  value: string;
  children?: JSX.Element[];
}
export interface CoreSetSpecificOptions {
  [coreSetId: string]: {
    options: DefOfDenomOption[];
    helpText: string;
    hideList?: boolean;
  };
}

const defOfDenomOptions: { [coreSetType: string]: DefOfDenomOption[] } = {
  standard: [
    {
      displayValue: "Denominator includes Medicaid population",
      value: DC.DENOMINATOR_INC_MEDICAID_POP,
    },
    {
      displayValue:
        "Denominator includes CHIP population (e.g. pregnant women)",
      value: DC.DENOMINATOR_INC_CHIP,
    },
    {
      displayValue:
        "Denominator includes Medicare and Medicaid Dually-Eligible population",
      value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
    },
  ],
  child: [
    {
      displayValue: "Denominator includes CHIP (Title XXI) population only",
      value: "DenominatorIncCHIPPop",
    },
    {
      displayValue: "Denominator includes Medicaid (Title XIX) population only",
      value: "DenominatorIncMedicaidPop",
    },
    {
      displayValue: "Denominator includes CHIP and Medicaid (Title XIX)",
      value: "DenominatorIncMedicaidAndCHIPPop",
    },
  ],
};

const StandardDefinitions = (
  labels: AnyObject,
  healthHomeMeasure?: boolean
) => {
  const standardOptions = defOfDenomOptions["standard"];
  const optionsWithoutChip = standardOptions.filter(
    (opt) => opt.value !== DC.DENOMINATOR_INC_CHIP
  );
  //for health home measures, we do not need to capture CHIP population
  const options = healthHomeMeasure ? optionsWithoutChip : standardOptions;

  return (
    <CUI.Box>
      <CUI.Text mt="3">
        {`Please select all populations that are included. For example, if your data include both non-dual Medicaid ${
          healthHomeMeasure ? "enrollees" : "beneficiaries"
        } and Medicare and Medicaid Dual Eligibles, select both:`}
      </CUI.Text>
      <CUI.UnorderedList m="5" ml="10">
        {optionsWithoutChip.map((option, index) => {
          return (
            <CUI.ListItem key={index + option.value}>
              {option.displayValue}
            </CUI.ListItem>
          );
        })}
      </CUI.UnorderedList>
      <QMR.Checkbox
        key={DC.DEFINITION_OF_DENOMINATOR}
        name={DC.DEFINITION_OF_DENOMINATOR}
        options={[
          ...options,
          {
            displayValue: "Other",
            value: DC.DENOMINATOR_INC_OTHER,
            children: [
              <QMR.TextArea
                key={DC.DEFINITION_DENOMINATOR_OTHER}
                name={DC.DEFINITION_DENOMINATOR_OTHER}
                formLabelProps={{ fontWeight: "400" }}
                label={parseLabelToHTML(labels.defineDenomOther)}
              />,
            ],
          },
        ]}
      />
    </CUI.Box>
  );
};

const CoreSetSpecificDefinitions = (
  labels: AnyObject,
  coreSetType: string,
  options: CoreSetSpecificOptions,
  removeOtherOption?: boolean
) => {
  const otherOption = {
    displayValue: "Other",
    value: DC.DENOMINATOR_INC_OTHER,
    children: [
      <QMR.TextArea
        key={DC.DEFINITION_DENOMINATOR_OTHER}
        name={DC.DEFINITION_DENOMINATOR_OTHER}
        formLabelProps={{ fontWeight: "400" }}
        label={parseLabelToHTML(labels.defineDenomOther)}
      />,
    ],
  };
  const otherOptions = removeOtherOption ? [] : [otherOption];
  return (
    <CUI.Box>
      <CUI.Text my="3">{options[coreSetType].helpText}</CUI.Text>
      {!options[coreSetType].hideList &&
        options[coreSetType].options.length > 1 && (
          <CUI.UnorderedList m="5" ml="10">
            {options[coreSetType].options.map((item) => (
              <CUI.ListItem>{item.displayValue}</CUI.ListItem>
            ))}
          </CUI.UnorderedList>
        )}
      <QMR.Checkbox
        key={DC.DEFINITION_OF_DENOMINATOR}
        name={DC.DEFINITION_OF_DENOMINATOR}
        options={[...options[coreSetType].options, ...otherOptions]}
      />
    </CUI.Box>
  );
};

const ChildDefinitions = () => {
  return (
    <CUI.Box>
      <CUI.Text mb="2">
        Please select all populations that are included.
      </CUI.Text>
      <QMR.RadioButton
        key={DC.DEFINITION_OF_DENOMINATOR}
        name={DC.DEFINITION_OF_DENOMINATOR}
        valueAsArray
        options={defOfDenomOptions["child"]}
      />
    </CUI.Box>
  );
};
const HealthHomeDefinitions = () => {
  return (
    <CUI.Box my="5">
      <QMR.RadioButton
        formLabelProps={{ fontWeight: "600" }}
        label="Are all Health Home Providers represented in the denominator?"
        key={DC.DENOMINATOR_DEFINE_HEALTH_HOME}
        name={DC.DENOMINATOR_DEFINE_HEALTH_HOME}
        options={[
          {
            displayValue:
              "Yes, all Health Home Providers are represented in the denominator.",
            value: DC.YES,
          },
          {
            displayValue:
              "No, not all Health Home Providers are represented in the denominator.",
            value: DC.NO,
            children: [
              <QMR.TextArea
                key={DC.DENOMINATOR_DEFINE_HEALTH_HOME_NO_EXPLAIN}
                name={DC.DENOMINATOR_DEFINE_HEALTH_HOME_NO_EXPLAIN}
                label="Explain why all Health Home Providers are not represented in the denominator:"
              />,
            ],
          },
        ]}
      />
    </CUI.Box>
  );
};

const HybridDefinitions = (header: boolean = true) => {
  return (
    <CUI.Box mt="5">
      {header && (
        <CUI.Heading size="sm" as="h2" my="2">
          If you are reporting as a hybrid measure, provide the measure eligible
          population and sample size.{" "}
        </CUI.Heading>
      )}
      <QMR.NumberInput
        key={DC.HYBRID_MEASURE_POPULATION_INCLUDED}
        name={DC.HYBRID_MEASURE_POPULATION_INCLUDED}
        formControlProps={{ my: "4" }}
        mask={allPositiveIntegers}
        label="What is the size of the measure-eligible population?"
      />
      <QMR.NumberInput
        key={DC.HYBRID_MEASURE_SAMPLE_SIZE}
        name={DC.HYBRID_MEASURE_SAMPLE_SIZE}
        mask={allPositiveIntegers}
        label="Specify the sample size:"
      />
    </CUI.Box>
  );
};

export const DefinitionOfPopulation = ({
  populationSampleSize,
  hybridMeasure,
  coreSetOptions,
  coreset,
  populationTotalTechSpec = true,
  deliverySystems = true,
  removeOtherOption = false,
}: Props) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const params = useParams();
  const childMeasure = coreset === "child";
  const healthHomeMeasure = coreset === "health";
  const coreSetType = healthHomeMeasure ? "HHCS" : params.coreSetId;

  return (
    <QMR.CoreQuestionWrapper
      testid="definition-of-population"
      label="Definition of Population Included in the Measure"
    >
      <CUI.Heading size="sm" as="h2">
        Definition of denominator
      </CUI.Heading>
      {labels.DefinitionsOfPopulation.coreSetSpecificOptions && coreSetType
        ? CoreSetSpecificDefinitions(
            labels.DefinitionsOfPopulation,
            coreSetType,
            coreSetOptions ??
              labels.DefinitionsOfPopulation.coreSetSpecificOptions,
            removeOtherOption
          )
        : childMeasure
        ? ChildDefinitions()
        : StandardDefinitions(
            labels.DefinitionsOfPopulation,
            healthHomeMeasure
          )}
      {labels.DefinitionsOfPopulation.changeInPopExplanation && (
        <CUI.Box my="5">
          <QMR.TextArea
            key={DC.CHANGE_IN_POP_EXPLANATION}
            name={DC.CHANGE_IN_POP_EXPLANATION}
            formLabelProps={{ fontWeight: "400" }}
            label={labels.DefinitionsOfPopulation.changeInPopExplanation}
          />
        </CUI.Box>
      )}
      <CUI.Box my="5">
        {populationTotalTechSpec && (
          <QMR.RadioButton
            key={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC}
            name={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC}
            formLabelProps={{ fontWeight: "600" }}
            label={
              labels.DefinitionsOfPopulation.measureEligiblePopDenom.question[
                coreSetType!
              ] ??
              labels.DefinitionsOfPopulation.measureEligiblePopDenom.question
                .default
            }
            options={[
              {
                displayValue:
                  labels.DefinitionsOfPopulation.measureEligiblePopDenom
                    .optionYes,
                value: DC.YES,
              },
              {
                displayValue:
                  labels.DefinitionsOfPopulation.measureEligiblePopDenom
                    .optionNo,
                value: DC.NO,
                children: [
                  <QMR.TextArea
                    key={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN}
                    name={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN}
                    label={parseLabelToHTML(
                      labels.DefinitionsOfPopulation.explainExcludedPop
                    )}
                  />,
                  <CUI.Box mt="10" key="DenominatorDefineTotalTechSpec-No-Size">
                    <QMR.NumberInput
                      key={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE}
                      name={DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE}
                      mask={allPositiveIntegers}
                      label={labels.DefinitionsOfPopulation.specSizeOfPop}
                    />
                  </CUI.Box>,
                ],
              },
            ]}
          />
        )}
      </CUI.Box>
      {(hybridMeasure || populationSampleSize) &&
        HybridDefinitions(!populationSampleSize)}
      {deliverySystems && (
        <CUI.Box mt="5">
          <CUI.Heading size="sm" as="h2" my="2">
            {"Which delivery systems are represented in the denominator?"}
          </CUI.Heading>
          <CUI.Text pb="2">
            Select all delivery systems that apply in your state (must select at
            least one); for each delivery system selected, enter the percentage
            of the measure-eligible population represented by that service
            delivery system.
          </CUI.Text>

          <QMR.Checkbox
            key={DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR}
            name={DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR}
            formLabelProps={{ fontWeight: "400" }}
            options={[
              {
                displayValue: "Fee-for-Service (FFS)",
                value: DC.FFS,
                children: [
                  <QMR.RadioButton
                    key={DC.DELIVERY_SYS_FFS}
                    name={DC.DELIVERY_SYS_FFS}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Is all of your measure-eligible Fee-for-Service (FFS) population included in this measure?"
                    options={[
                      {
                        displayValue:
                          "Yes, all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                        value: DC.YES,
                      },
                      {
                        displayValue:
                          "No, not all of our measure-eligible Fee-for-Service (FFS) population are included in this measure.",
                        value: DC.NO,
                        children: [
                          <QMR.NumberInput
                            key={DC.DELIVERY_SYS_FFS_NO_PERCENT}
                            name={DC.DELIVERY_SYS_FFS_NO_PERCENT}
                            formLabelProps={{ fontWeight: "400" }}
                            label="What percent of your measure-eligible Fee-for-Service (FFS) population are included in the measure?"
                            renderHelperTextAbove
                            helperText="The percentage provided here should represent the
                          percentage of the denominator population(s) included
                          in the measure (i.e., Medicaid, CHIP, etc.) that
                          receives items/services through the selected delivery
                          system. For example, if the population included in the
                          reported data represents all managed care enrollees
                          and half of your state’s fee-for-service enrollees,
                          select managed care, and select fee-for-service and
                          enter 50."
                            displayPercent
                            mask={percentageAllowOneDecimalMax}
                          />,
                        ],
                      },
                    ]}
                  />,
                ],
              },
              {
                displayValue: "Primary Care Case Management (PCCM)",
                value: DC.PCCM,
                children: [
                  <QMR.RadioButton
                    key={DC.DELIVERY_SYS_PCCM}
                    name={DC.DELIVERY_SYS_PCCM}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Is all of your measure-eligible Primary Care Case Management (PCCM) population included in this measure?"
                    options={[
                      {
                        displayValue:
                          "Yes, all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                        value: DC.YES,
                      },
                      {
                        displayValue:
                          "No, not all of our measure-eligible Primary Care Case Management (PCCM) population are included in this measure.",
                        value: DC.NO,
                        children: [
                          <QMR.NumberInput
                            key={DC.DELIVERY_SYS_PCCM_NO_PERCENT}
                            name={DC.DELIVERY_SYS_PCCM_NO_PERCENT}
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
                            formLabelProps={{ fontWeight: "400" }}
                            label="What percent of your measure-eligible Primary Care Case Management (PCCM) population are included in the measure?"
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
                value: DC.MCO_PIHP,
                children: [
                  <CUI.Box py="5" key="DeliverySys-MCO_PIHP-NumberOfPlans">
                    <QMR.NumberInput
                      key={DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS}
                      name={DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS}
                      formLabelProps={{ fontWeight: "400" }}
                      mask={allPositiveIntegers}
                      label="What is the number of Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) plans that are included in the reported data?"
                    />
                  </CUI.Box>,
                  <CUI.Box pt="5" key="DeliverySys-MCO_PIHP">
                    <QMR.RadioButton
                      key={DC.DELIVERY_SYS_MCO_PIHP}
                      name={DC.DELIVERY_SYS_MCO_PIHP}
                      formLabelProps={{ fontWeight: "400" }}
                      label="Is all of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population included in this measure?"
                      options={[
                        {
                          displayValue:
                            "Yes, all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                          value: DC.YES,
                        },
                        {
                          displayValue:
                            "No, not all of our measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are included in this measure.",
                          value: DC.NO,
                          children: [
                            <CUI.Text mb="5" key="AdditionalMCOIncludedText">
                              {
                                "What percent of your measure-eligible Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP) population are"
                              }
                              <CUI.Text as="i" fontWeight="600">
                                {" included "}
                              </CUI.Text>
                              {"in the measure?"}
                            </CUI.Text>,
                            <QMR.NumberInput
                              key={DC.DELIVERY_SYS_MCO_PIHP_NO_INC}
                              name={DC.DELIVERY_SYS_MCO_PIHP_NO_INC}
                              displayPercent
                              mask={percentageAllowOneDecimalMax}
                              renderHelperTextAbove
                              helperText="The percentage provided here should represent the percentage of the denominator population(s) included in the measure (i.e., Medicaid, CHIP, etc.) that receives items/services through the selected delivery system. For example, if the population included in the reported data represents all managed care enrollees and half of your state’s fee-for-service enrollees, select managed care, and select fee-for-service and enter 50."
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
                              key={DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL}
                              name={DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL}
                              mask={allPositiveIntegers}
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
                value: DC.ICM,
                children: [
                  <QMR.RadioButton
                    key={DC.DELIVERY_SYS_ICM}
                    name={DC.DELIVERY_SYS_ICM}
                    formLabelProps={{ fontWeight: "400" }}
                    label="Is all of your measure-eligible Integrated Care Models (ICM) population included in this measure?"
                    options={[
                      {
                        displayValue:
                          "Yes, all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                        value: DC.YES,
                      },
                      {
                        displayValue:
                          "No, not all of our measure-eligible Integrated Care Models (ICM) population are included in this measure.",
                        value: DC.NO,
                        children: [
                          <CUI.Text mb="5" key="AdditionalICMIncludedText">
                            {
                              "What percent of your measure-eligible Integrated Care Models (ICM) population are"
                            }
                            <CUI.Text as="i" fontWeight="600">
                              {" included "}
                            </CUI.Text>
                            {"in the measure?"}
                          </CUI.Text>,
                          <QMR.NumberInput
                            key={DC.DELIVERY_SYS_ICM_NO_PERCENT}
                            name={DC.DELIVERY_SYS_ICM_NO_PERCENT}
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
                            formLabelProps={{ fontWeight: "400" }}
                          />,
                          <CUI.Box py="5" key="AdditionalICMText">
                            <CUI.Text my="5" key="AdditionalMCOExcludedText">
                              {" "}
                              {
                                "How many of your measure-eligible Integrated Care Models (ICM) plans are"
                              }
                              <CUI.Text as="i" fontWeight="600">
                                {" excluded "}
                              </CUI.Text>
                              {
                                "from the measure? If none are excluded, please enter zero."
                              }
                            </CUI.Text>
                            <QMR.NumberInput
                              key={DC.DELIVERY_SYS_ICM_NO_POP}
                              name={DC.DELIVERY_SYS_ICM_NO_POP}
                              mask={allPositiveIntegers}
                              formLabelProps={{ fontWeight: "400" }}
                            />
                          </CUI.Box>,
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
                  <CUI.Box pb="5" key="DeliverySys-Other">
                    <QMR.TextArea
                      key={DC.DELIVERY_SYS_OTHER}
                      name={DC.DELIVERY_SYS_OTHER}
                      formLabelProps={{ fontWeight: "400" }}
                      label={parseLabelToHTML(
                        labels.DefinitionsOfPopulation.deliverySysOther
                      )}
                    />
                  </CUI.Box>,
                  <CUI.Box py="5" key="DeliverySys-Other-Percent">
                    <QMR.NumberInput
                      key={DC.DELIVERY_SYS_OTHER_PERCENT}
                      name={DC.DELIVERY_SYS_OTHER_PERCENT}
                      displayPercent
                      renderHelperTextAbove
                      helperText="The percentage provided here should represent the percentage
                    of the denominator population(s) included in the measure
                    (i.e., Medicaid, CHIP, etc.) that receives items/services
                    through the selected delivery system. For example, if the
                    population included in the reported data represents all
                    managed care enrollees and half of your state’s
                    fee-for-service enrollees, select managed care, and select
                    fee-for-service and enter 50."
                      mask={percentageAllowOneDecimalMax}
                      formLabelProps={{ fontWeight: "400" }}
                      label="Percentage of total other population represented in data reported:"
                    />
                  </CUI.Box>,
                  <CUI.Box py="5" key="DeliverySys-Other-NumberOfHealthPlans">
                    <QMR.NumberInput
                      key={DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS}
                      name={DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS}
                      mask={allPositiveIntegers}
                      formLabelProps={{ fontWeight: "400" }}
                      label="If applicable, list the number of Health Plans represented:"
                    />
                  </CUI.Box>,
                ],
              },
            ]}
          />
        </CUI.Box>
      )}
      {healthHomeMeasure && HealthHomeDefinitions()}
    </QMR.CoreQuestionWrapper>
  );
};
