import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Types from "../../types";
import * as DC from "dataConstants";
import { PerformanceMeasureData } from "./data";
import { useWatch } from "react-hook-form";
import { getLabelText, isLegacyLabel, LabelData, rateIsReadOnly } from "utils";
import { ndrFormula } from "types";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { featuresByYear } from "utils/featuresByYear";

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
  const labelText = getLabelText();

  return (
    <>
      {categories.map((cat) => {
        let rates: QMR.IRate[] | undefined = qualifiers
          ?.filter((qual) => !qual.excludeFromIds?.includes(cat.id))
          .map((qual, idx) => ({
            label: qual.label,
            uid: isLegacyLabel() ? undefined : cat.id + "." + qual.id,
            id: idx,
          }));

        rates = rates?.length ? rates : [{ id: 0 }];

        //temporary check to make IETRate component work again, will be updated during the refactor
        const registerId =
          !isLegacyLabel() && measureName?.includes("IET")
            ? `${DC.PERFORMANCE_MEASURE}.${DC.RATES}`
            : `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${cat.id}`;

        return (
          <CUI.Box key={cat.id}>
            <CUI.Text fontWeight="bold" my="5">
              {labelText[cat.label] ?? cat.label}
            </CUI.Text>
            <RateComponent
              key={registerId}
              name={registerId}
              readOnly={rateReadOnly}
              rates={rates}
              measureName={measureName}
              inputFieldNames={inputFieldNames}
              ndrFormulas={ndrFormulas}
              rateMultiplicationValue={rateScale}
              calcTotal={calcTotal}
              categoryName={cat.label}
              category={cat}
              categories={categories}
              qualifiers={qualifiers}
              customMask={customMask}
              customNumeratorLabel={customNumeratorLabel}
              customDenominatorLabel={customDenominatorLabel}
              customRateLabel={customRateLabel}
              rateCalc={rateCalc}
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
  const categoryID = categories[0]?.id ? categories[0].id : DC.SINGLE_CATEGORY;

  const rates: QMR.IRate[] = qualifiers.map((qual, idx) => ({
    label: qual.label,
    uid: isLegacyLabel() ? undefined : `${categoryID}.${qual.id}`, //this uid exist from 2023 onward
    id: idx,
  }));
  return (
    <>
      <RateComponent
        key={`${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categoryID}`}
        name={`${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${categoryID}`}
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

/** Data Driven Performance Measure Comp */
export const PerformanceMeasure = ({
  data,
  calcTotal = false,
  rateReadOnly,
  rateScale,
  customMask,
  hybridMeasure,
  allowNumeratorGreaterThanDenominator,
  customNumeratorLabel,
  customDenominatorLabel,
  customRateLabel,
  showtextbox = true,
  rateCalc,
  RateComponent = QMR.Rate, // Default to QMR.Rate
}: Props) => {
  const dataSourceWatch = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
  }) as string[] | string | undefined;

  let readOnly = false;
  if (rateReadOnly !== undefined) {
    readOnly = rateReadOnly;
  } else {
    readOnly = rateIsReadOnly(dataSourceWatch);
  }

  data.questionText = data.questionText ?? [];
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);

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
          {data.questionListOrderedItems.map((item, idx) => {
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
      {showtextbox && (
        <QMR.TextArea
          key={`${DC.PERFORMANCE_MEASURE}.${DC.EXPLAINATION}`}
          name={`${DC.PERFORMANCE_MEASURE}.${DC.EXPLAINATION}`}
          label="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
        />
      )}
      {hybridMeasure && featuresByYear.displayCovidLanguage && (
        <CUI.Box my="5">
          <CUI.Text>{labels?.PerformanceMeasure?.phe}</CUI.Text>
          <QMR.TextArea
            key={`${DC.PERFORMANCE_MEASURE}.${DC.PMHYBRIDEXPLANATION}`}
            name={`${DC.PERFORMANCE_MEASURE}.${DC.PMHYBRIDEXPLANATION}`}
            formLabelProps={{ mt: 5 }}
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
      {!readOnly && (
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
