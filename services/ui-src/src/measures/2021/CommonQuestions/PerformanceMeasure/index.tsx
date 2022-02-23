import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import { PerformanceMeasureData } from "./data";

interface Props {
  data: PerformanceMeasureData;
  rateReadOnly?: boolean;
  calcTotal?: boolean;
}

interface NdrSetProps {
  categories?: string[];
  qualifiers?: string[];
  rateReadOnly: boolean;
  calcTotal: boolean;
}

const buildCategoryNdrSets = ({
  rateReadOnly,
  categories = [],
  qualifiers,
}: NdrSetProps) => {
  const register = useCustomRegister();

  return categories.map((item) => {
    const rates: QMR.IRate[] = qualifiers?.map((cat, i) => ({
      label: cat,
      id: i,
    })) ?? [{ id: 0 }];

    return (
      <>
        <CUI.Text fontWeight="bold" my="5">
          {item}
        </CUI.Text>
        <QMR.Rate
          readOnly={rateReadOnly}
          rates={rates}
          {...register(`PerformanceMeasure.rates.${item}`)}
        />
      </>
    );
  });
};

const buildQualifierNdrSets = ({
  rateReadOnly,
  qualifiers = [],
}: NdrSetProps) => {
  const register = useCustomRegister();

  const rates: QMR.IRate[] = qualifiers.map((item, id) => ({
    label: item,
    id,
  }));
  return (
    <QMR.Rate
      rates={rates}
      readOnly={rateReadOnly}
      {...register("PerformanceMeasure.rates.singleCategory")}
    />
  );
};

const PerformanceMeasureNdrs = (props: NdrSetProps) => {
  let ndrSets;

  if (props.categories?.length) {
    ndrSets = buildCategoryNdrSets(props);
  } else if (props.qualifiers?.length) {
    ndrSets = buildQualifierNdrSets(props);
  }

  return <CUI.Box key="PerformanceMeasureNdrSets">{ndrSets}</CUI.Box>;
};

export const PerformanceMeasure = ({
  data,
  calcTotal = false,
  rateReadOnly = true,
}: Props) => {
  const register = useCustomRegister<Types.PerformanceMeasure>();

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      <CUI.Text>{data.questionText}</CUI.Text>
      {data.questionListItems && (
        <CUI.UnorderedList m="5" ml="10">
          {data.questionListItems.map((item, idx) => {
            return (
              <CUI.ListItem key={`performanceMeasureListItem.${idx}`}>
                {item}
              </CUI.ListItem>
            );
          })}
        </CUI.UnorderedList>
      )}
      <QMR.TextArea
        label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
        {...register("PerformanceMeasure.explanation")}
      />
      <CUI.Text fontWeight="bold">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      <PerformanceMeasureNdrs
        categories={data.categories}
        qualifiers={data.qualifiers}
        rateReadOnly={rateReadOnly}
        calcTotal={calcTotal}
      />
    </QMR.CoreQuestionWrapper>
  );
};
