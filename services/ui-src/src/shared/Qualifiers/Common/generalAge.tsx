import * as QMR from "components";
import * as Common from ".";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DataDriven } from "shared/types/TypeQualifierForm";
import { territoryList } from "libs";
import { usePathParams } from "hooks/api/usePathParams";

interface Props {
  data: DataDriven;
}

export const GeneralAge = ({ data }: Props) => {
  const register = useCustomRegister();
  const { state } = usePathParams();

  const territory =
    territoryList.find((territory) => territory.value === state)?.label ??
    "[State]";
  const description = `Example: ${territory}'s Medicaid (Title XIX and XXI) program covers children under 19.`;

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header={data.ageQuestion!.label}
        description={description}
      />
      <QMR.TextArea
        {...register("GeneralAge")}
        formLabelProps={{ fontWeight: "400" }}
      />
    </CUI.ListItem>
  );
};
