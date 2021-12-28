import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "measures/types";
import { useState } from "react";

interface Props {
  ageGroups: {
    id: number;
    label: string;
  }[];
  totalLabel: string;
}

interface SubComponentProps extends Props {
  name: string;
}

export const DefaultOptionalMeasureStratProps: Props = {
  ageGroups: [
    { label: "Ages 5 to 11", id: 0 },
    { label: "Ages 12 to 18", id: 1 },
  ],
  totalLabel: "Total (Ages 5 to 18)",
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

const AddAnotherButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <QMR.ContainedButton
      buttonText={"+ Add Another"}
      buttonProps={{
        variant: "outline",
        colorScheme: "blue",
        textTransform: "capitalize",
      }}
      onClick={onClick}
    />
  );
};

const AgeData = ({ name, ageGroups, totalLabel }: SubComponentProps) => {
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
              <QMR.Rate
                name={`${name}.subRates.${item.id}`}
                key={`${name}.subRates.${item.id}`}
                rates={[
                  {
                    id: 0,
                    label:
                      "Enter a number for the numerator and the denominator. Rate will auto-calculate:",
                  },
                ]}
              />,
            ],
          };
        })}
      />
      <CUI.Text mt="5" key={`${name}.totalLabel`}>
        {totalLabel}
      </CUI.Text>
      <CUI.Box ml="5" key={`${name}.totalLabelRateBox`}>
        <QMR.Rate
          name={`${name}.total`}
          rates={[
            {
              id: 0,
              label:
                "Enter a number for the numerator and the denominator. Rate will auto-calculate:",
            },
          ]}
        />
      </CUI.Box>
    </CUI.Box>
  );
};

export const OptionalMeasureStratification = ({
  ageGroups,
  totalLabel,
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
    <QMR.CoreQuestionWrapper label="Optional Measure Stratification">
      <CUI.Text py="3">
        If this measure is also reported by additional
        classifications/sub-categories, e.g. racial, ethnic, sex, language,
        disability status, or geography, complete the following as applicable.
        If your state reported for classifications/sub-categories other than
        those listed below, or reported for different rate sets, please click on
        “Add Another” to add Additional/Alternative
        Classification/Sub-categories as needed.
      </CUI.Text>
      <CUI.Text py="3">
        Do not select categories and sub-classifications for which you will not
        be reporting any data. If a sub-classification is selected, the system
        will enter zeros by default and report this as the data for your
        state/territory.
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
                      <AgeData
                        {...register("NHRC-WhiteRates")}
                        ageGroups={ageGroups}
                        totalLabel={totalLabel}
                      />,
                    ],
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
                            ageGroups={ageGroups}
                            totalLabel={totalLabel}
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
                        ageGroups={ageGroups}
                        totalLabel={totalLabel}
                      />,
                    ],
                  },
                  {
                    value: "AmericanIndianOrAlaskaNative",
                    displayValue: "American Indian or Alaska Native",
                    children: [
                      <AgeData
                        {...register("NHRC-AmericanIndianOrAlaskaNativeRates")}
                        ageGroups={ageGroups}
                        totalLabel={totalLabel}
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
                                ageGroups={ageGroups}
                                totalLabel={totalLabel}
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
                                          ageGroups={ageGroups}
                                          totalLabel={totalLabel}
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
                                ageGroups={ageGroups}
                                totalLabel={totalLabel}
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
                                            ageGroups={ageGroups}
                                            totalLabel={totalLabel}
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
                          <AgeData
                            name={`AddtnlNonHispanicRaceRates.${index}`}
                            ageGroups={ageGroups}
                            totalLabel={totalLabel}
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
                    value: "Not of Hispanic, Latino/a, or Spanish origin",
                    displayValue: "NonHispanicLatinoSpanish",
                  },
                  {
                    value: "Hispanic or Latino",
                    displayValue: "HispanicLatino",
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
                                    (value) => {
                                      return {
                                        value: value.replace(/,| |\//g, ""),
                                        displayValue: value,
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
                        <QMR.TextInput
                          name={`AddtnlEthnicity.${index}`}
                          key={`${value}.${index}`}
                          label="Define the Additional Ethnicity"
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
                  { value: "Male", displayValue: "Male" },
                  { value: "Female", displayValue: "Female" },
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
                        <QMR.TextInput
                          key={`${value}.${index}`}
                          name={`AddtnlPrimaryLanguage.${index}`}
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
                  { value: "SSI", displayValue: "SSI" },
                  { value: "Non-SSI", displayValue: "Non-SSI" },
                  {
                    value: "AdditionalDisabilityStatus",
                    displayValue: "Additional Disability Status",
                    children: [
                      <QMR.TextInput
                        {...register("AddtnlDisabilityStatusDesc")}
                        label="Define the Additional Disability Status"
                      />,
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
                  { value: "Urban", displayValue: "Urban" },
                  { value: "Rural", displayValue: "Rural" },
                  {
                    value: "AdditonalGeography",
                    displayValue: "Additonal Geography",
                    children: [
                      <QMR.TextInput
                        {...register("AddtnlGeographyDesc")}
                        label="Define the Additional Geography"
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
