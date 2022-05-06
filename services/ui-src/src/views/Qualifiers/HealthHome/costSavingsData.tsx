import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "./types";
import { useParams } from "react-router-dom";
import { allPositiveIntegersWith10Digits } from "utils/numberInputMasks";

export const CostSavingsData = () => {
  const { year }: any = useParams();
  const register = useCustomRegister<Types.CostSavingsData>();
  const padding = "10px";
  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader header="Cost Savings Data" description="" />
      <QMR.NumberInput
        {...register("yearlyCostSavings")}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={`Amount of cost savings for FFY ${year - 1}`}
      />
      <QMR.TextArea
        {...register("costSavingsMethodology")}
        label="Please describe your cost savings methodology:"
        formLabelProps={{ fontWeight: "400", padding: padding }}
      />
      <CUI.Box marginTop={10}>
        <QMR.Upload
          label="If you need additional space to provide information regarding cost savings data, please attach further documentation below."
          {...register("costSavingsFile")}
        />
      </CUI.Box>
    </CUI.ListItem>
  );
};
