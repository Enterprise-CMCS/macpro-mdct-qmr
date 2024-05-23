import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";

const HEDISChildren = () => {
  const register = useCustomRegister<Types.MeasurementSpecification>();

  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  const options = labels.MeasureSpecifications.options;

  return (
    <>
      {labels?.MeasureSpecifications?.measureSpecDescriptor && (
        <CUI.Text key="measureSpecDescriptor" size="sm" pb="3">
          {labels?.MeasureSpecifications?.measureSpecDescriptor}
        </CUI.Text>
      )}
      <QMR.Select
        {...register(DC.MEASUREMENT_SPECIFICATION_HEDIS)}
        label="Specify the version of HEDIS measurement year used:"
        placeholder="Select option"
        options={options}
      />
    </>
  );
};

interface Props {
  type:
    | "ADA-DQA"
    | "AHRQ"
    | "AHRQ-NCQA"
    | "CDC"
    | "CMS"
    | "HEDIS"
    | "HRSA"
    | "JOINT"
    | "NCQA"
    | "OHSU"
    | "OPA"
    | "PQA";
}

const specifications = {
  "ADA-DQA": {
    displayValue:
      "American Dental Association/Dental Quality Alliance (ADA/DQA)",
    value: DC.ADA_DQA,
  },
  AHRQ: {
    displayValue: "Agency for Healthcare Research and Quality (AHRQ)",
    value: DC.AHRQ,
  },
  "AHRQ-NCQA": {
    displayValue:
      "Agency for Healthcare Research and Quality (AHRQ) (survey instrument) and National Committee for Quality Assurance (survey administrative protocol)",
    value: DC.AHRQ_NCQA,
  },
  CDC: {
    displayValue: "Centers for Disease Contol and Prevention (CDC)",
    value: DC.CDC,
  },
  CMS: {
    displayValue: "Centers for Medicare & Medicaid Services (CMS)",
    value: DC.CMS,
  },
  HEDIS: {
    displayValue:
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)",
    value: DC.NCQA,
    children: [<HEDISChildren key="HEDIS-Child" />],
  },
  HRSA: {
    displayValue: "Health Resources and Services Administration (HRSA)",
    value: DC.HRSA,
  },
  JOINT: {
    displayValue: "The Joint Commission",
    value: DC.JOINT_COMMISSION,
  },
  NCQA: {
    displayValue: "National Committee for Quality Assurance (NCQA)",
    value: DC.NCQA,
  },
  OHSU: {
    displayValue: "Oregon Health and Science University (OHSU)",
    value: DC.OHSU,
  },
  OPA: {
    displayValue: "HHS Office of Population Affairs (OPA)",
    value: DC.OPA,
  },
  PQA: {
    displayValue: "Pharmacy Quality Alliance (PQA)",
    value: DC.PQA,
  },
};

export const MeasurementSpecification = ({ type }: Props) => {
  const register = useCustomRegister<Types.MeasurementSpecification>();
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper
      testid="measurement-specification"
      label="Measurement Specification"
    >
      <div data-cy="measurement-specification-options">
        <QMR.RadioButton
          {...register(DC.MEASUREMENT_SPECIFICATION)}
          options={[
            specifications[type],
            {
              displayValue: "Other",
              value: DC.OTHER,
              children: [
                <QMR.TextArea
                  textAreaProps={{ marginBottom: "10" }}
                  {...register(DC.MEASUREMENT_SPEC_OMS_DESCRIPTION)}
                  label="Describe the specifications that were used to calculate the measure and explain how they deviated from Core Set specifications:"
                  key={DC.MEASUREMENT_SPEC_OMS_DESCRIPTION}
                />,
                labels.MeasureSpecifications.otherDataSourceWarning && (
                  <CUI.Box mb="8">
                    <Alert heading="Please Note" variation="warn">
                      <CUI.Text>
                        {labels.MeasureSpecifications.otherDataSourceWarning}
                      </CUI.Text>
                    </Alert>
                  </CUI.Box>
                ),
                <QMR.Upload
                  label="If you need additional space to describe your state's methodology, please attach further documentation below."
                  {...register(DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD)}
                />,
              ],
            },
          ]}
        />
      </div>
    </QMR.CoreQuestionWrapper>
  );
};
