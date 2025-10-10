import * as QMR from "components";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { parseLabelToHTML } from "utils";

export const DeviationFromMeasureSpec = () => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper
      label={labels.DeviationFromMeasureSpecification.header}
      testid="deviation-from-measure-specification"
    >
      <QMR.RadioButton
        key={DC.DID_CALCS_DEVIATE}
        name={DC.DID_CALCS_DEVIATE}
        renderHelperTextAbove
        formLabelProps={{ fontWeight: 600 }}
        label={labels.DeviationFromMeasureSpecification.section}
        helperText={labels.DeviationFromMeasureSpecification.helper}
        options={[
          {
            displayValue:
              labels.DeviationFromMeasureSpecification.options[0].displayValue,
            value: labels.DeviationFromMeasureSpecification.options[0].value,
            children: [
              <QMR.TextArea
                name={DC.DEVIATION_REASON}
                key={DC.DEVIATION_REASON}
                label={parseLabelToHTML(
                  labels.DeviationFromMeasureSpecification.deviationReason
                )}
                formLabelProps={{ fontWeight: 400 }}
              />,
            ],
          },
          {
            displayValue:
              labels.DeviationFromMeasureSpecification.options[1].displayValue,
            value: labels.DeviationFromMeasureSpecification.options[1].value,
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
