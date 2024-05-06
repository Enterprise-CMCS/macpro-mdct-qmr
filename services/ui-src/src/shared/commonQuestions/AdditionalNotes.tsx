import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Upload } from "components/Upload";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { parseLabelToHTML } from "utils/parser";
import SharedContext from "shared/SharedContext";

export const AdditionalNotes = () => {
  const register = useCustomRegister<Types.AdditionalNotes>();
  const { getValues, resetField } = useFormContext();
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);
  const { header, section, upload } = labels?.AdditionalNotes ?? {};
  const [textAreaLabel, setTextAreaLabel] = useState<string>(
    section.isReportingText
  );
  const didReport = getValues()["DidReport"];

  useEffect(() => {
    resetField("AdditionalNotes-AdditionalNotes");
    if (didReport === "no") {
      setTextAreaLabel(section.isNotReportingText);
    } else {
      setTextAreaLabel(section.isReportingText);
    }
  }, [didReport, resetField]);

  return (
    <QMR.CoreQuestionWrapper testid="additional-notes" label={header}>
      <QMR.TextArea
        label={parseLabelToHTML(textAreaLabel)}
        {...register(DC.ADDITIONAL_NOTES)}
      />
      <CUI.Box marginTop={10}>
        <Upload label={upload} {...register(DC.ADDITIONAL_NOTES_UPLOAD)} />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
