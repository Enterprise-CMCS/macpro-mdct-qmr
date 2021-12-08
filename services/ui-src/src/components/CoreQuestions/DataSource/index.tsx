import { CoreQuestionWrapper } from "..";
import * as QMR from "components/Inputs";
import { useCustomRegister } from "hooks/useCustomRegister";
interface Props {
  options: QMR.CheckboxOption[];
}

export const DataSource = ({ options }: Props) => {
  return (
    <CoreQuestionWrapper label="Data Source">
      <QMR.Checkbox
        {...useCustomRegister("dataSource.answer")}
        options={options}
        label="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
      />
    </CoreQuestionWrapper>
  );
};
