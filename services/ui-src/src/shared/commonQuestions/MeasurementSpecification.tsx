import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { Alert } from "@cmsgov/design-system";
import { specifications, SpecificationType } from "shared/types";

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

interface Props {
  type: SpecificationType;
  coreset?: string;
}

export const Question = ({ type, coreset }: Props, year: number) => {
  const coreSet = coreset;
  const specification =
    type === "HEDIS"
      ? `${specifications[type].displayValue} Measurement Year ${year - 1}`
      : specifications[type].displayValue;
  return `Did your state use ${year} ${coreSet} Core Set measure specifications, which are based on ${specification} specifications to calculate this measure?`;
};

export const MeasurementSpecification = ({ type, coreset }: Props) => {
  const register = useCustomRegister<Types.MeasurementSpecification>();
  const context: any = useContext(SharedContext);
  const { MeasureSpecifications, year } = context;

  let measureSpecs = specifications;
  measureSpecs.HEDIS.children = MeasureSpecifications.options && [
    <HEDISChildren key="HEDIS-Child" />,
  ];

  Question({ type, coreset }, year);

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

      <div data-cy="measurement-specification-options">
        <QMR.RadioButton
          {...register(DC.MEASUREMENT_SPECIFICATION)}
          options={[
            measureSpecs[type],
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
                (coreset === "adult" || coreset === "child") &&
                  MeasureSpecifications.otherMeasurementSpecWarning && (
                    <CUI.Box mb="8">
                      <Alert heading="Please Note" variation="warn">
                        <CUI.Text>
                          {MeasureSpecifications.otherMeasurementSpecWarning}
                        </CUI.Text>
                      </Alert>
                    </CUI.Box>
                  ),
                MeasureSpecifications.upload && (
                  <QMR.Upload
                    label="If you need additional space to describe your state's methodology, please attach further documentation below."
                    {...register(DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD)}
                  />
                ),
              ],
            },
          ]}
        />
      </div>
    </QMR.CoreQuestionWrapper>
  );
};
