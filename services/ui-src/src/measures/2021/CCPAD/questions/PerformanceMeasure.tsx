import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { useFormContext } from "react-hook-form";

export const PerformanceMeasure = () => {
  const register = useCustomRegister<Measure.Form>();
  const { watch } = useFormContext<Measure.Form>();

  // Watch for dataSource data
  const dataSourceWatch = watch("DataSource");

  // Conditional check to let rate be readonly when administrative data is the only option or no option is selected
  const rateReadOnly =
    dataSourceWatch?.every((source) => source === "AdministrativeData") ?? true;

  const ageRates = [
    {
      label: "Three Days Postpartum Rate",
      id: 1,
    },
    {
      label: "Sixty Days Postpartum Rate",
      id: 2,
    },
  ];

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      Among women ages 21 to 44 who had a live birth, the percentage that:
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Were provided a most effective or moderately effective method of
          contraception within 3 and 60 days of delivery
        </CUI.ListItem>
        <CUI.ListItem>
          Were provided a long-acting reversible method of contraception (LARC)
          within 3 and 60 days of delivery
        </CUI.ListItem>
      </CUI.UnorderedList>
      <QMR.TextArea
        label="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"
        {...register("PerformanceMeasure-Explanation")}
      />
      <CUI.Text fontWeight="bold">
        Enter a number for the numerator and the denominator. Rate will
        auto-calculate:
      </CUI.Text>
      <CUI.Text fontWeight="bold" my="5">
        Most effective or moderately effective method of contraception
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-effectiveContraception")}
      />
      <CUI.Text fontWeight="bold" my="5">
        Long-acting reversible method of contraception (LARC)
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={ageRates}
        {...register("PerformanceMeasure-AgeRates-longActingContraception")}
      />
    </QMR.CoreQuestionWrapper>
  );
};
