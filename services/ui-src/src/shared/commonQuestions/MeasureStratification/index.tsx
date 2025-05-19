import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../types";
import { Accordion } from "@chakra-ui/react";
import { AccordionItem } from "components/Accordion";
import { AdditionalNotes } from "./AdditionalNotes";
import { Stratification } from "./Stratification";
import { useFormContext } from "react-hook-form";
import { OMSData } from "../OptionalMeasureStrat/data";

interface Props {
  register: Function;
}

export const StratificationOption = ({ register }: Props) => {
  return (
    <QMR.RadioButton
      formLabelProps={{ fontWeight: "700" }}
      label="Which race and ethnicity standards would your state like to use for 2025 Core Sets reporting?"
      subTextElement={[
        <CUI.Text mb={2}>
          More information about the race and ethnicity categories included in
          each option is available at [link].
        </CUI.Text>,
        <CUI.List>
          <CUI.ListItem>
            <CUI.Link variant="base">
              1997 Office of Management and Budget (OMB) minimum race and
              ethnicity categories
            </CUI.Link>
            , as specified in the{" "}
            <CUI.Link variant="base">2011 HHS standards</CUI.Link>
          </CUI.ListItem>
          <CUI.ListItem mb={2}>
            <CUI.Link variant="base">
              Statistical Policy Directive #15: 2024 OMB race and ethnicity
              standards
            </CUI.Link>
          </CUI.ListItem>
          ,
        </CUI.List>,
      ]}
      options={[
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
      ]}
      {...register("OptionalMeasureStratification.version")}
    ></QMR.RadioButton>
  );
};

export const MeasureStrat = (props: Types.OMSProps) => {
  const labels: any = useContext(SharedContext);
  const year = labels.year;
  const { coreset } = props;

  const register = useCustomRegister();
  const { watch } = useFormContext<Types.OptionalMeasureStratification>();
  const data = watch();

  const version = data.OptionalMeasureStratification?.version;
  const omsData =
    version === "optional" ? OMSData(2024) : OMSData(year, coreset === "adult");

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <Accordion allowToggle mt={4} mb={6}>
        <AccordionItem label="Instructions">
          <CUI.Text>
            Enter data below to stratify this measure by race, ethnicity, sex,
            and/or geography. Beginning with 2025 Core Sets reporting, states
            are required to report stratified data for a specific subset of
            Child, Adult, and Health Home Core Set measures. More information on
            stratification reporting requirements is included in the{" "}
            <CUI.Link variant="base">
              "2025 Updates to the Child and Adult Core Health Care Quality
              Measurement Sets and Mandatory Reporting Guidance" State Health
              Official letter and the Initial Core Set Mandatory Reporting
              Guidance for the Health Home Core Set
            </CUI.Link>
            .
          </CUI.Text>
          <br />
          <CUI.Text>
            For 2025 Core Sets reporting, states have the option to stratify
            race and ethnicity data using either (1) the{" "}
            <CUI.Link variant="base">
              1997 Office of Management and Budget (OMB) minimum race and
              ethnicity categories
            </CUI.Link>
            , as specified in the{" "}
            <CUI.Link variant="base">2011 HHS standards</CUI.Link>, or (2) the{" "}
            <CUI.Link variant="base">
              Statistical Policy Directive #15: 2024 OMB race and ethnicity
              standards
            </CUI.Link>{" "}
            for each measure selected for stratification.
          </CUI.Text>
          <br />
          <CUI.Text>
            CMS recognizes that stratifying data could result in small cell
            sizes. CMS encourages states to report data in the QMR system for
            measures and rates with small cell sizes. For the purpose of public
            reporting, data will be suppressed in accordance with the CMS
            cell-size suppression policy, which prohibits the direct reporting
            of beneficiary and record counts of 1 to 10 and values from which
            users can derive values of 1 to 10. Furthermore, CMS will suppress
            rates with a denominator less than 30 due to reliability concerns.
          </CUI.Text>
        </AccordionItem>
      </Accordion>
      <StratificationOption register={register}></StratificationOption>
      {(version === "optional" || version === "required") && (
        <>
          <CUI.Heading size="md" as="h2" my="6">
            Measure Stratification Details
          </CUI.Heading>
          <AdditionalNotes></AdditionalNotes>
          <Stratification
            {...props}
            omsData={omsData}
            year={year}
          ></Stratification>
        </>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
