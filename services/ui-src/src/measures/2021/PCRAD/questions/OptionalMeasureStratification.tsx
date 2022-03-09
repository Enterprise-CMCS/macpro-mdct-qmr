import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../types";
import { createContext, useState, useContext } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  ageGroups: {
    id: number;
    label: string;
  }[];
  deviationConditions?: {
    showModeratelyRates: boolean;
    showOtherPerformanceMeasureRates: boolean;
    showReversibleRates: boolean;
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
  const { ageGroups } = useContext(AgeDataContext);
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every((source) => source === "AdministrativeData") ?? true;

  return (
    <CUI.Box key={`${name}.contraceptionData`}>
      <QMR.Checkbox
        name={`${name}.contraceptionData`}
        key={`${name}.contraceptionData`}
        options={ageGroups.map((item, index) => {
          const label = index === 0 ? "moderate-method" : "reversible-method";
          return {
            value: item.label.replace(/ /g, ""),
            displayValue: item.label,
            children: [
              <CUI.Heading key={item.id} size="sm">
                Enter a number for the numerator and the denominator. Rate will
                auto-calculate:
              </CUI.Heading>,
              ...(!rateReadOnly
                ? [
                    <CUI.Heading pt="1" size={"sm"} key={`${item.id}-helper`}>
                      Please review the auto-calculated rate and revise if
                      needed.
                    </CUI.Heading>,
                  ]
                : []),
              <QMR.Rate
                readOnly={rateReadOnly}
                name={`${name}.subRates.${item.id}.${label}`}
                key={`${name}.subRates.${item.id}.${label}`}
                rates={[
                  {
                    id: 1,
                  },
                ]}
              />,
            ],
          };
        })}
      />
    </CUI.Box>
  );
};

const configInitialStateArray = (template: string, dataArray?: string[]) => {
  return dataArray?.length
    ? dataArray.map((_, i) => `${template}.${i}`)
    : [`${template}.0`];
};

const advancedConfigInitialStateArray = (
  template: string,
  parentArray?: string[],
  dataArray?: { titles: string[] }[]
) => {
  const defaultTemplate = `${template}.0`;
  return dataArray?.length
    ? dataArray.map((item) =>
        item?.titles?.length
          ? item.titles.map((_, index) => `${template}.${index}`)
          : [defaultTemplate]
      )
    : parentArray?.length
    ? parentArray.map((_, index) => [`${template}.${index}`])
    : [[defaultTemplate]];
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

  const [addtnlNonHispanicRaceSubCat, setaddtnlNonHispanicRaceSubCat] =
    useState(
      advancedConfigInitialStateArray(
        "AddtnlNonHispanicRaceSubCatTitle",
        values.AddtnlNonHispanicRace,
        values.AddtnlNonHispanicRaceSubCatTitle
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

  const addNonHispanicRaceSubCat = (index: number) => {
    setaddtnlNonHispanicRaceSubCat((oldArray) => {
      const newArray = [...oldArray];
      newArray[index] ??= [];
      newArray[index] = [
        ...newArray[index],
        `AddtnlNonHispanicRaceSubCatTitle.${newArray[index].length}`,
      ];
      return newArray;
    });
  };
  const addNonHispanicRace = () => {
    addNonHispanicRaceSubCat(addtnlNonHispanicRace.length);
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
                      children: [<AgeData {...register("NHRC-WhiteRates")} />],
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
                            <AgeData
                              name={`AddtnlNonHispanicRaceRates.${index}`}
                              key={`AddtnlNonHispanicRaceRates.${index}`}
                            />
                            <QMR.Checkbox
                              name={
                                "AddtnlNonHispanicRaceSubCatOptions." + index
                              }
                              key={
                                "AddtnlNonHispanicRaceSubCatOptions." + index
                              }
                              options={
                                addtnlNonHispanicRaceSubCat[index]
                                  ? addtnlNonHispanicRaceSubCat[index]?.map(
                                      (_, subIndex) => {
                                        return {
                                          value: `AddtnlRaceSubCatOptions.${index}.${subIndex}`,
                                          displayValue:
                                            "Additional/Alternative Classification/Sub-Category",
                                          children: [
                                            <CUI.Stack
                                              key={`NonHispanicSubCatStack.${index}.${subIndex}`}
                                            >
                                              <QMR.TextInput
                                                rules={{ required: true }}
                                                label="Define the Alternative Classification/Sub-category"
                                                name={`AddtnlNonHispanicRaceSubCatTitle.${index}.titles.${subIndex}`}
                                              />
                                              <AgeData
                                                name={`AddtnlNonHispanicRaceSubCatRates.${index}.rates.${subIndex}`}
                                              />
                                              {subIndex + 1 ===
                                                addtnlNonHispanicRaceSubCat[
                                                  index
                                                ].length && (
                                                <AddAnotherButton
                                                  key="NonHispanicRaceSubCatAddition"
                                                  onClick={() => {
                                                    addNonHispanicRaceSubCat(
                                                      index
                                                    );
                                                  }}
                                                  additionalText="Sub-Category"
                                                />
                                              )}
                                            </CUI.Stack>,
                                          ],
                                        };
                                      }
                                    )
                                  : []
                              }
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
                      value: "AdditionalGeography",
                      displayValue: "Additional Geography",
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
