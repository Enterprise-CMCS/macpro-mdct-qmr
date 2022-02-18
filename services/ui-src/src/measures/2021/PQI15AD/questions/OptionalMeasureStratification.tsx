import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { createContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import { positiveNumbersWithMaxDecimalPlaces } from "utils/numberInputMasks";

interface Props {
  ageGroups: {
    id: number;
    label: string;
  }[];
  deviationConditions?: {
    showAges18To64: boolean;
    showAges65AndOlder: boolean;
    showOtherPerformanceMeasureRates: boolean;
  };
}

interface SubComponentProps {
  name: string;
  includeRate?: boolean;
}

export const DefaultOptionalMeasureStratProps: Props = {
  ageGroups: [
    { label: "Ages 18 to 64", id: 0 },
    { label: "Ages 65 and older", id: 1 },
  ],
};

const IndepententAsianOptions = [
  { label: "Asian Indian", id: 0 },
  { label: "Chinese", id: 1 },
  { label: "Filipino", id: 2 },
  { label: "Japanese", id: 3 },
  { label: "Korean", id: 4 },
  { label: "Vietnamese", id: 5 },
  { label: "Other Asian", id: 6 },
];

const IndependentHawaiianOtherPacificOptions = [
  { label: "Native Hawaiian", id: 0 },
  { label: "Guamanian or Chamorro", id: 1 },
  { label: "Samoan", id: 2 },
  { label: "Other Pacific Islander", id: 3 },
];

const IndependentEthnicityOptions = [
  "Mexican, Mexican American, Chicano/a",
  "Puerto Rican",
  "Cuban",
  "Another Hispanic, Latino/a or Spanish origin",
];

const AgeDataContext = createContext<Props>({
  ...DefaultOptionalMeasureStratProps,
});

const AddAnotherButton = ({
  onClick,
  additionalText = "",
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  additionalText?: string;
}) => {
  return (
    <CUI.Box mt="4">
      <QMR.ContainedButton
        buttonText={"+ Add Another " + additionalText}
        buttonProps={{
          variant: "outline",
          colorScheme: "blue",
          textTransform: "capitalize",
        }}
        onClick={onClick}
      />
    </CUI.Box>
  );
};

const AgeData = ({ name }: SubComponentProps) => {
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;

  return (
    <CUI.Box key={`${name}.ageData`}>
      <CUI.Heading size="sm">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Heading>

      <QMR.Rate
        rateMultiplicationValue={100000}
        customMask={positiveNumbersWithMaxDecimalPlaces(1)}
        readOnly={rateReadOnly}
        name={`${name}.subRates`}
        key={`${name}.subRates`}
        rates={[
          {
            id: 0,
            label: "",
          },
        ]}
      />
      <QMR.Checkbox
        name={`${name}.AdditionalClassification`}
        options={[
          {
            value: "Additional Classification Used",
            displayValue: "Additional/Alternative Classification/Sub-category",
            children: [
              <QMR.TextInput
                rules={{ required: true }}
                label="Define the Alternative Classification/Sub-category"
                name={`${name}.AdditionalClassificationDescription`}
              />,
            ],
          },
        ]}
      />
    </CUI.Box>
  );
};

const NonHispanicSubCat = ({ name }: SubComponentProps) => {
  const { watch } = useFormContext<Measure.Form>();
  const { getValues } = useFormContext<Measure.Form>();
  const values = getValues();

  const [addtnlNonHispanicRaceSubCat, setaddtnlNonHispanicRaceSubCat] =
    useState(
      configInitialStateArray(
        "AddtnlNonHispanicRaceSubCat",
        values.AddtnlNonHispanicRaceSubCat
      )
    );

  const addWhiteRaceCat = () => {
    setaddtnlNonHispanicRaceSubCat((oldArray) => [
      ...oldArray,
      `AddtnlNonHispanicRaceSubCat.${oldArray.length}`,
    ]);
  };
  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;

  return (
    <CUI.Box key={`${name}.ageData`}>
      <CUI.Heading size="sm">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Heading>

      <QMR.Rate
        rateMultiplicationValue={100000}
        customMask={positiveNumbersWithMaxDecimalPlaces(1)}
        readOnly={rateReadOnly}
        name={`${name}.subRates`}
        key={`${name}.subRates`}
        rates={[
          {
            id: 0,
            label: "",
          },
        ]}
      />
      <QMR.Checkbox
        name={`${name}.AdditionalClassification`}
        options={[
          {
            value: "Additional Classification Used",
            displayValue: "Additional/Alternative Classification/Sub-category",
            children: addtnlNonHispanicRaceSubCat.map((_, idx: number) => {
              return (
                <>
                  <QMR.TextInput
                    rules={{ required: true }}
                    label="Define the Alternative Classification/Sub-category"
                    name={`${name}.AdditionalClassificationDescription.${idx}`}
                  />

                  <QMR.Rate
                    rateMultiplicationValue={100000}
                    customMask={positiveNumbersWithMaxDecimalPlaces(1)}
                    readOnly={rateReadOnly}
                    name={`${name}.AdditionalClassificationRate.${idx}`}
                    key={`${name}.AdditionalClassificationRate.${idx}`}
                    rates={[
                      {
                        id: 0,
                        label:
                          "Enter a number for the numerator and the denominator. Rate will auto-calculate:",
                      },
                    ]}
                  />
                  {idx === addtnlNonHispanicRaceSubCat.length - 1 && (
                    <AddAnotherButton
                      key={`${name}.AdditionalClassificationRate-Other`}
                      onClick={addWhiteRaceCat}
                    />
                  )}
                </>
              );
            }),
          },
        ]}
      />
    </CUI.Box>
  );
};

const configInitialStateArray = (template: string, dataArray?: string[]) => {
  return dataArray?.length
    ? dataArray.map((_, i) => `${template}.${i}`)
    : [`${template}.0`];
};

export const OptionalMeasureStratification = ({
  ageGroups,
  deviationConditions,
}: Props) => {
  const register = useCustomRegister<Measure.Form>();
  const { getValues } = useFormContext<Measure.Form>();
  const values = getValues();

  const [addtnlNonHispanicRace, setAddtnlNonHispanicRace] = useState(
    configInitialStateArray(
      "AddtnlNonHispanicRace",
      values.AddtnlNonHispanicRace
    )
  );

  const [addtnlEthnicity, setAddtnlEthnicity] = useState(
    configInitialStateArray("AddtnlEthnicity", values.AddtnlEthnicity)
  );
  const [addtnlPrimaryLanguages, setAddtnlPrimaryLanguages] = useState(
    configInitialStateArray(
      "AddtnlPrimaryLanguage",
      values.AddtnlPrimaryLanguage
    )
  );

  const addNonHispanicRace = () => {
    setAddtnlNonHispanicRace((oldArray) => [
      ...oldArray,
      `AddtnlNonHispanicRace.${oldArray.length}`,
    ]);
  };
  const addEthnicity = () => {
    setAddtnlEthnicity((oldArray) => [
      ...oldArray,
      `AddtnlEthnicity.${oldArray.length}`,
    ]);
  };
  const addPrimaryLanguage = () => {
    setAddtnlPrimaryLanguages((oldArray) => [
      ...oldArray,
      `AddtnlPrimaryLanguage.${oldArray.length}`,
    ]);
  };

  return (
    <AgeDataContext.Provider value={{ ageGroups, deviationConditions }}>
      <QMR.CoreQuestionWrapper label="Optional Measure Stratification">
        <CUI.Text py="3">
          If this measure is also reported by additional
          classifications/sub-categories, e.g. racial, ethnic, sex, language,
          disability status, or geography, complete the following as applicable.
          If your state reported for classifications/sub-categories other than
          those listed below, or reported for different rate sets, please click
          on “Add Another” to add Additional/Alternative
          Classification/Sub-categories as needed.
        </CUI.Text>
        <CUI.Text py="3">
          Do not select categories and sub-classifications for which you will
          not be reporting any data. If a sub-classification is selected, the
          system will enter zeros by default and report this as the data for
          your state/territory.
        </CUI.Text>
        <QMR.Checkbox
          label="Check all that apply"
          {...register("CategoriesReported")}
          options={[
            {
              value: "NonHispanic",
              displayValue: "Race (Non-Hispanic)",
              children: [
                <QMR.Checkbox
                  {...register("NonHispanicRacialCategories")}
                  options={[
                    {
                      value: "White",
                      displayValue: "White",
                      children: [
                        <NonHispanicSubCat {...register("NHRC-WhiteRates")} />,
                      ],
                    },
                    {
                      value: "BlackOrAfricanAmerican",
                      displayValue: "Black or African American",
                      children: [
                        <AgeData
                          {...register("NHRC-BlackOrAfricanAmericanRates")}
                        />,
                      ],
                    },
                    {
                      value: "AmericanIndianOrAlaskaNative",
                      displayValue: "American Indian or Alaska Native",
                      children: [
                        <AgeData
                          {...register(
                            "NHRC-AmericanIndianOrAlaskaNativeRates"
                          )}
                        />,
                      ],
                    },
                    {
                      value: "Asian",
                      displayValue: "Asian",
                      children: [
                        <QMR.RadioButton
                          {...register("AsianIndependentReporting")}
                          renderHelperTextAbove
                          helperText="Are you only reporting aggregated data for all Asian categories?"
                          options={[
                            {
                              value: "YesAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregated data for all Asian categories.",
                              children: [
                                <AgeData
                                  {...register("NHRC-AggregateAsianRates")}
                                />,
                              ],
                            },
                            {
                              value: "NoIndependent",
                              displayValue:
                                "No, we are reporting independent data for all Asian categories.",
                              children: [
                                <QMR.Checkbox
                                  {...register("IndependentAsianOptions")}
                                  options={[
                                    ...IndepententAsianOptions.map((item) => {
                                      return {
                                        value: item.label.replace(/ /g, ""),
                                        displayValue: item.label,
                                        children: [
                                          <AgeData
                                            key={`NHRC-IndependentAsianRates.${item.id}`}
                                            name={`NHRC-IndependentAsianRates.${item.id}`}
                                          />,
                                        ],
                                      };
                                    }),
                                  ]}
                                />,
                              ],
                            },
                          ]}
                        />,
                      ],
                    },
                    {
                      value: "Hawaiian",
                      displayValue: "Native Hawaiian or Other Pacific Islander",
                      children: [
                        <QMR.RadioButton
                          {...register("NativeHawaiianIndependentReporting")}
                          renderHelperTextAbove
                          helperText="Are you only reporting aggregated data for all Native Hawaiian or Other Pacific Islander categories?"
                          options={[
                            {
                              value: "YesAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregated data for all Native Hawaiian or Other Pacific Islander categories?",
                              children: [
                                <AgeData
                                  {...register(
                                    "NHRC-AggregateHawaiianOrPacificIslanderRates"
                                  )}
                                />,
                              ],
                            },
                            {
                              value: "NoIndependent",
                              displayValue:
                                "No, we are reporting independent data for all Native Hawaiian or Other Pacific Islander categories?",
                              children: [
                                <QMR.Checkbox
                                  {...register(
                                    "IndependentNativeHawaiianOptions"
                                  )}
                                  options={[
                                    ...IndependentHawaiianOtherPacificOptions.map(
                                      (item) => {
                                        return {
                                          value: item.label.replace(/ /g, ""),
                                          displayValue: item.label,
                                          children: [
                                            <AgeData
                                              key={`NHRC-IndependentHawaiianOrPacificIslanderRates.${item.id}`}
                                              name={`NHRC-IndependentHawaiianOrPacificIslanderRates.${item.id}`}
                                            />,
                                          ],
                                        };
                                      }
                                    ),
                                  ]}
                                />,
                              ],
                            },
                          ]}
                        />,
                      ],
                    },
                    ...addtnlNonHispanicRace.map((value, index) => {
                      return {
                        value: value,
                        displayValue: "Additional Race",
                        children: [
                          <CUI.Stack key={`${value}.${index}`}>
                            <QMR.TextInput
                              rules={{ required: true }}
                              label="Define the additional Race"
                              name={`AddtnlNonHispanicRace.${index}`}
                            />

                            {index + 1 === addtnlNonHispanicRace.length && (
                              <AddAnotherButton
                                key="NonHispanicRaceAddition"
                                onClick={addNonHispanicRace}
                              />
                            )}
                          </CUI.Stack>,
                        ],
                      };
                    }),
                  ]}
                />,
              ],
            },
            {
              value: "Ehnicity",
              displayValue: "Ethnicity",
              children: [
                <QMR.Checkbox
                  {...register("EthnicityCategories")}
                  options={[
                    {
                      value: "NonHispanicLatinoSpanish",
                      displayValue:
                        "Not of Hispanic, Latino/a, or Spanish origin",
                      children: [
                        <AgeData {...register("NonHispanicEthnicityRates")} />,
                      ],
                    },
                    {
                      value: "HispanicLatino",
                      displayValue: "Hispanic or Latino",
                      children: [
                        <QMR.RadioButton
                          {...register("HispanicIndependentReporting")}
                          renderHelperTextAbove
                          helperText="Are you only reporting aggregated data for all Hispanic, Latino/a, or Spanish origin categories?"
                          options={[
                            {
                              value: "YesHispanicAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregated data for all Hispanic, Latino/a, or Spanish origin categories.",
                              children: [
                                <AgeData
                                  {...register(
                                    "HispanicEthnicityAggregateRate"
                                  )}
                                />,
                              ],
                            },
                            {
                              value: "NoHispanicIndependent",
                              displayValue:
                                "No, we are reporting independent data for all Hispanic, Latino/a, or Spanish origin categories.",
                              children: [
                                <QMR.Checkbox
                                  {...register("EthnicitySubCategories")}
                                  options={[
                                    ...IndependentEthnicityOptions.map(
                                      (value, index) => {
                                        return {
                                          value: value.replace(/,| |\//g, ""),
                                          displayValue: value,
                                          children: [
                                            <AgeData
                                              name={`IndependentHispanicRates.${index}`}
                                              key={`IndependentHispanicRates.${index}`}
                                            />,
                                          ],
                                        };
                                      }
                                    ),
                                  ]}
                                />,
                              ],
                            },
                          ]}
                        />,
                      ],
                    },
                    ...addtnlEthnicity.map((value, index) => {
                      return {
                        value: value,
                        displayValue: "Additional Ethnicity",
                        children: [
                          <CUI.Box mb="4" key={`AddtnlEthnicity.${index}Box`}>
                            <QMR.TextInput
                              name={`AddtnlEthnicity.${index}`}
                              key={`${value}.${index}`}
                              label="Define the Additional Ethnicity"
                            />
                          </CUI.Box>,
                        ],
                      };
                    }),
                  ]}
                />,
                <AddAnotherButton
                  key="EthnicityAddition"
                  onClick={addEthnicity}
                />,
              ],
            },
            {
              value: "Sex",
              displayValue: "Sex",
              children: [
                <QMR.Checkbox
                  {...register("SexOptions")}
                  options={[
                    {
                      value: "Male",
                      displayValue: "Male",
                    },
                    {
                      value: "Female",
                      displayValue: "Female",
                    },
                  ]}
                />,
              ],
            },
            {
              value: "PrimaryLanguageIncSignLanguage",
              displayValue: "Primary Language (including sign language)",
              children: [
                <QMR.Checkbox
                  {...register("PrimaryLanguageOptions")}
                  options={[
                    {
                      value: "English",
                      displayValue: "English",
                    },
                    {
                      value: "Spanish",
                      displayValue: "Spanish",
                    },
                    ...addtnlPrimaryLanguages.map((value, index) => {
                      return {
                        value: value,
                        displayValue: "Additional Primary Language",
                        children: [
                          <CUI.Box mb="4" key={`${value}.${index}Box`}>
                            <QMR.TextInput
                              key={`${value}.${index}`}
                              label="Define the Additional Primary Language"
                              name={`AddtnlPrimaryLanguage.${index}`}
                            />
                          </CUI.Box>,
                        ],
                      };
                    }),
                  ]}
                />,
                <AddAnotherButton
                  key="PrimaryLanguageAddition"
                  onClick={addPrimaryLanguage}
                />,
              ],
            },
            {
              value: "DisabilityStatus",
              displayValue: "Disability Status",
              children: [
                <QMR.Checkbox
                  {...register("DisabilityStatusOptions")}
                  options={[
                    {
                      value: "SSI",
                      displayValue: "SSI",
                    },
                    {
                      value: "Non-SSI",
                      displayValue: "Non-SSI",
                    },
                    {
                      value: "AdditionalDisabilityStatus",
                      displayValue: "Additional Disability Status",
                      children: [
                        <CUI.Box mb="4" key={"AddtnlDisabilityStatusDescBox"}>
                          <QMR.TextInput
                            {...register("AddtnlDisabilityStatusDesc")}
                            label="Define the Additional Disability Status"
                          />
                        </CUI.Box>,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              value: "Geography",
              displayValue: "Geography",
              children: [
                <QMR.Checkbox
                  {...register("GeographyOptions")}
                  options={[
                    {
                      value: "Urban",
                      displayValue: "Urban",
                    },
                    {
                      value: "Rural",
                      displayValue: "Rural",
                    },
                    {
                      value: "AdditionalGeography",
                      displayValue: "Additional Geography",
                      children: [
                        <CUI.Box mb="4" key="AddtnlGeographyDescWrapper">
                          <QMR.TextInput
                            {...register("AddtnlGeographyDesc")}
                            label="Define the Additional Geography"
                          />
                        </CUI.Box>,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              value: "ACAGroup",
              displayValue: "Adult Eligibility Group (ACA Expansion Group)",
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
    </AgeDataContext.Provider>
  );
};
