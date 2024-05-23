import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";
import { Alert } from "@cmsgov/design-system";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface DataSourceProps {
  coreset?: string;
}

export const DataSource = ({ coreset }: DataSourceProps) => {
  const register = useCustomRegister<FormData>();
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
      <QMR.RadioButton
        formControlProps={{ paddingBottom: 4 }}
        label="Which version of the CAHPS survey was used for reporting?"
        formLabelProps={{ fontWeight: 700 }}
        {...register("DataSource-CAHPS-Version")}
        options={[
          { displayValue: "CAHPS 5.1H", value: "CAHPS 5.1H" },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Describe the Data Source:"
                {...register("DataSource-CAHPS-Version-Other")}
              />,
              (coreset === "adult" || coreset === "child") &&
                labels?.DataSourceCahps.otherDataSourceWarning && (
                  <CUI.Box mt="8">
                    <Alert heading="Please Note" variation="warn">
                      <CUI.Text>
                        {labels.DataSourceCahps.otherDataSourceWarning}
                      </CUI.Text>
                    </Alert>
                  </CUI.Box>
                ),
            ],
          },
        ]}
      />
      <CUI.Heading size="sm">
        Which Supplemental Item Sets were included in the Survey
      </CUI.Heading>
      <QMR.Checkbox
        formControlProps={{ paddingBottom: 4 }}
        {...register("DataSource-Included-ItemSets")}
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
                {...register("DataSource-Included-ItemSets-Other")}
              />,
            ],
          },
        ]}
        label="Select all that apply:"
      />
      <QMR.RadioButton
        label="Which administrative protocol was used to administer the survey?"
        formLabelProps={{ fontWeight: 700 }}
        {...register("DataSource-Admin-Protocol")}
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
                {...register("DataSource-Admin-Protocol-Other")}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
