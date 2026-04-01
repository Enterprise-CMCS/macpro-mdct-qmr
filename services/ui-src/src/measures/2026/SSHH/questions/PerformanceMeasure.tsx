import { useFormContext, useFieldArray } from "react-hook-form";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as DC from "dataConstants";
import * as Types from "shared/types";
import { useEffect } from "react";
import { rateIsReadOnly } from "utils";

interface Props {
  hybridMeasure?: boolean;
  rateAlwaysEditable?: boolean;
}

export const PerformanceMeasure = ({ rateAlwaysEditable }: Props) => {
  const { control, reset } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: DC.OPM_RATES,
    control,
    shouldUnregister: true,
  });

  useEffect(() => {
    if (fields.length === 0) {
      reset({
        name: DC.OPM_RATES,
        [DC.OPM_RATES]: [
          {
            [DC.DESCRIPTION]: "",
          },
        ],
      });
    }
  }, [fields, reset]);

  const { watch } = useFormContext<Types.DataSource>();

  const dataSourceWatch = watch([DC.DATA_SOURCE, DC.DATA_SOURCE_SELECTIONS]);

  let rateReadOnly = false;
  if (rateAlwaysEditable !== undefined) {
    rateReadOnly = !rateAlwaysEditable;
  } else {
    rateReadOnly = rateIsReadOnly(dataSourceWatch);
  }

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <QMR.TextArea
        key={DC.OPM_EXPLAINATION}
        name={DC.OPM_EXPLAINATION}
        label="Describe the methodology used:"
        formLabelProps={{ fontWeight: 700 }}
      />
      <CUI.Box marginTop={10}>
        {fields.map((_item, index) => {
          return (
            <QMR.DeleteWrapper
              allowDeletion={index !== 0}
              onDelete={() => remove(index)}
              key={_item.id}
            >
              <CUI.Stack key={index} my={10}>
                <CUI.Heading fontSize="lg" fontWeight="600">
                  Describe the Rate:
                </CUI.Heading>
                <QMR.TextInput
                  label="For example, specify the age groups and whether you are reporting on a certain indicator:"
                  name={`${DC.OPM_RATES}.${index}.${DC.DESCRIPTION}`}
                  key={`${DC.OPM_RATES}.${index}.${DC.DESCRIPTION}`}
                />
                <CUI.Text fontWeight="bold">
                  Enter a number for the numerator and the denominator. Rate
                  will auto-calculate:
                </CUI.Text>
                {!rateReadOnly && (
                  <CUI.Heading pt="5" size={"sm"}>
                    Please review the auto-calculated rate and revise if needed.
                  </CUI.Heading>
                )}
                <QMR.Rate
                  rates={[
                    {
                      id: index,
                    },
                  ]}
                  name={`${DC.OPM_RATES}.${index}.${DC.RATE}`}
                  key={`${DC.OPM_RATES}.${index}.${DC.RATE}`}
                  readOnly={rateReadOnly}
                />
              </CUI.Stack>
            </QMR.DeleteWrapper>
          );
        })}

        <QMR.ContainedButton
          buttonText={"+ Add Another"}
          variant="outline-primary"
          onClick={() => {
            append({});
          }}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
