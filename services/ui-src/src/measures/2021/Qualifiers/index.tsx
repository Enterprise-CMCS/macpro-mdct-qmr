import * as QMR from "components";
import * as Common from "./Common";
import * as CUI from "@chakra-ui/react";

import { Data } from "./data";
import { useEffect } from "react";
import { validationFunctions } from "./validationFunctions";
import { DeliverySystems } from "./deliverySystems";
import { useParams } from "react-router-dom";
import * as Types from "types";

export * from "./data";

export const Qualifier = ({
  setValidationFunctions,
}: QMR.MeasureWrapperProps) => {
  const { coreSetId } = useParams();
  const coreSet = (coreSetId?.split("_")?.[0] ??
    coreSetId) as Types.CoreSetAbbr;

  useEffect(() => {
    if (setValidationFunctions) {
      setValidationFunctions(validationFunctions);
    }
  }, [setValidationFunctions]);

  let type: "CH" | "AD" | "HH" = "AD";
  if (
    coreSetId === Types.CoreSetAbbr.CCS ||
    coreSetId === Types.CoreSetAbbr.CCSC ||
    coreSetId === Types.CoreSetAbbr.CCSM
  ) {
    type = "CH";
  } else if (coreSet === Types.CoreSetAbbr.HHCS) {
    type = "HH";
  }

  const data = Data.ACS;

  return (
    <>
      <CUI.Box maxW="5xl" as="section">
        <CUI.Box mb="7" mt="3">
          <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
            {data?.title}
          </CUI.Text>
          <QMR.SupportLinks />
        </CUI.Box>
        <CUI.OrderedList>
          <DeliverySystems />
          <Common.Audit type={type} />
          <Common.ExternalContractor />
        </CUI.OrderedList>
      </CUI.Box>
    </>
  );
};
