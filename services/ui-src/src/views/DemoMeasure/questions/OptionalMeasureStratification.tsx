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

const RaceAgeData = ({ name, ageGroups, totalLabel }: SubComponentProps) => {
  return (
    <>
      <QMR.Checkbox
        name={`${name}.ageData`}
        options={ageGroups.map((item) => {
          return {
            value: item.label.replace(/ /g, ""),
            displayValue: item.label,
            children: [
              <QMR.SinglePreCalcRate
                name={`${name}.${item.id}`}
                label="Enter a number for the numerator and the denominator. Rate will auto-calculate:"
              />,
            ],
          };
        })}
      />
      <CUI.Text>{totalLabel}</CUI.Text>
      <CUI.Box ml="5">
        <QMR.SinglePreCalcRate
          name={`${name}.total`}
          label="Enter a number for the numerator and the denominator. Rate will auto-calculate:"
        />
      </CUI.Box>
    </>
  );
};

export const OptionalMeasureStratification = ({
  ageGroups,
  totalLabel,
}: Props) => {
  const register = useCustomRegister<Measure.Form>();
  const { name: EthnicityFormName } = register("AddtnlEthnicity");
  const { name: NonHispanicRaceFormName } = register("AddtnlNonHispanicRace");
  const { name: NonHispanicSubCatFormName } = register(
    "AddtnlNonHispanicSubCat"
  );

  const [addtnlNonHispanicRace, setAddtnlNonHispanicRace] = useState([
    "AddtnlNonHispanicRace.0",
  ]);
  const [addtnlNonHispanicSubCat, setAddtnlNonHispanicSubCat] = useState([
    "AdditionalNonHispanicSubCat.0",
  ]);
  const [addtnlEthnicity, setAddtnlEthnicity] = useState(["AddtnlEthnicity.0"]);

  const addNonHispanicRace = () => {
    setAddtnlNonHispanicRace((oldArray) => [
      ...oldArray,
      `AdditionalNonHispanicRace.${oldArray.length}`,
    ]);
  };
  const addNonHispanicSubCat = () => {
    setAddtnlNonHispanicSubCat((oldArray) => [
      ...oldArray,
      `AdditionalNonHispanicSubCat.${oldArray.length}`,
    ]);
  };
  const addEthnicity = () => {
    setAddtnlEthnicity((oldArray) => [
      ...oldArray,
      `AdditionalEthnicity.${oldArray.length}`,
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
        {...register("RacialCategoriesReported")}
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
                    children: [],
                  },
                  ...addtnlNonHispanicSubCat.map((value, index) => {
                    return {
                      value: value,
                      displayValue:
                        "Additional/Alternative Classification/Sub-category",
                      children: [
                        <QMR.TextInput
                          label="Define the Alternative Classification/Sub-category"
                          name={`AddtnlSubCat`}
                        />,
                        <RaceAgeData
                          name={""}
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
          {
            value: "Ehnicity",
            displayValue: "Ethnicity",
            children: [],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
