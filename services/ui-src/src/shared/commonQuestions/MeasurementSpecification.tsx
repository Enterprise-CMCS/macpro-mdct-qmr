import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";
import { Specifications, SpecificationType } from "shared/types";

interface Props {
  type: SpecificationType;
  coreset?: Types.CoreSetKey;
}

const HEDISChildren = () => {
  const register = useCustomRegister<Types.MeasurementSpecification>();
  const hedisLabels: any = useContext(SharedContext);
  const options = hedisLabels.MeasureSpecifications.options;

  return (
    <>
      {hedisLabels?.MeasureSpecifications?.measureSpecDescriptor && (
        <CUI.Text key="measureSpecDescriptor" size="sm" pb="3">
          {hedisLabels?.MeasureSpecifications?.measureSpecDescriptor}
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

export const MeasurementSpecificationQuestionYesNo = (
  { type, coreset }: Props,
  year: number
) => {
  const label = {
    adult: "Adult",
    child: "Child",
    health: "Health Home",
  };

  const specification =
    type === "HEDIS"
      ? `${Specifications[type].displayValue} Measurement Year ${year - 1}`
      : Specifications[type].displayValue;
  return (
    <>
      <CUI.Text
        key="measureSpecAdditionalContext-HelperText"
        size="sm"
        pb="3"
        fontWeight="bold"
      >
        If your state substantially varied from the {label[coreset!]}
        Core Set measure specifications (including different methodology,
        timeframe, or reported age groups), please report your data using
        “Other” specifications.
      </CUI.Text>

      <CUI.Text
        key="measureSpecAdditionalContext-YesNoQuestion"
        size="sm"
        pb="3"
      >
        Did your state use {year} {label[coreset!]} Core Set measure
        specifications, which are based on {specification} specifications to
        calculate this measure?
      </CUI.Text>
    </>
  );
};

export const MeasurementSpecificationOtherAlert = (
  otherMeasurementSpecWarning: string
) => {
  return (
    <CUI.Box mt="8">
      <Alert heading="Please Note" variation="warn">
        <CUI.Text>{otherMeasurementSpecWarning}</CUI.Text>
      </Alert>
    </CUI.Box>
  );
};

export const MeasurementSpecificationOtherTextbox = (register: Function) => {
  return (
    <QMR.TextArea
      textAreaProps={{ marginBottom: "10" }}
      {...register(DC.MEASUREMENT_SPEC_OMS_DESCRIPTION)}
      label="Describe the specifications that were used to calculate the measure and explain how they deviated from Core Set specifications:"
      key={DC.MEASUREMENT_SPEC_OMS_DESCRIPTION}
    />
  );
};

export const MeasurementSpecificationUpload = (register: Function) => {
  return (
    <QMR.Upload
      label="If you need additional space to describe your state's methodology, please attach further documentation below."
      {...register(DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD)}
    />
  );
};

export const MeasurementSpecification = ({ type, coreset }: Props) => {
  const register = useCustomRegister<Types.MeasurementSpecification>();
  const context: any = useContext(SharedContext);
  const { MeasureSpecifications, year } = context;

  console.log("Measure specifications: ", MeasureSpecifications);

  const measureSpecs = { ...Specifications[type] };

  if (type === "HEDIS")
    measureSpecs.children = MeasureSpecifications.options && [
      <HEDISChildren key="HEDIS-Child" />,
    ];

  //for 2025+, the display for the radio option is different but the value being saved in the database is the same, so this just does a label swap
  measureSpecs.displayValue = MeasureSpecifications?.measureSpecYesNo
    ? `Yes, our state used ${year} Core Set specifications to calculate this measure.`
    : measureSpecs.displayValue;

  return (
    <QMR.CoreQuestionWrapper
      testid="measurement-specification"
      label="Measurement Specification"
    >
      {MeasureSpecifications?.additionalContext && (
        <CUI.Text key="measureSpecAdditionalContext" size="sm" pb="3">
          {MeasureSpecifications?.additionalContext}
        </CUI.Text>
      )}

      {MeasureSpecifications?.measureSpecYesNo &&
        MeasurementSpecificationQuestionYesNo({ type, coreset }, year)}

      <div data-cy="measurement-specification-options">
        <QMR.RadioButton
          {...register(DC.MEASUREMENT_SPECIFICATION)}
          options={[
            measureSpecs,
            {
              displayValue: MeasureSpecifications?.measureSpecYesNo
                ? "No, our state used Other specifications to calculate this measure."
                : "Other",
              value: DC.OTHER,
              children: [
                MeasurementSpecificationOtherTextbox(register),
                (coreset === "adult" || coreset === "child") &&
                  MeasureSpecifications.otherMeasurementSpecWarning &&
                  MeasurementSpecificationOtherAlert(
                    MeasureSpecifications.otherMeasurementSpecWarning
                  ),
                MeasureSpecifications.upload &&
                  MeasurementSpecificationUpload(register),
              ],
            },
          ]}
        />
      </div>
    </QMR.CoreQuestionWrapper>
  );
};
