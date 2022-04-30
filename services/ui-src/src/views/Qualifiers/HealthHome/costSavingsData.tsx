import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "./types";
import { useParams } from "react-router-dom";

export const CostSavingsData = () => {
  const { year } = useParams();
  const register = useCustomRegister<Types.CostSavingsData>();
  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader header="Cost Savings Data" description="" />
      <QMR.NumberInput
        {...register("yearlyCostSavings")}
        formLabelProps={{ fontWeight: "400" }}
        label={`Amount of cost savings for FFY ${year}`}
      />
      <QMR.TextArea
        {...register("costSavingsMethodology")}
        label="Please describe your cost savings methodology:"
        formLabelProps={{ fontWeight: 400 }}
      />
      <CUI.Box marginTop={10}>
        <QMR.Upload
          label="If you need additional space to include comments or supplemental information, please attach further documentation below."
          {...register("costSavingsFile")}
        />
      </CUI.Box>
    </CUI.ListItem>
  );
};
