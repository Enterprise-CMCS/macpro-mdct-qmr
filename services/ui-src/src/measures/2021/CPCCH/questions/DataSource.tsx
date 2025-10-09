import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as DC from "dataConstants";

export const DataSource = () => {
  return (
    <QMR.CoreQuestionWrapper label="Data Source">
      <QMR.RadioButton
        formControlProps={{ paddingBottom: 4 }}
        label="Which version of the CAHPS survey was used for reporting?"
        formLabelProps={{ fontWeight: 700 }}
        key={DC.DATA_SOURCE_CAHPS_VERSION}
        name={DC.DATA_SOURCE_CAHPS_VERSION}
        options={[
          { displayValue: "CAHPS 5.1H", value: "CAHPS 5.1H" },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Describe the Data Soure:"
                key={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
                name={DC.DATA_SOURCE_CAHPS_VERSION_OTHER}
              />,
            ],
          },
        ]}
      />
      <CUI.Heading size="sm">
        Which Supplemental Item Sets were included in the Survey
      </CUI.Heading>
      <QMR.Checkbox
        formControlProps={{ paddingBottom: 4 }}
        key={DC.DATA_SOUCRE_INCLUDE_ITEMSETS}
        name={DC.DATA_SOUCRE_INCLUDE_ITEMSETS}
        options={[
          {
            displayValue: "No Supplemental Item Sets were included",
            value: "No Supplemental Item Sets were included",
          },
          {
            displayValue: "CAHPS Item Set for Children with Chronic Conditions",
            value: "CAHPS Item Set for Children with Chronic Conditions",
          },
          {
            displayValue: "Other CAHPS Item Set",
            value: "Other CAHPS Item Set",
            children: [
              <QMR.TextArea
                label="Explain:"
                key={DC.DATA_SOUCRE_INCLUDE_ITEMSETS_OTHER}
                name={DC.DATA_SOUCRE_INCLUDE_ITEMSETS_OTHER}
              />,
            ],
          },
        ]}
        label="Select all that apply:"
      />
      <QMR.RadioButton
        label="Which administrative protocol was used to administer the survey?"
        formLabelProps={{ fontWeight: 700 }}
        key={DC.DATA_SOURCE_ADMIN_PROTOCAL}
        name={DC.DATA_SOURCE_ADMIN_PROTOCAL}
        options={[
          {
            displayValue: "NCQA/HEDIS CAHPS 5.1H administrative protocol",
            value: "NCQA/HEDIS CAHPS 5.1H administrative protocol",
          },

          {
            displayValue: "AHRQ CAHPS administrative protocol",
            value: "AHRQ CAHPS administrative protocol",
          },
          {
            displayValue: "Other administrative protocol",
            value: "Other administrative protocol",
            children: [
              <QMR.TextArea
                label="Explain:"
                key={DC.DATA_SOURCE_ADMIN_PROTOCAL_OTHER}
                name={DC.DATA_SOURCE_ADMIN_PROTOCAL_OTHER}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
