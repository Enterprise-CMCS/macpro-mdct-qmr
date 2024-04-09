import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../../shared/CommonQuestions/types";
import { useWatch } from "react-hook-form";
import * as DC from "dataConstants";
import { NdrSetProps, Props } from "shared/types/TypePerformanceMeasure";

const QualifierNdrSets = ({
  rateReadOnly,
  categories = [],
  qualifiers = [],
  measureName,
  inputFieldNames,
  ndrFormulas,
  rateScale,
  customMask,
  calcTotal,
  allowNumeratorGreaterThanDenominator,
  RateComponent,
  customNumeratorLabel,
  customDenominatorLabel,
  customRateLabel,
  rateCalc,
}: NdrSetProps) => {
  const register = useCustomRegister();
  const categoryID = categories[0]?.id ? categories[0].id : DC.SINGLE_CATEGORY;

  const rates: QMR.IRate[] = qualifiers.map((item, idx) => ({
    label: item.label,
    uid: `${categoryID}.${item.id}`,
    id: idx,
  }));

  const ndrRates = [rates[0], rates[1]];
  const name = `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categoryID}`;

  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: rates,
  });

  return (
    <>
      <RateComponent
        rates={ndrRates}
        readOnly={rateReadOnly}
        measureName={measureName}
        inputFieldNames={inputFieldNames}
        ndrFormulas={ndrFormulas}
        rateMultiplicationValue={rateScale}
        customMask={customMask}
        calcTotal={calcTotal}
        customNumeratorLabel={customNumeratorLabel}
        customDenominatorLabel={customDenominatorLabel}
        customRateLabel={customRateLabel}
        rateCalc={rateCalc}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
        {...register(`${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categoryID}`)}
      />
      <CUI.Heading size={"sm"}>Count of Exclusions</CUI.Heading>
      {field.value.map((item: QMR.IRate, idx: number) => {
        if(idx > 1)
            return FieldComponent(field, item, idx, field.name);
        return <></>
      })}
    </>
  );
};

const FieldComponent = (
  fields: any,
  field: any,
  index: number,
  name: string
) => {
  return (
    <CUI.Box mt={4} mb={8}>
      <CUI.FormLabel fontWeight={700} data-cy={field.label}>
        {field.label}
      </CUI.FormLabel>
      <CUI.Input
        type="text"
        aria-label={`${name}.${index}.value`}
        value={field.value ?? ""}
        data-cy={`${name}.${index}.value`}
        onChange={(e) => changeRate(fields, index, e.target.value)}
      />
    </CUI.Box>
  );
};

// Handle inputs and update conditionally perform rate calculation
const changeRate = (field: any, index: number, newValue: string) => {
  const prevRate = [...field.value];
  const editRate = { ...prevRate[index] };
  editRate["value"] = newValue;

  prevRate[index] = {
    label: "test",
    ...editRate,
  };

  field.onChange([...prevRate]);
};

/** Creates the NDR sets based on given categories and qualifiers */
const PerformanceMeasureNdrs = (props: NdrSetProps) => {
  let ndrSets = <QualifierNdrSets {...props} />;
  return <CUI.Box key="PerformanceMeasureNdrSets">{ndrSets}</CUI.Box>;
};

/** Data Driven Performance Measure Comp */
export const CPUADPerformanceMeasure = ({
  data,
  calcTotal = false,
  rateScale,
  customMask,
  allowNumeratorGreaterThanDenominator,
  customNumeratorLabel,
  customDenominatorLabel,
  customRateLabel,
  rateCalc,
  RateComponent = QMR.Rate, // Default to QMR.Rate
}: Props) => {
  const register = useCustomRegister<Types.PerformanceMeasure>();
  const dataSourceWatch = useWatch<Types.DataSource>({ name: "DataSource" }) as
    | string[]
    | undefined;
  const readOnly: boolean =
    dataSourceWatch?.length !== 0 &&
    dataSourceWatch?.every((source) => source === "AdministrativeData")!;

  return (
    <QMR.CoreQuestionWrapper
      testid="performance-measure"
      label="Performance Measure"
    >
      <CUI.Text mb={5}>{data.questionText}</CUI.Text>
      {data.questionListItems && (
        <CUI.UnorderedList m="5" ml="10" spacing={5}>
          {data.questionListItems.map((item, idx) => {
            return (
              <CUI.ListItem key={`performanceMeasureListItem.${idx}`}>
                {data.questionListTitles?.[idx] && (
                  <CUI.Text display="inline" fontWeight="600">
                    {data.questionListTitles?.[idx]}
                  </CUI.Text>
                )}
                {item}
              </CUI.ListItem>
            );
          })}
        </CUI.UnorderedList>
      )}
      <QMR.TextArea
        label="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
        {...register("PerformanceMeasure.explanation")}
      />
      <CUI.Text
        fontWeight="bold"
        mt={5}
        data-cy="Enter a number for the numerator and the denominator. Rate will auto-calculate:"
      >
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      {(dataSourceWatch?.[0] !== "AdministrativeData" ||
        dataSourceWatch?.length !== 1) && (
        <CUI.Heading pt="5" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <PerformanceMeasureNdrs
        categories={data.categories}
        qualifiers={data.qualifiers}
        rateReadOnly={readOnly}
        calcTotal={calcTotal}
        rateScale={rateScale}
        customMask={customMask}
        rateCalc={rateCalc}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
        customNumeratorLabel={customNumeratorLabel}
        customDenominatorLabel={customDenominatorLabel}
        customRateLabel={customRateLabel}
        RateComponent={RateComponent}
      />
    </QMR.CoreQuestionWrapper>
  );
};
