import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Common from ".";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "./../../types/TypeQualifierForm";
import { allPositiveIntegersWith10Digits } from "utils";

interface Props {
  year: string;
}

export const CostSavingsData = ({ year }: Props) => {
  const register = useCustomRegister<Types.CostSavingsData>();
  const padding = "10px";

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader header="Cost Savings Data" description="" />
      <QMR.NumberInput
        {...register("yearlyCostSavings")}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={`Amount of cost savings for FFY ${parseInt(year) - 1}`}
      />
      <QMR.TextArea
        {...register("costSavingsMethodology")}
        label="Please describe your cost savings methodology:"
        formLabelProps={{ fontWeight: "400", padding: padding }}
      />
      <CUI.Box marginTop={10}>
        <QMR.Upload
          label="If you need additional space to provide information regarding cost savings data, please attach further documentation below."
          {...register(DC.HEALTH_HOME_QUALIFIER_FILE_UPLOAD)}
        />
      </CUI.Box>
    </CUI.ListItem>
  );
};
