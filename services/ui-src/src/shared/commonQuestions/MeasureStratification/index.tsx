import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as QMR from "components";
import * as Types from "../../types";
import { Accordion, Button } from "@chakra-ui/react";
import { AccordionItem } from "components/Accordion";
import { parseLabelToHTML } from "utils";
import { AdditionalNotes } from "./AdditionalNotes";
import { Stratification } from "./Stratification";
import { useFormContext } from "react-hook-form";
import { OMSData } from "../OptionalMeasureStrat/data";

interface Props {
  options: QMR.RadioButtonOption[];
  register: Function;
}

export const accordionText =
  '<p>Enter data below to stratify this measure by race, ethnicity, sex, and/or geography. Beginning with 2025 Core Sets reporting, states are required to report stratified data for a specific subset of Child, Adult, and Health Home Core Set measures. More information on stratification reporting requirements is included in the "2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance" State Health Official letter and the Initial Core Set Mandatory Reporting Guidance for the Health Home Core Set. </p>' +
  "<p>For 2025 Core Sets reporting, states have the option to stratify race and ethnicity data using either (1) the 1997 Office of Management and Budget (OMB) minimum race and ethnicity categories, as specified in the 2011 HHS standards, or (2) the Statistical Policy Directive #15: 2024 OMB race and ethnicity standards for each measure selected for stratification.</p>" +
  "<p>CMS recognizes that stratifying data could result in small cell sizes. CMS encourages states to report data in the QMR system for measures and rates with small cell sizes. For the purpose of public reporting, data will be suppressed in accordance with the CMS cell-size suppression policy, which prohibits the direct reporting of beneficiary and record counts of 1 to 10 and values from which users can derive values of 1 to 10. Furthermore, CMS will suppress rates with a denominator less than 30 due to reliability concerns.</p>";

export const StratificationOption = ({ register, options }: Props) => {
  return (
    <QMR.RadioButton
      label="Which race and ethnicity standards would your state like to use for 2025 Core Sets reporting?"
      subTextElement={
        <>
          <p>
            More information about the race and ethnicity categories included in
            each option is available at [link].
          </p>
          <p>
            1997 Office of Management and Budget (OMB) minimum race and
            ethnicity categories, as specified in the 2011 HHS standards
          </p>
          <p>
            Statistical Policy Directive #15: 2024 OMB race and ethnicity
            standards
          </p>
        </>
      }
      options={options}
      {...register("OptionalMeasureStratification.version")}
    ></QMR.RadioButton>
  );
};

export const ExpandAll = () => {};

export const CollapseAll = () => {};

export const MeasureStrat = (props: Types.OMSProps) => {
  const labels: any = useContext(SharedContext);
  const year = labels.year;
  const { coreset } = props;

  const register = useCustomRegister();
  const { watch } = useFormContext<Types.OptionalMeasureStratification>();
  const data = watch();

  const options = [
    {
      displayValue:
        "1997 Office of Management and Budget (OMB) minimum race and ethnicity categories.",
      value: "optional",
    },
    {
      displayValue:
        "Statistical Policy Directive #15: 2024 OMB race and ethnicity standards",
      value: "required",
    },
    {
      displayValue:
        "I am not reporting measure stratification for this measure",
      value: "none",
    },
  ];

  const version = data.OptionalMeasureStratification?.version;
  const omsData =
    version === "optional" ? OMSData(2024) : OMSData(year, coreset === "adult");

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <Accordion allowToggle>
        <AccordionItem label="Instructions">
          {parseLabelToHTML(accordionText)}
        </AccordionItem>
      </Accordion>
      <StratificationOption
        register={register}
        options={options}
      ></StratificationOption>
      <h1>Measure Stratification Details</h1>
      <AdditionalNotes></AdditionalNotes>
      <h1>Enter Measure Stratification</h1>
      <p>
        Do not select categories and sub-categories for which you will not be
        reporting any data. For each category and sub-category, enter a number
        for the numerator and denominator. The rate will auto-calculated but can
        be revised if needed.{" "}
      </p>
      <Button onClick={ExpandAll}>Expand all</Button>
      <Button onClick={CollapseAll}>Collapse all</Button>
      {(version === "optional" || version === "required") && (
        <Stratification
          {...props}
          omsData={omsData}
          year={year}
        ></Stratification>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
