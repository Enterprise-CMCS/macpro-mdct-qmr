import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../types";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import { OMSData } from "../OptionalMeasureStrat/data";
import { Stratification } from "./Stratification";
import SharedContext from "shared/SharedContext";
import * as DC from "dataConstants";

interface Props {
  register: Function;
}

export const GetLinks = (type: string) => {
  const links = {
    ["sho24001"]: {
      link: "https://www.medicaid.gov/federal-policy-guidance/downloads/sho24001.pdf",
      label:
        '"2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance" State Health Official letter',
      aria: "2025 Updates to the Child and Adult Core Health Care Quality Measurement Sets and Mandatory Reporting Guidance State Health Official letter",
    },
    ["hss-standard"]: {
      link: "https://aspe.hhs.gov/sites/default/files/migrated_legacy_files/43681/index.pdf",
      label: "2011 HHS standards",
      aria: "2011 HHS standards",
    },
    ["initial-core"]: {
      link: "https://www.medicaid.gov/federal-policy-guidance/downloads/smd24002.pdf",
      label:
        "Initial Core Set Mandatory Reporting Guidance for the Health Home Core Set",
      aria: "Initial Core Set Mandatory Reporting Guidance for the Health Home Core Set",
    },
    ["1997-omb"]: {
      link: "https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf",
      label:
        "1997 Office of Management and Budget (OMB) minimum race and ethnicity categories",
      aria: "1997 Office of Management and Budget (OMB) minimum race and ethnicity categories",
    },
    ["2024-omb"]: {
      link: "https://www.federalregister.gov/d/2024-06469",
      label:
        "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
      aria: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
    },
    ["strat-ta-resource"]: {
      link: "https://www.medicaid.gov/medicaid/quality-of-care/downloads/QMR-stratification-resource.pdf",
      label: "stratification TA resource",
      aria: "stratification TA resource",
    },
  };

  const data = links[type as keyof typeof links];

  return (
    <CUI.Link href={data.link} target={"_blank"} aria-label={data.aria}>
      {data.label}
    </CUI.Link>
  );
};

export const StratificationAdditionalNotes = ({ register }: Props) => {
  return (
    <QMR.CoreQuestionWrapper
      testid="additional-notes"
      label="Additional notes/comments (optional)"
    >
      <QMR.TextArea
        label="If your state would like to provide additional context about the reported stratified data, including stratification categories, please add notes below."
        {...register(`OptionalMeasureStratification.${DC.ADDITIONAL_CONTEXT}`)}
      />
    </QMR.CoreQuestionWrapper>
  );
};

export const StratificationOption = ({ register }: Props) => {
  return (
    <QMR.RadioButton
      formLabelProps={{ fontWeight: "700" }}
      label="Which race and ethnicity standards would your state like to use for 2025 Core Sets reporting?"
      subTextElement={[
        <CUI.Text mb={2}>
          A summary of the race and ethnicity subcategories included in each
          option is available in Boxes 1 and 2 of the{" "}
          {GetLinks("strat-ta-resource")}.
        </CUI.Text>,
        <CUI.UnorderedList padding="0 0 1rem 2rem">
          <CUI.ListItem>
            1997 Office of Management and Budget (OMB) minimum race and
            ethnicity categories, as specified in the 2011 HHS standards
          </CUI.ListItem>
          <CUI.ListItem mb={2}>
            2024 OMB Statistical Policy Directive No. 15 race and ethnicity
            standards
          </CUI.ListItem>
          ,
        </CUI.UnorderedList>,
      ]}
      options={[
        {
          displayValue:
            "1997 OMB minimum race and ethnicity categories, as specified in the 2011 HHS standards",
          value: "1997-omb",
        },
        {
          displayValue:
            "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
          value: "2024-omb",
        },
        {
          displayValue:
            "I am not reporting measure stratification for this measure",
          value: "not-reporting",
        },
      ]}
      {...register(`OptionalMeasureStratification.${DC.VERSION}`)}
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
    version === "1997-omb" ? OMSData(2024) : OMSData(year, coreset === "adult");

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <QMR.Accordion label="Instructions (Click to Expand)">
        <CUI.Text>
          Enter data below to stratify this measure by race, ethnicity, sex,
          and/or geography. Beginning with 2025 Core Sets reporting, states are
          required to report stratified data for a specific subset of Child,
          Adult, and Health Home Core Set measures. More information on
          stratification reporting requirements is included in the{" "}
          {GetLinks("sho24001")} and the {GetLinks("initial-core")}.
        </CUI.Text>
        <br />
        <CUI.Text>
          For 2025 Core Sets reporting, states have the option to stratify race
          and ethnicity data using either (1) the {GetLinks("1997-omb")}, as
          specified in the {GetLinks("hss-standard")}, or (2) the{" "}
          {GetLinks("2024-omb")} for each measure selected for stratification.
        </CUI.Text>
        <br />
        <CUI.Text>
          CMS encourages states to report data in the QMR system for measures
          and rates with small cell sizes. For the purpose of public reporting,
          data will be suppressed in accordance with the CMS cell-size
          suppression policy, which prohibits the direct reporting of
          beneficiary and record counts of 1 to 10 and values from which users
          can derive values of 1 to 10. Furthermore, CMS will suppress rates
          with a denominator less than 30 due to reliability concerns.
        </CUI.Text>
      </QMR.Accordion>
      <StratificationOption register={register}></StratificationOption>
      {(version === "1997-omb" || version === "2024-omb") && (
        <>
          <CUI.Heading size="md" as="h2" my="6">
            Measure Stratification Details
          </CUI.Heading>
          <StratificationAdditionalNotes
            register={register}
          ></StratificationAdditionalNotes>
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
