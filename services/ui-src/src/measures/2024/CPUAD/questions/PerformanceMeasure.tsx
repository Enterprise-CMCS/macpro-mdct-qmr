import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../../shared/CommonQuestions/types";
import { useWatch } from "react-hook-form";
import * as DC from "dataConstants";
import { NdrSetProps, Props } from "shared/types/TypePerformanceMeasure";
import { allNumbers, allPositiveIntegersWith8Digits } from "utils";

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

  const name = `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categoryID}`;
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: rates,
  });

  //we have to generate both NDR sets and field sets for this measure so we need to filter out the field sets by boolean check
  const fieldIds = qualifiers
    .filter((qual) => qual.isField)
    .map((qual) => `${categoryID}.${qual.id}`);

  //use the id to find the correct fields in field.value
  const fieldRates = (field.value as any[]).filter((field) =>
    fieldIds.includes(field.uid)
  );

  return (
    <>
      <RateComponent
        rates={[rates[0], rates[1]]}
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
      {fieldRates.map((rate: QMR.IRate) => {
        return FieldComponent(field, rate);
      })}
    </>
  );
};

const FieldComponent = (fields: any, rate: any) => {
  return (
    <CUI.Box mt={4} mb={8} key={rate.uid}>
      <CUI.FormLabel fontWeight={700} data-cy={rate.label}>
        {rate.label}
      </CUI.FormLabel>
      <CUI.Input
        type="text"
        aria-label={`${fields.name}.${rate.id}.value`}
        value={rate.value ?? ""}
        data-cy={`${fields.name}.${rate.id}.value`}
        onChange={(e) => changeRate(fields, rate.id, e.target.value)}
      />
    </CUI.Box>
  );
};

// Handle inputs and update conditionally perform rate calculation
const changeRate = (field: any, index: number, newValue: string) => {
  // check that the input is postive numbers only
  if (
    !allNumbers.test(newValue) ||
    !allPositiveIntegersWith8Digits.test(newValue)
  )
    return;
  //make a copy of current rate before update
  const prevRate = [...field.value];
  //store to edit.
  const editRate = { ...prevRate[index] };
  editRate["value"] = newValue;
  //pass edit value back to previous rate
  prevRate[index] = editRate;
  //trigger field change to new rate
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
