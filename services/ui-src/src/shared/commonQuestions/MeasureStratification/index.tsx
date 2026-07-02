import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Types from "../../types";
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFormContext, useWatch } from "react-hook-form";
import { OMSData } from "../OptionalMeasureStrat/data";
import { Stratification } from "./Stratification";
import SharedContext from "shared/SharedContext";
import * as DC from "dataConstants";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  reset?: () => void;
  year: number;
}

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
  const labels: any = useContext(SharedContext);
  const { subText, options } = labels.StratificationOption;
  const { watch } = useFormContext();
  const reportingMeasureStratification = watch(
    `OptionalMeasureStratification.${DC.REPORTING_STRATIFICATION}`
  );
  const shouldShowReportingMeasureStratification =
    featuresByYear.useStratificationYesNo;
  const shouldShowStandardsQuestion =
    !shouldShowReportingMeasureStratification ||
    reportingMeasureStratification === "yes";
  const notReportingLabel = shouldShowReportingMeasureStratification
    ? "Not applicable"
    : options["not-reporting"];

  return (
    <>
      {shouldShowReportingMeasureStratification && (
        <CUI.Box mt="32px">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "700" }}
            name={`OptionalMeasureStratification.${DC.REPORTING_STRATIFICATION}`}
            label={"Are you reporting measure stratification for this measure?"}
            options={[
              {
                displayValue: "Yes",
                value: "yes",
                onClick: reset,
              },
              {
                displayValue: "No",
                value: "no",
                onClick: reset,
              },
            ]}
          ></QMR.RadioButton>
        </CUI.Box>
      )}
      {shouldShowStandardsQuestion && (
        <CUI.Box
          mt={shouldShowReportingMeasureStratification ? "32px" : undefined}
        >
          <QMR.RadioButton
            key={`OptionalMeasureStratification.${DC.VERSION}`}
            name={`OptionalMeasureStratification.${DC.VERSION}`}
            formLabelProps={{ fontWeight: "700" }}
            label={`Which race and ethnicity standards would your state like to use for ${year} Core Sets reporting?`}
            subTextElement={subText}
            options={[
              {
                displayValue: options["1997-omb"],
                value: "1997-omb",
                onClick: reset,
              },
              {
                displayValue: options["2024-omb"],
                value: "2024-omb",
                onClick: reset,
              },
              {
                displayValue: notReportingLabel,
                value: "not-reporting",
                onClick: reset,
              },
            ]}
          ></QMR.RadioButton>
        </CUI.Box>
      )}
    </>
  );
};

export const MeasureStrat = (props: Types.OMSProps) => {
  const labels: any = useContext(SharedContext);
  const year = labels.year;
  const { coreset } = props;
  const { coreSetId } = useParams();

  const { getValues, setValue, resetField, formState } =
    useFormContext<Types.OptionalMeasureStratification>();
  // Re-run this component only when these two radios change.
  useWatch({
    name: [
      `OptionalMeasureStratification.${DC.REPORTING_STRATIFICATION}`,
      `OptionalMeasureStratification.${DC.VERSION}`,
    ],
  });
  const data = getValues();
  // On load the saved answer can be missing from the live form. So use the
  // live value if it's there, otherwise fall back to the saved one.
  const liveOms = data.OptionalMeasureStratification;
  const defaultOms = formState.defaultValues?.OptionalMeasureStratification;
  const reportingMeasureStratification =
    liveOms?.[DC.REPORTING_STRATIFICATION] ??
    defaultOms?.[DC.REPORTING_STRATIFICATION];
  const shouldUseReportingMeasureStratification =
    featuresByYear.useStratificationYesNo;

  const version = liveOms?.[DC.VERSION] ?? defaultOms?.[DC.VERSION];
  const omsData = useMemo(() => {
    if (version == undefined) return undefined;
    return OMSData(year, coreset === "adult", version, coreSetId);
  }, [version, year, coreset, coreSetId]);

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

  const detailsSection = (
    <>
      <CUI.Heading size="md" as="h2" my="6">
        Measure Stratification Details
      </CUI.Heading>
      <StratificationAdditionalNotes />
    </>
  );

  const hasSelectedVersion = version != undefined;
  const isReportingStratification =
    !shouldUseReportingMeasureStratification ||
    reportingMeasureStratification === "yes";
  const shouldShowDetailsSection =
    hasSelectedVersion &&
    isReportingStratification &&
    (shouldUseReportingMeasureStratification || version !== "not-reporting");
  const shouldShowStratification =
    hasSelectedVersion &&
    isReportingStratification &&
    (version === "1997-omb" ||
      version === "2024-omb" ||
      (shouldUseReportingMeasureStratification && version === "not-reporting"));

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <QMR.Accordion label="Instructions (Click to Expand)">
        {labels.MeasureStratification.instructions}
      </QMR.Accordion>
      <StratificationOption reset={onReset} year={year}></StratificationOption>
      {shouldShowDetailsSection && detailsSection}
      {shouldShowStratification && (
        <Stratification
          {...props}
          omsData={omsData!}
          year={year}
        ></Stratification>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
