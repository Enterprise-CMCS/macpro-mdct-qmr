import * as QMR from "components";
import * as Common from ".";
import * as CUI from "@chakra-ui/react";
import { DataDriven } from "shared/types/TypeQualifierForm";

interface Props {
  data: DataDriven;
}

export const GeneralAge = ({ data }: Props) => {
  const key = "GeneralAge";

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header={data.ageQuestion!.label}
        description={""}
      />
      <QMR.TextArea
        name={key}
        key={key}
        formLabelProps={{ fontWeight: "400" }}
      />
    </CUI.ListItem>
  );
};
