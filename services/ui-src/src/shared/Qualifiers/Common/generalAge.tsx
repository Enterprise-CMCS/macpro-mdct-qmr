import * as QMR from "components";
import * as Common from ".";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DataDriven } from "shared/types/TypeQualifierForm";

interface Props {
  data: DataDriven;
}

export const GeneralAge = ({ data }: Props) => {
  const register = useCustomRegister();

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header={data.ageQuestion!.label}
        description={""}
      />
      <QMR.TextArea
        {...register("GeneralAge")}
        formLabelProps={{ fontWeight: "400" }}
      />
    </CUI.ListItem>
  );
};
