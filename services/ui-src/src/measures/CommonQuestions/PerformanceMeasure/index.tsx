import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import * as DC from "dataConstants";
import { PerformanceMeasureData } from "./data";
import { useWatch } from "react-hook-form";

interface Props {
  data: PerformanceMeasureData;
  rateReadOnly?: boolean;
  calcTotal?: boolean;
  rateScale?: number;
  customMask?: RegExp;
  hybridMeasure?: boolean;
  showtextbox?: boolean;
  allowNumeratorGreaterThanDenominator?: boolean;
}

interface NdrSetProps {
  categories?: string[];
  qualifiers?: string[];
  rateReadOnly: boolean;
  calcTotal: boolean;
  rateScale?: number;
  customMask?: RegExp;
  allowNumeratorGreaterThanDenominator?: boolean;
}

/** Maps over the categories given and creates rate sets based on the qualifiers, with a default of one rate */
const CategoryNdrSets = ({
  rateReadOnly,
  categories = [],
  qualifiers,
  rateScale,
  customMask,
  allowNumeratorGreaterThanDenominator,
}: NdrSetProps) => {
  const register = useCustomRegister();

  return (
    <>
      {categories.map((item) => {
        let rates: QMR.IRate[] | undefined = qualifiers?.map((cat, idx) => ({
          label: cat,
          id: idx,
        }));

        rates = rates?.length ? rates : [{ id: 0 }];

        const cleanedName = item.replace(/[^\w]/g, "");

        return (
          <CUI.Box key={item}>
            <CUI.Text fontWeight="bold" my="5">
              {item}
            </CUI.Text>
            {!rateReadOnly && (
              <CUI.Heading pt="5" size={"sm"}>
                Please review the auto-calculated rate and revise if needed.
              </CUI.Heading>
            )}
            <QMR.Rate
              readOnly={rateReadOnly}
              rates={rates}
              rateMultiplicationValue={rateScale}
              customMask={customMask}
              {...register(
                `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${cleanedName}`
              )}
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

/** If no categories, we still need a rate for the PM */
const QualifierNdrSets = ({
  rateReadOnly,
  qualifiers = [],
  rateScale,
  customMask,
  calcTotal,
  allowNumeratorGreaterThanDenominator,
}: NdrSetProps) => {
  const register = useCustomRegister();

  const rates: QMR.IRate[] = qualifiers.map((item, idx) => ({
    label: item,
    id: idx,
  }));
  return (
    <>
      {!rateReadOnly && (
        <CUI.Heading pt="5" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <QMR.Rate
        rates={rates}
        readOnly={rateReadOnly}
        rateMultiplicationValue={rateScale}
        customMask={customMask}
        calcTotal={calcTotal}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
        {...register(
          `${DC.PERFORMANCE_MEASURE}.${DC.RATES}.${DC.SINGLE_CATEGORY}`
        )}
      />
    </>
  );
};

/** Creates the NDR sets based on given categories and qualifiers */
const PerformanceMeasureNdrs = (props: NdrSetProps) => {
  let ndrSets;

  if (props.categories?.length) {
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
  return dataSource?.every((source) => source === "AdministrativeData") ?? true;
};
/** Data Driven Performance Measure Comp */
export const PerformanceMeasure = ({
  data,
  calcTotal = false,
  rateReadOnly,
  rateScale,
  customMask,
  hybridMeasure,
  showtextbox = true,
  allowNumeratorGreaterThanDenominator,
}: Props) => {
  const register = useCustomRegister<Types.PerformanceMeasure>();
  const dataSourceWatch = useWatch<Types.DataSource>({
    name: DC.DATA_SOURCE,
  }) as string[] | string | undefined;
  let readOnly = true;
  if (rateReadOnly !== undefined) {
    readOnly = rateReadOnly;
  } else if (dataSourceWatch && Array.isArray(dataSourceWatch)) {
    readOnly = arrayIsReadOnly(dataSourceWatch);
  } else if (dataSourceWatch) {
    readOnly = stringIsReadOnly(dataSourceWatch);
  }

  data.questionText = data.questionText ?? [];

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <CUI.Stack>
        {data.questionText.map((item, idx) => {
          return <CUI.Text key={`questionText.${idx}`}>{item}</CUI.Text>;
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
      {showtextbox && (
        <QMR.TextArea
          label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
          {...register(`${DC.PERFORMANCE_MEASURE}.${DC.EXPLAINATION}`)}
        />
      )}
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
            {...register("PerformanceMeasure.hybridExplanation")}
            label="Describe any COVID-related difficulties encountered while collecting this data:"
          />
        </CUI.Box>
      )}
      <CUI.Text
        fontWeight="bold"
        mt={5}
        data-cy="Enter a number for the numerator and the denominator"
      >
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      <PerformanceMeasureNdrs
        categories={data.categories}
        qualifiers={data.qualifiers}
        rateReadOnly={readOnly}
        calcTotal={calcTotal}
        rateScale={rateScale}
        customMask={customMask}
        allowNumeratorGreaterThanDenominator={
          allowNumeratorGreaterThanDenominator
        }
      />
    </QMR.CoreQuestionWrapper>
  );
};
