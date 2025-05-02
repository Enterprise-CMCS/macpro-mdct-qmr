import * as QMR from "components";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { OMSData } from "../OptionalMeasureStrat/data";
import { Accordion } from "@chakra-ui/react";

interface Props {
  coreset?: string;
}

export const NewOptionalMeasureStrat = ({ coreset }: Props) => {
  const labels: any = useContext(SharedContext);
  const year = labels.year;

  const omsData = OMSData(year, coreset === "adult");

  return (
    <QMR.CoreQuestionWrapper testid="OMS" label="Measure Stratification">
      <Accordion></Accordion>
    </QMR.CoreQuestionWrapper>
  );
};
