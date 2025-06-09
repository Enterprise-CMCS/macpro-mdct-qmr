import * as QMR from "components";
import * as Common from "./Common";
import * as CUI from "@chakra-ui/react";

import * as Form from "labels/QualifierFormsDatas";
import { useEffect, useState } from "react";
import { validationFunctions } from "shared/Qualifiers/validationFunctions";
import { DeliverySystems } from "shared/Qualifiers/deliverySystems";
import { useParams } from "react-router-dom";
import * as Types from "types";

export const Qualifier = ({
  setValidationFunctions,
  year,
}: QMR.MeasureWrapperProps) => {
  const { coreSetId } = useParams();
  const [type, setType] = useState<"CH" | "AD" | "HH">("AD");
  const coreSet = (coreSetId?.split("_")?.[0] ??
    coreSetId) as Types.CoreSetAbbr;

  useEffect(() => {
    if (setValidationFunctions && coreSetId) {
      setValidationFunctions(
        validationFunctions?.[
          (coreSetId?.split("_")?.[0] ?? coreSetId) as Types.CoreSetAbbr
        ] ?? []
      );
    }
    if (
      coreSetId === Types.CoreSetAbbr.CCS ||
      coreSetId === Types.CoreSetAbbr.CCSC ||
      coreSetId === Types.CoreSetAbbr.CCSM
    ) {
      setType("CH");
    } else if (coreSet === Types.CoreSetAbbr.HHCS) {
      setType("HH");
    }
  }, [setValidationFunctions, coreSetId, setType, coreSet]);

  const data =
    Form[
      `QualifierFormsData${year}` as
        | "QualifierFormsData2021"
        | "QualifierFormsData2022"
        | "QualifierFormsData2023"
        | "QualifierFormsData2024"
    ].Data[coreSet];

  return (
    <>
      <CUI.VStack maxW="5xl" as="section" justifyContent={"space-between"}>
        <CUI.Box mb="7" mt="3">
          <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
            {data?.title}
          </CUI.Text>
          <QMR.SupportLinks />
          {type === "HH" && <QMR.HealthHomeInfo />}
        </CUI.Box>
        <CUI.OrderedList width="100%">
          {type !== "HH" && <Common.GeneralAge></Common.GeneralAge>}
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
