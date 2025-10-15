import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";
import * as Common from ".";
import { allPositiveIntegersWith10Digits } from "utils";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  year: string;
}

export const CostSavingsData = ({ year }: Props) => {
  const padding = "10px";

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader header="Cost Savings Data" description="" />
      <QMR.NumberInput
        key={DC.YEARLY_COST_SAVINGS}
        name={DC.YEARLY_COST_SAVINGS}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={`Amount of cost savings for ${
          featuresByYear.displayFFYLanguage ? "FFY" : ""
        } ${parseInt(year) - 1}`}
      />
      <QMR.TextArea
        key={DC.COST_SAVINGS_METHODOLOGY}
        name={DC.COST_SAVINGS_METHODOLOGY}
        label="Please describe your cost savings methodology:"
        formLabelProps={{ fontWeight: "400", padding: padding }}
      />
      <CUI.Box marginTop={10}>
        <QMR.Upload
          label="If you need additional space to provide information regarding cost savings data, please attach further documentation below."
          key={DC.HEALTH_HOME_QUALIFIER_FILE_UPLOAD}
          name={DC.HEALTH_HOME_QUALIFIER_FILE_UPLOAD}
        />
      </CUI.Box>
    </CUI.ListItem>
  );
};
