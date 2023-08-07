import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import { DataSourceData, defaultData } from "./data";
import * as DC from "dataConstants";

interface DataSourceProps {
  data?: DataSourceData;
}

/**
 * Fully built DataSource component
 */
export const DataSourceRadio = ({ data = defaultData }: DataSourceProps) => {
  const register = useCustomRegister<Types.DataSource>();

  return (
    <QMR.CoreQuestionWrapper testid="data-source" label="Data Source">
      <QMR.RadioButton
        {...register(DC.DATA_SOURCE)}
        label={data.optionsLabel}
        options={[
          {
            displayValue: "CAHPS 5.1H",
            value: "CAHPS 5.1H",
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                name="describeTheDataSource"
                label="Describe the data source (text in this field is included in publicly-reported state-specific comments):"
                key="dataSourceOtherTextArea"
                formLabelProps={{
                  fontWeight: "normal",
                  fontSize: "normal",
                }}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
