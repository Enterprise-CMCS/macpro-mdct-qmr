import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { createContext, useState, useContext } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  ageGroups: {
    id: number;
    label: string;
  }[];
  deviationConditions?: {
    show30DaysAges18To64: boolean;
    show30DaysAges65AndOlder: boolean;
    show7DaysAges18To64: boolean;
    show7DaysAges65AndOlder: boolean;
  };
}

interface SubComponentProps {
  name: string;
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
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <CUI.Box mt="4">
      <QMR.ContainedButton
        buttonText={"+ Add Another"}
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
  const { ageGroups, deviationConditions } = useContext(AgeDataContext);
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data"
    ) ?? true;

  return (
    <CUI.Box key={`${name}.ageData`}>
      <QMR.Checkbox
        name={`${name}.ageData`}
        key={`${name}.ageData`}
        options={ageGroups.map((item) => {
          return {
            value: item.label.replace(/ /g, ""),
            displayValue: item.label,
            children: [
              <CUI.Heading key={item.id} size="sm">
                Enter a number for the numerator and the denominator. Rate will
                auto-calculate:
              </CUI.Heading>,
              // Dynamically hide or show children based on if performance measure 30days/age sections were completed
              ...((deviationConditions?.show30DaysAges18To64 &&
                item.id === 0) ||
              (deviationConditions?.show30DaysAges65AndOlder && item.id === 1)
                ? [
                    <QMR.Rate
                      readOnly={rateReadOnly}
                      name={`${name}.subRates.${item.id}.followUpWithin30Days`}
                      key={`${name}.subRates.${item.id}.followUpWithin30Days`}
                      rates={[
                        {
                          id: 0,
                          label: "Follow-up within 30 days of ED visit",
                        },
                      ]}
                    />,
                  ]
                : []),
              // Dynamically hide or show children based on if performance measure 7days/age sections were completed
              ...((deviationConditions?.show7DaysAges18To64 && item.id === 0) ||
              (deviationConditions?.show7DaysAges65AndOlder && item.id === 1)
                ? [
                    <QMR.Rate
                      readOnly={rateReadOnly}
                      name={`${name}.subRates.${item.id}.followUpWithin7Days`}
                      key={`${name}.subRates.${item.id}.followUpWithin7Days`}
                      rates={[
                        {
                          id: 1,
                          label: "Follow-up within 7 days of ED visit",
                        },
                      ]}
                    />,
                  ]
                : []),
            ],
          };
        })}
      />
    </CUI.Box>
  );
};

export const OptionalMeasureStratification = ({
  ageGroups,
  deviationConditions,
}: Props) => {
  const register = useCustomRegister<Measure.Form>();

  const [addtnlNonHispanicRace, setAddtnlNonHispanicRace] = useState([
    "AddtnlNonHispanicRace.0",
  ]);
  const [addtnlNonHispanicSubCat, setAddtnlNonHispanicSubCat] = useState([
    "AddtnlNonHispanicSubCat.0",
  ]);
  const [addtnlEthnicity, setAddtnlEthnicity] = useState(["AddtnlEthnicity.0"]);
  const [addtnlPrimaryLanguages, setAddtnlPrimaryLanguages] = useState([
    "AddtnlPrimaryLanguage.0",
  ]);

  const addNonHispanicRace = () => {
    setAddtnlNonHispanicRace((oldArray) => [
      ...oldArray,
      `AddtnlNonHispanicRace.${oldArray.length}`,
    ]);
  };
  const addNonHispanicSubCat = () => {
    setAddtnlNonHispanicSubCat((oldArray) => [
      ...oldArray,
      `AddtnlNonHispanicSubCat.${oldArray.length}`,
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
                      children: [<AgeData {...register("NHRC-WhiteRates")} />],
                    },
                    ...addtnlNonHispanicSubCat.map((value, index) => {
                      return {
                        value: value,
                        displayValue:
                          "Additional/Alternative Classification/Sub-category",
                        children: [
                          <CUI.Stack key={`${value}.${index}`}>
                            <QMR.TextInput
                              label="Define the Alternative Classification/Sub-category"
                              name={`AddtnlNonHispanicSubCat.${index}`}
                            />
                            <AgeData
                              name={`AddtnlNonHispanicSubCatRates.${index}`}
                            />
                            {index + 1 === addtnlNonHispanicSubCat.length && (
                              <AddAnotherButton
                                key="NonHispanicSubCatAddition"
                                onClick={addNonHispanicSubCat}
                              />
                            )}
                          </CUI.Stack>,
                        ],
                      };
                    }),
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
                          helperText="Are you only reporting aggregrated data for all Asian categories?"
                          options={[
                            {
                              value: "YesAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregrated data for all Asian categories.",
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
                          helperText="Are you only reporting aggregrated data for all Native Hawaiian or Other Pacific Islander categories?"
                          options={[
                            {
                              value: "YesAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregrated data for all Native Hawaiian or Other Pacific Islander categories?",
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
                              label="Define the additional Race"
                              name={`AddtnlNonHispanicRace.${index}`}
                            />
                            <QMR.RadioButton
                              name={`AddtnlNonHispanicRaceAggregation.${index}`}
                              key={`AddtnlNonHispanicRaceAggregation.${index}`}
                              label="Are you only reporting aggregrated data for all additional race categories?"
                              options={[
                                {
                                  value: `YesAggregateAddttnlNHR-i${index}`,
                                  displayValue:
                                    "Yes, we are only reporting aggregrated data for all additional race categories.",
                                  children: [
                                    <AgeData
                                      name={`AddtnlNonHispanicRaceRates.${index}`}
                                      key={`AddtnlNonHispanicRaceRates.${index}`}
                                    />,
                                  ],
                                },
                                {
                                  value: `NoIndependentAddtnlNHR-i${index}`,
                                  displayValue:
                                    "No, we are reporting independent data for all additional race categories.",
                                  children: [
                                    <AgeData
                                      name={`AddtnlNonHispanicRaceRates.${index}`}
                                      key={`AddtnlNonHispanicRaceRates.${index}`}
                                    />,
                                  ],
                                },
                              ]}
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
                          helperText="Are you only reporting aggregrated data for all Hispanic, Latino/a, or Spanish origin categories?"
                          options={[
                            {
                              value: "YesHispanicAggregate",
                              displayValue:
                                "Yes, we are only reporting aggregrated data for all Hispanic, Latino/a, or Spanish origin categories.",
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
                                  {...register("EthnicityCategories")}
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
                          <AgeData
                            name={`AddtnlEthnicityRates.${index}`}
                            key={`AddtnlEthnicityRates.${index}`}
                          />,
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
                      children: [<AgeData {...register("MaleSexRates")} />],
                    },
                    {
                      value: "Female",
                      displayValue: "Female",
                      children: [<AgeData {...register("FemaleSexRates")} />],
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
                      children: [
                        <AgeData {...register("EnglishLanguageRate")} />,
                      ],
                    },
                    {
                      value: "Spanish",
                      displayValue: "Spanish",
                      children: [
                        <AgeData {...register("SpanishLanguageRate")} />,
                      ],
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
                          <AgeData
                            name={`AddtnlPrimaryLanguageRates.${index}`}
                            key={`AddtnlPrimaryLanguageRates.${index}`}
                          />,
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
                      children: [
                        <AgeData {...register("DisabilitySSIRate")} />,
                      ],
                    },
                    {
                      value: "Non-SSI",
                      displayValue: "Non-SSI",
                      children: [
                        <AgeData {...register("DisabilityNonSSIRate")} />,
                      ],
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
                        <AgeData {...register("AddtnlDisabilityRate")} />,
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
                      children: [
                        <AgeData {...register("UrbanGeographyRate")} />,
                      ],
                    },
                    {
                      value: "Rural",
                      displayValue: "Rural",
                      children: [
                        <AgeData {...register("RuralGeographyRate")} />,
                      ],
                    },
                    {
                      value: "AdditonalGeography",
                      displayValue: "Additonal Geography",
                      children: [
                        <CUI.Box mb="4" key="AddtnlGeographyDescWrapper">
                          <QMR.TextInput
                            {...register("AddtnlGeographyDesc")}
                            label="Define the Additional Geography"
                          />
                        </CUI.Box>,
                        <AgeData {...register("AddtnlGeographyRate")} />,
                      ],
                    },
                  ]}
                />,
              ],
            },
            {
              value: "ACAGroup",
              displayValue: "Adult Eligibility Group (ACA Expansion Group)",
              children: [<AgeData {...register("ACAGroupRate")} />],
            },
          ]}
        />
      </QMR.CoreQuestionWrapper>
    </AgeDataContext.Provider>
  );
};
