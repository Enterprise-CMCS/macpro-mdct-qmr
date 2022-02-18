import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import React from "react";
import { useFormContext } from "react-hook-form";

export interface Props {
  rateAlwaysEditable?: boolean;
  rateMultiplicationValue?: number;
  customMask?: RegExp;
}

export const OtherPerformanceMeasure = ({
  rateAlwaysEditable,
  rateMultiplicationValue,
  customMask,
}: Props) => {
  const register = useCustomRegister<Types.OtherPerformanceMeasure>();
  const { getValues } = useFormContext<Types.OtherPerformanceMeasure>();
  const savedRates = getValues("OtherPerformanceMeasure-Rates");
  const [showRates, setRates] = React.useState(
    savedRates ?? [
      { rate: [{ denominator: "", numerator: "", rate: "" }], description: "" },
    ]
  );

  // ! Waiting for data source refactor to type data source here
  const { watch } = useFormContext<any>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    rateAlwaysEditable !== undefined && rateAlwaysEditable
      ? false
      : dataSourceWatch?.every(
          (source: any) => source === "I am reporting provisional data."
        ) ?? true;

  return (
    <QMR.CoreQuestionWrapper label="Other Performance Measure">
      <QMR.TextArea
        label="Describe the other methodology used:"
        formLabelProps={{ fontWeight: 700 }}
        {...register("OtherPerformanceMeasure-Explanation")}
      />
      <CUI.Box marginTop={10}>
        {showRates.map((_item, index) => {
          return (
            <CUI.Stack key={index} my={10}>
              <CUI.Heading fontSize="lg" fontWeight="600">
                Describe the Rate:
              </CUI.Heading>
              <QMR.TextInput
                label="For example, specify the age groups and whether you are reporting on a certain indicator:"
                name={`OtherPerformanceMeasure-Rates.${index}.description`}
              />
              <QMR.Rate
                rates={[
                  {
                    id: index,
                  },
                ]}
                name={`OtherPerformanceMeasure-Rates.${index}.rate`}
                rateMultiplicationValue={rateMultiplicationValue}
                customMask={customMask}
                readOnly={rateReadOnly}
              />
            </CUI.Stack>
          );
        })}

        <QMR.ContainedButton
          buttonText={"+ Add Another"}
          buttonProps={{
            variant: "outline",
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={() => {
            showRates.push({
              description: [""],
              rate: [
                {
                  denominator: "",
                  numerator: "",
                  rate: "",
                },
              ],
            });
            setRates([...showRates]);
          }}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
