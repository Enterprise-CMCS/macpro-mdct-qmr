import { useFormContext, useFieldArray } from "react-hook-form";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as DC from "dataConstants";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import { useEffect } from "react";

interface Props {
  hybridMeasure?: boolean;
  rateAlwaysEditable?: boolean;
}

const stringIsReadOnly = (dataSource: string) => {
  return dataSource === "AdministrativeData";
};

const arrayIsReadOnly = (dataSource: string[]) => {
  if (dataSource.length === 0) {
    return false;
  }
  return (
    dataSource?.every((source) => source === "AdministrativeData") ?? false
  );
};

export const PerformanceMeasure = ({
  hybridMeasure,
  rateAlwaysEditable,
}: Props) => {
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

  const register = useCustomRegister<Types.OtherPerformanceMeasure>();

  const { watch } = useFormContext<Types.DataSource>();

  // Watch for dataSource data
  const dataSourceWatch = watch(DC.DATA_SOURCE);

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  let rateReadOnly = false;
  if (rateAlwaysEditable !== undefined) {
    rateReadOnly = false;
  } else if (dataSourceWatch && Array.isArray(dataSourceWatch)) {
    rateReadOnly = arrayIsReadOnly(dataSourceWatch);
  } else if (dataSourceWatch) {
    rateReadOnly = stringIsReadOnly(dataSourceWatch);
  }

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <QMR.TextArea
        label="Describe the methodology used:"
        formLabelProps={{ fontWeight: 700 }}
        {...register(DC.OPM_EXPLAINATION)}
      />
      {hybridMeasure && (
        <CUI.Box my="5">
          <CUI.Text>
            CMS recognizes that social distancing will make onsite medical chart
            reviews inadvisable during the COVID-19 pandemic. As such, hybrid
            measures that rely on such techniques will be particularly
            challenging during this time. While reporting of the Core Sets is
            voluntary, CMS encourages states that can collect information safely
            to continue reporting the measures they have reported in the past.
          </CUI.Text>
          <QMR.TextArea
            formLabelProps={{ mt: 5 }}
            {...register(DC.OPM_HYBRID_EXPLANATION)}
            label="Describe any COVID-related difficulties encountered while collecting this data:"
          />
        </CUI.Box>
      )}

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
                {(dataSourceWatch?.[0] !== "AdministrativeData" ||
                  dataSourceWatch?.length !== 1) && (
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
          buttonProps={{
            variant: "outline",
            colorScheme: "blue",
            color: "blue.500",
          }}
          onClick={() => {
            append({});
          }}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
