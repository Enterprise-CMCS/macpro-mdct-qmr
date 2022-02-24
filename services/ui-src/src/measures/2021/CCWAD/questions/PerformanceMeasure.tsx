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
    dataSourceWatch?.every(
      (source) => source === "I am reporting provisional data."
    ) ?? true;

  return (
    <QMR.CoreQuestionWrapper label="Performance Measure">
      Among women ages 21 to 44 at risk of unintended pregnancy, the percentage
      that:
      <CUI.UnorderedList m="5" ml="10">
        <CUI.ListItem>
          Were provided a most effective or moderately effective method of
          contraception
        </CUI.ListItem>
        <CUI.ListItem>
          Were provided a long-acting reversible method of contraception (LARC)
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
      {!rateReadOnly && (
        <CUI.Heading pt="1" size={"sm"}>
          Please review the auto-calculated rate and revise if needed.
        </CUI.Heading>
      )}
      <CUI.Text fontWeight="bold" my="5">
        Most effective or moderately effective method of contraception
      </CUI.Text>
      <QMR.Rate
        readOnly={rateReadOnly}
        rates={[
          {
            id: 1,
          },
        ]}
        {...register(
          "PerformanceMeasure-ModeratelyEffectiveMethodOfContraceptionRate"
        )}
      />
      <CUI.Text fontWeight="bold" my="5">
        Long-acting reversible method of contraception (LARC)
      </CUI.Text>
      <QMR.Rate
        {...register("PerformanceMeasure-ReversibleMethodOfContraceptionRate")}
        readOnly={rateReadOnly}
        rates={[
          {
            id: 1,
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
