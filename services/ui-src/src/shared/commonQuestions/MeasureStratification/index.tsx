import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { OMSData } from "../OptionalMeasureStrat/data";
import { Stratification } from "./Stratification";
import SharedContext from "shared/SharedContext";
import * as DC from "dataConstants";
import { Alert } from "@cmsgov/design-system";

interface Props {
  reset?: () => void;
  year: number;
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
    ["1997-omb-for-2026"]: {
      link: "https://www.govinfo.gov/content/pkg/FR-1997-10-30/pdf/97-28653.pdf",
      label:
        "1997 Office of Management and Budget (OMB) minimum race and ethnicity standards",
      aria: "1997 Office of Management and Budget (OMB) minimum race and ethnicity standards",
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

  if (!data) return null;

  return (
    <CUI.Link href={data.link} target={"_blank"} aria-label={data.aria}>
      {data.label}
    </CUI.Link>
  );
};

export const StratificationAdditionalNotes = () => {
  return (
    <QMR.CoreQuestionWrapper testid="additional-notes" label="">
      <QMR.TextArea
        key={`OptionalMeasureStratification.${DC.ADDITIONAL_CONTEXT}`}
        name={`OptionalMeasureStratification.${DC.ADDITIONAL_CONTEXT}`}
        label="If your state would like to provide additional context about the reported stratified data, including stratification categories, please add notes below (optional)."
      />
    </QMR.CoreQuestionWrapper>
  );
};

export const StratificationOption = ({ reset, year }: Props) => {
  return (
    <QMR.RadioButton
      key={`OptionalMeasureStratification.${DC.VERSION}`}
      name={`OptionalMeasureStratification.${DC.VERSION}`}
      formLabelProps={{ fontWeight: "700" }}
      label={`Which race and ethnicity standards would your state like to use for ${year} Core Sets reporting?`}
      subTextElement={[
        <CUI.Text key="description" mb={2}>
          A summary of the race and ethnicity categories and detailed categories
          included in each standard is available in Boxes 1 and 2 of the{" "}
          {GetLinks("strat-ta-resource")}.
        </CUI.Text>,
        <CUI.UnorderedList key="list" padding="0 0 1rem 2rem">
          <CUI.ListItem key="1997-omb-item">
            1997 Office of Management and Budget (OMB) minimum race and
            ethnicity standards, as specified in the 2011 HHS standards
          </CUI.ListItem>
          <CUI.ListItem key="2024-omb-item" mb={2}>
            2024 OMB Statistical Policy Directive No. 15 race and ethnicity
            standards
          </CUI.ListItem>
          ,
        </CUI.UnorderedList>,
        <CUI.Box key="alert" mb="1rem">
          <Alert
            heading="Entered data will not be saved if you switch race and ethnicity reporting standards."
            variation="warn"
          >
            <CUI.Text>
              Please confirm which standard you are using before entering data.
            </CUI.Text>
          </Alert>
        </CUI.Box>,
      ]}
      options={[
        {
          displayValue:
            "1997 OMB minimum race and ethnicity standards, as specified in the 2011 HHS standards",
          value: "1997-omb",
          onClick: reset,
        },
        {
          displayValue:
            "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
          value: "2024-omb",
          onClick: reset,
        },
        {
          displayValue: "I am not reporting stratified data for this measure",
          value: "not-reporting",
          onClick: reset,
        },
      ]}
    ></QMR.RadioButton>
  );
};

export const MeasureStrat = (props: Types.OMSProps) => {
  const labels: any = useContext(SharedContext);
  const year = labels.year;
  const { coreset } = props;

  const { watch, setValue, resetField } =
    useFormContext<Types.OptionalMeasureStratification>();
  const data = watch();

  const [version, setVersion] = useState<string>();
  const [omsData, setOMSData] = useState<Types.OmsNode[]>();

  useEffect(() => {
    if (
      data.OptionalMeasureStratification?.version != undefined &&
      data.OptionalMeasureStratification.version != version
    ) {
      setVersion(data.OptionalMeasureStratification.version);
      setOMSData(
        data.OptionalMeasureStratification.version === "1997-omb"
          ? OMSData(2024)
          : OMSData(year, coreset === "adult")
      );
    }
  }, [data.OptionalMeasureStratification?.version]);

  const onReset = () => {
    if (!data.OptionalMeasureStratification?.selections) return;

    //create a copy of the original data to be used as the clear template
    const clearedData = structuredClone(
      data.OptionalMeasureStratification.selections
    );

    //transverse through data object and set all values to "" if key is not an array
    for (const [topKey, topValue] of Object.entries(clearedData)) {
      //this clears any fields added by the [+Add Another _____] button, i.e. [+Add Another Race]
      (["additionalSelections", "additionalCategories"] as const).forEach(
        (key) => {
          if (topValue[key])
            setValue(
              `OptionalMeasureStratification.selections.${topKey}.${key}`,
              []
            );
        }
      );
      for (const [midKey, midValue] of Object.entries(
        topValue.selections as Types.OmsNodes.MidLevelOMSNode
      )) {
        //this clears the checked boxes when that appear affter selecting "No, we are reporting disaggregated..."
        midValue.aggregate = "";
        //this clears any fields added by the [+Add Another Sub-Category] button
        if (midValue.additionalSubCategories) {
          setValue(
            `OptionalMeasureStratification.selections.${topKey}.selections.${midKey}.additionalSubCategories`,
            []
          );
        }

        if (midValue.rateData) {
          for (const [_catKey, catValue] of Object.entries(
            midValue.rateData.rates
          )) {
            for (const [_qualKey, qualValue] of Object.entries(
              catValue as { [qualifier: string]: Types.RateFields[] }
            )) {
              for (var i = 0; i < qualValue.length; i++) {
                qualValue[i].numerator = "";
                qualValue[i].denominator = "";
                qualValue[i].rate = "";
              }
            }
          }
        }
      }
    }

    //clearing the default values before doing a set value so that any data that is saved doesn't get repopulated
    resetField("OptionalMeasureStratification.selections", {
      defaultValue: {},
    });
    setValue("OptionalMeasureStratification.selections", clearedData);
  };

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <QMR.Accordion label="Instructions (Click to Expand)">
        {labels.MeasureStratification.instructions.map(
          (paragraphParts: Types.InstructionParts[], paragraphIndex: number) => (
            <React.Fragment key={paragraphIndex}>
              <CUI.Text>
                {paragraphParts.map(
                  (part: Types.InstructionParts, partIndex: number) =>
                    typeof part === "string" ? (
                      part
                    ) : (
                      <span key={partIndex}>{GetLinks(part.link)}</span>
                    )
                )}
              </CUI.Text>

              {paragraphIndex <
                labels.MeasureStratification.instructions.length - 1 && <br />}
            </React.Fragment>
          )
        )}
      </QMR.Accordion>
      <StratificationOption reset={onReset} year={year}></StratificationOption>
      {(version === "1997-omb" || version === "2024-omb") && (
        <Stratification
          {...props}
          omsData={omsData!}
          year={year}
        ></Stratification>
      )}
      {version != undefined && (
        <>
          <CUI.Heading size="md" as="h2" my="6">
            Measure Stratification Details
          </CUI.Heading>
          <StratificationAdditionalNotes />
        </>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
