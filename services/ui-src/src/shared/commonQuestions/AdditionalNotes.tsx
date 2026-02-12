import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { Upload } from "components/Upload";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { parseLabelToHTML } from "utils/parser";
import SharedContext from "shared/SharedContext";

export const AdditionalNotes = () => {
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
        key={DC.ADDITIONAL_NOTES}
        name={DC.ADDITIONAL_NOTES}
        label={parseLabelToHTML(textAreaLabel)}
      />
      {upload && (
        <CUI.Box marginTop={10}>
          <Upload
            key={DC.ADDITIONAL_NOTES_UPLOAD}
            name={DC.ADDITIONAL_NOTES_UPLOAD}
            label={upload}
          />
        </CUI.Box>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
