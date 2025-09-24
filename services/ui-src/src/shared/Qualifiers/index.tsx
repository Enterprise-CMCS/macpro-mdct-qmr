import * as QMR from "components";
import * as Common from "./Common";
import * as CUI from "@chakra-ui/react";

import * as Form from "labels/QualifierFormsDatas";
import { useEffect, useState } from "react";
import { validationFunctions } from "shared/Qualifiers/validationFunctions";
import { DeliverySystems } from "shared/Qualifiers/deliverySystems";
import { useParams } from "react-router";
import * as Types from "types";

export const Qualifier = ({
  setValidationFunctions,
  year,
}: QMR.MeasureWrapperProps) => {
  const { coreSetId } = useParams();
  const [type, setType] = useState<"CH" | "AD" | "HH">("AD");
  const coreSetAbbr = coreSetId!.split("_")[0] as Types.CoreSetAbbr;

  useEffect(() => {
    if (setValidationFunctions && coreSetId) {
      setValidationFunctions(validationFunctions[coreSetAbbr] ?? []);
    }
    if (
      coreSetId === Types.CoreSetAbbr.CCS ||
      coreSetId === Types.CoreSetAbbr.CCSC ||
      coreSetId === Types.CoreSetAbbr.CCSM
    ) {
      setType("CH");
    } else if (coreSetAbbr === Types.CoreSetAbbr.HHCS) {
      setType("HH");
    }
  }, [setValidationFunctions, coreSetId, setType, coreSetAbbr]);

  const data =
    Form[
      `QualifierFormsData${year}` as
        | "QualifierFormsData2021"
        | "QualifierFormsData2022"
        | "QualifierFormsData2023"
        | "QualifierFormsData2024"
        | "QualifierFormsData2025"
    ].Data[coreSetAbbr];

  return (
    <>
      <CUI.VStack maxW="5xl" as="section" justifyContent={"space-between"}>
        <CUI.Box mb="7" mt="3">
          <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
            {data?.title}
          </CUI.Text>
          <CUI.Text mb="2">{data?.questionIntro}</CUI.Text>
          <QMR.SupportLinks />
          {type === "HH" && <QMR.HealthHomeInfo />}
        </CUI.Box>
        <CUI.OrderedList width="100%">
          {type !== "HH" && data.ageQuestion && (
            <Common.GeneralAge data={data}></Common.GeneralAge>
          )}
          {type === "HH" && (
            <>
              <Common.AdministrativeQuestions />
              <Common.CostSavingsData year={year} />
            </>
          )}
          <DeliverySystems data={data} year={year} />
          <CUI.Spacer flex={2} />
          <Common.Audit type={type} year={year} />
          {type !== "HH" && <Common.ExternalContractor />}
        </CUI.OrderedList>
      </CUI.VStack>
    </>
  );
};
