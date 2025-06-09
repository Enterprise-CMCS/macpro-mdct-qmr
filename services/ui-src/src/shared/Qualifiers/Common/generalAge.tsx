import * as QMR from "components";
import * as Common from ".";
import * as CUI from "@chakra-ui/react";

import * as Types from "types";
import { useCustomRegister } from "hooks/useCustomRegister";

export const GeneralAge = () => {
  const register = useCustomRegister();

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header="Generally, what are the ages of children covered in the state’s Medicaid program (inclusive of CHIP-funded Medicaid Expansion) (Title XIX & XXI)?"
        description=""
      />
      <QMR.TextArea
        {...register("GeneralAge")}
        label="Example: [State]’s Medicaid (Title XIX and XXI) program covers children under 19."
        formLabelProps={{ fontWeight: "400" }}
      />
    </CUI.ListItem>
  );
};
