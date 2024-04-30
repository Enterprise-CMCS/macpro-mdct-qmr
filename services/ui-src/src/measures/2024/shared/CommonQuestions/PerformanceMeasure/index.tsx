import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";
import { PerformanceMeasureData } from "./data";
import { useWatch } from "react-hook-form";
import { LabelData, getLabelText } from "utils";
import { ndrFormula } from "types";
import { useFlags } from "launchdarkly-react-client-sdk";

interface Props {
  data: PerformanceMeasureData;
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  rateScale?: number;
  customMask?: RegExp;
  hybridMeasure?: boolean;
  showtextbox?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
  RateComponent?: RateComp;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

interface NdrSetProps {
  categories?: LabelData[];
  qualifiers?: LabelData[];
  measureName?: string;
  inputFieldNames?: LabelData[];
  ndrFormulas?: ndrFormula[];
  rateReadOnly: boolean;
  calcTotal: boolean;
  rateScale?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
  RateComponent: RateComp;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  rateCalc?: RateFormula;
}

/** Maps over the categories given and creates rate sets based on the qualifiers, with a default of one rate */
const CategoryNdrSets = ({
  rateReadOnly,
  categories = [],
  qualifiers,
  measureName,
  inputFieldNames,
  ndrFormulas,
  rateScale,
  customMask,
  allowNumeratorGreaterThanDenominator,
  calcTotal,
  RateComponent,
  customNumeratorLabel,
  customDenominatorLabel,
  customRateLabel,
  rateCalc,
}: NdrSetProps) => {
  const register = useCustomRegister();
  const labelText = getLabelText();

  const rates = categories.map((cat) => {
    let qualRates: QMR.IRate[] | undefined = qualifiers?.map((qual, idx) => ({
      label: qual.label,
      uid: cat.id + "." + qual.id,
      id: idx,
      isTotal:
        cat.label?.toLowerCase().includes("total") ||
        qual.id.toLowerCase().includes("total"),
    }));
    return qualRates?.length ? qualRates : [{ id: 0 }];
  });

  measureName = "IET";

  return (
    <>
      {rates.map((qualRates, idx) => {
        const registerId = measureName?.includes("IET")
          ? `${DC.PERFORMANCE_MEASURE}.${DC.RATES}`
          : `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categories[idx].id}`;
        return (
          <CUI.Box key={categories[idx].id}>
            <CUI.Text fontWeight="bold" my="5">
              {labelText[categories[idx].label] ?? categories[idx].label}
            </CUI.Text>
            <RateComponent
              readOnly={rateReadOnly}
              rates={qualRates}
              testRates={rates}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rateMultiplicationValue={rateScale}
              calcTotal={calcTotal}
              categoryName={categories[idx].label}
              category={categories[idx]}
              categories={categories}
              customMask={customMask}
              customNumeratorLabel={customNumeratorLabel}
              customDenominatorLabel={customDenominatorLabel}
              customRateLabel={customRateLabel}
              rateCalc={rateCalc}
              {...register(registerId)}
              allowNumeratorGreaterThanDenominator={
                allowNumeratorGreaterThanDenominator
              }
            />
          </CUI.Box>
        );
      })}
    </>
  );
};

/** If no categories, we still need a rate for the PM
 * 2023 and onward, categories are expected to have at least object filled for creating uid in database
 */
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
    uid: `${categoryID}.${item.id}`, //this uid is used to map to the N/D/R data's id key in the database
    id: idx,
  }));
  return (
    <>
      <RateComponent
        rates={rates}
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
    </>
  );
};

/** Creates the NDR sets based on given categories and qualifiers */
const PerformanceMeasureNdrs = (props: NdrSetProps) => {
  let ndrSets;

  if (props.categories?.length && props.categories.some((item) => item.label)) {
    ndrSets = <CategoryNdrSets {...props} />;
  } else if (props.qualifiers?.length) {
    ndrSets = <QualifierNdrSets {...props} />;
  }

  return <CUI.Box key="PerformanceMeasureNdrSets">{ndrSets}</CUI.Box>;
};

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
/** Data Driven Performance Measure Comp */
export const PerformanceMeasure = ({
  data,
  calcTotal = false,
  rateScale,
  customMask,
  hybridMeasure,
  allowNumeratorGreaterThanDenominator,
  customNumeratorLabel,
  customDenominatorLabel,
  customRateLabel,
  rateCalc,
  RateComponent = QMR.Rate, // Default to QMR.Rate
}: Props) => {
  const register = useCustomRegister<Types.PerformanceMeasure>();
  const pheIsCurrent = useFlags()?.["periodOfHealthEmergency2024"];
  const dataSourceWatch = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
  }) as string[] | string | undefined;
  let readOnly = false;
  if (dataSourceWatch && Array.isArray(dataSourceWatch)) {
    readOnly = arrayIsReadOnly(dataSourceWatch);
  } else if (dataSourceWatch) {
    readOnly = stringIsReadOnly(dataSourceWatch);
  }

  data.questionText = data.questionText ?? [];

  return (
    <QMR.CoreQuestionWrapper
      testid="performance-measure"
      label="Performance Measure"
    >
      <CUI.Stack>
        {data.questionText.map((item, idx) => {
          return (
            <CUI.Text key={`questionText.${idx}`} mb={5}>
              {item}
            </CUI.Text>
          );
        })}
      </CUI.Stack>
      {data.questionSubtext && (
        <CUI.Stack my="5" spacing={5}>
          {data.questionSubtext.map((item, idx) => {
            return (
              <CUI.Text key={`performanceMeasureListItem.${idx}`}>
                {data.questionSubtextTitles?.[idx] && (
                  <CUI.Text display="inline" fontWeight="600">
                    {data.questionSubtextTitles?.[idx]}
                  </CUI.Text>
                )}
                <CUI.Text>{item}</CUI.Text>
              </CUI.Text>
            );
          })}
        </CUI.Stack>
      )}
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
      {data.questionListOrderedItems && (
        <CUI.OrderedList m="5" ml="10" spacing={5}>
          {data.questionListOrderedItems?.map((item, idx) => {
            return (
              <CUI.ListItem key={`performanceMeasureListItem.${idx}`}>
                {data.questionListTitles?.[idx] && (
                  <CUI.Text display="inline" fontWeight="600">
                    {data.questionListTitles?.[idx]}
                    <br />
                  </CUI.Text>
                )}
                {item}
              </CUI.ListItem>
            );
          })}
        </CUI.OrderedList>
      )}
      {hybridMeasure && pheIsCurrent && (
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
            {...register("PerformanceMeasure.hybridExplanation")}
            label="Describe any COVID-related difficulties encountered while collecting this data:"
          />
        </CUI.Box>
      )}
      <CUI.Text
        fontWeight="bold"
        mt={5}
        dangerouslySetInnerHTML={{
          __html:
            data.customPrompt ??
            `Enter a number for the numerator and the denominator. Rate will
          auto-calculate:`,
        }}
        data-cy="Enter a number for the numerator and the denominator"
      />
      {(dataSourceWatch?.[0] !== "AdministrativeData" ||
        dataSourceWatch?.length !== 1) && (
        <CUI.Heading pt="5" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <PerformanceMeasureNdrs
        RateComponent={RateComponent}
        categories={data.categories}
        qualifiers={data.qualifiers}
        measureName={data.measureName}
        inputFieldNames={data.inputFieldNames}
        ndrFormulas={data.ndrFormulas}
        rateReadOnly={readOnly}
        calcTotal={calcTotal}
        rateScale={rateScale}
        customMask={customMask}
        customNumeratorLabel={customNumeratorLabel}
        customDenominatorLabel={customDenominatorLabel}
        customRateLabel={customRateLabel}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
        rateCalc={rateCalc}
      />
    </QMR.CoreQuestionWrapper>
  );
};
