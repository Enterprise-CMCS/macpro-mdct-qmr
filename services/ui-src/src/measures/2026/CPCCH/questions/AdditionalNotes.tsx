import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { Upload } from "components/Upload";
import * as DC from "dataConstants";
import { useContext } from "react";
import { parseLabelToHTML } from "utils/parser";
import SharedContext from "shared/SharedContext";

export const AdditionalNotes = () => {
  const labels: any = useContext(SharedContext);
  const { header, upload } = labels?.AdditionalNotes ?? {};

  const helpText =
    "Please add any additional notes or comments on the measure not otherwise captured above:";

  return (
    <QMR.CoreQuestionWrapper testid="additional-notes" label={header}>
      <QMR.TextArea
        label={parseLabelToHTML(helpText)}
        key={DC.ADDITIONAL_NOTES}
        name={DC.ADDITIONAL_NOTES}
      />
      {upload && (
        <CUI.Box marginTop={10}>
          <Upload
            label={upload}
            key={DC.ADDITIONAL_NOTES_UPLOAD}
            name={DC.ADDITIONAL_NOTES_UPLOAD}
          />
        </CUI.Box>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
