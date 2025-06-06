import * as Q from "./questions";
import * as CMQ from "shared/commonQuestions";
import { useParams } from "react-router-dom";
import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormData } from "./types";
import { validationFunctions } from "./validation";
import { useEffect } from "react";

const defOfDenomOptions: CMQ.CoreSetSpecificOptions = {
  ACSM: {
    options: [
      {
        displayValue: "Medicaid (Title XIX)",
        value: "Medicaid (Title XIX)",
      },
      {
        displayValue: "Medicaid-Expansion CHIP (Title XXI)",
        value: "SurveySampleIncCHIP",
      },
      {
        displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
        value: "SurveySampleIncMedicareMedicaidDualEligible",
      },
      {
        displayValue: "Other",
        value: "Other",
        children: [
          <QMR.TextArea
            label="Define the other survey population:"
            name="define-the-other-survey-population"
          />,
        ],
      },
    ],
    helpText: (
      <>
        <CUI.Text mt="3" mb="3">
          Please select all populations that are included in the survey sample.
          For example, if your survey sample includes both non-dual Medicaid
          (Title XIX) beneficiaries and Individuals Dually Eligible for Medicare
          and Medicaid, select both Medicaid population (Title XIX) and
          Individuals Dually Eligible for Medicare and Medicaid.
        </CUI.Text>
      </>
    ),
  },
  ACS: {
    options: [
      {
        displayValue: "Medicaid (Title XIX)",
        value: "Medicaid (Title XIX)",
      },
      {
        displayValue: "Individuals Dually Eligible for Medicare and Medicaid",
        value: "SurveySampleIncMedicareMedicaidDualEligible",
      },
      {
        displayValue: "Other",
        value: "Other",
        children: [
          <QMR.TextArea
            label="Define the other survey population:"
            name="define-the-other-survey-population"
          />,
        ],
      },
    ],
    helpText: (
      <>
        <CUI.Text mt="3" mb="3">
          Please select all populations that are included in the survey sample.
          For example, if your survey sample includes both non-dual Medicaid
          (Title XIX) beneficiaries and Individuals Dually Eligible for Medicare
          and Medicaid, select both Medicaid population (Title XIX) and
          Individuals Dually Eligible for Medicare and Medicaid.
        </CUI.Text>
      </>
    ),
  },
  ACSC: {
    options: [
      {
        displayValue: "Separate CHIP (Title XXI)",
        value: "Separate CHIP (Title XXI)",
      },
      {
        displayValue:
          "Individuals Dually Eligible for Medicare and Separate CHIP",
        value: "Individuals Dually Eligible for Medicare and Separate CHIP",
      },
      {
        displayValue: "Other",
        value: "Other",
        children: [
          <QMR.TextArea
            label="Define the other survey population:"
            name="define-the-other-survey-population"
          />,
        ],
      },
    ],
    helpText: (
      <>
        <CUI.Text mt="3" mb="3">
          Please select all populations that are included in the survey sample.
          For example, if your survey sample includes both Separate CHIP (Title
          XXI) beneficiaries and Individuals Dually Eligible for Medicare and
          Medicaid, select both Separate CHIP (Title XXI) and Individuals Dually
          Eligible for Medicare and Medicaid.
        </CUI.Text>
      </>
    ),
  },
};

export const CPAAD = ({
  name,
  year,
  setValidationFunctions,
}: QMR.MeasureWrapperProps) => {
  const { watch } = useFormContext<FormData>();
  const { coreSetId } = useParams();
  const data = watch();

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  return (
    <>
      <Q.Reporting
        reportingYear={year}
        measureName={name}
        measureAbbreviation={coreSetId as string}
      />
      {data["DidCollect"] !== "no" && (
        <>
          <Q.HowDidYouReport />
          <Q.DataSource type="adult" />
          <CMQ.DefinitionOfPopulation
            coreSetOptions={defOfDenomOptions}
            deliverySystems={false}
            populationTotalTechSpec={false}
            removeOtherOption={true}
          />
          <Q.PerformanceMeasure />
        </>
      )}
      <Q.AdditionalNotes />
    </>
  );
};
