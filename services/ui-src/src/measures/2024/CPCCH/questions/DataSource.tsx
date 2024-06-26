import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { FormData } from "../types";
import { Alert } from "@cmsgov/design-system";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";

interface DataSourceProps {
  type?: string;
}

export const DataSource = ({ type }: DataSourceProps) => {
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
              (type === "adult" || type === "child") &&
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
      <QMR.RadioButton
        formControlProps={{ paddingBottom: 4 }}
        label=" Did you include the CAHPS Item Set for Children with Chronic Conditions
        in the survey?"
        formLabelProps={{ fontWeight: 700 }}
        {...register("DataSource-Included-ItemSets")}
        options={[
          {
            displayValue:
              "Yes, we included the CAHPS Item Set for Children with Chronic Conditions in the survey.",
            value:
              "Yes, we included the CAHPS Item Set for Children with Chronic Conditions in the survey.",
          },
          {
            displayValue:
              "No, we did not include the CAHPS Item Set for Children with Chronic Conditions in the survey.",
            value:
              "No, we did not include the CAHPS Item Set for Children with Chronic Conditions in the survey.",
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
