import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Upload } from "components/Upload";
import * as Types from "shared/types/Type";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { parseLabelToHTML } from "utils/parser";
import SharedContext from "shared/SharedContext";

export const AdditionalNotes = () => {
  const register = useCustomRegister<Types.AdditionalNotes>();
  const { getValues, resetField } = useFormContext();
  const didReport = getValues()["DidReport"];

  useEffect(() => {
    resetField("AdditionalNotes-AdditionalNotes");
  }, [didReport, resetField]);

  //WIP: using form context to get the labels for this component temporarily
  const labels: any = useContext(SharedContext);

  return (
    <QMR.CoreQuestionWrapper
      testid="additional-notes"
      label={labels?.AdditonalNotes?.header}
    >
      <QMR.TextArea
        label={parseLabelToHTML(labels?.AdditonalNotes?.section)}
        {...register(DC.ADDITIONAL_NOTES)}
      />
      <CUI.Box marginTop={10}>
        <Upload
          label={labels?.AdditonalNotes?.upload}
          {...register(DC.ADDITIONAL_NOTES_UPLOAD)}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
