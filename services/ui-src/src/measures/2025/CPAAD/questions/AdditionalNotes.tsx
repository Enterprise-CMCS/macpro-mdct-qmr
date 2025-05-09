import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Upload } from "components/Upload";
import * as Types from "shared/types";
import * as DC from "dataConstants";
import { useContext } from "react";
import { parseLabelToHTML } from "utils/parser";
import SharedContext from "shared/SharedContext";

export const AdditionalNotes = () => {
  const register = useCustomRegister<Types.AdditionalNotes>();

  const labels: any = useContext(SharedContext);
  const { header, upload } = labels?.AdditionalNotes ?? {};

  const helpText =
    "Please add any additional notes or comments on the measure not otherwise captured above:";

  return (
    <QMR.CoreQuestionWrapper testid="additional-notes" label={header}>
      <QMR.TextArea
        label={parseLabelToHTML(helpText)}
        {...register(DC.ADDITIONAL_NOTES)}
      />
      {upload && (
        <CUI.Box marginTop={10}>
          <Upload label={upload} {...register(DC.ADDITIONAL_NOTES_UPLOAD)} />
        </CUI.Box>
      )}
    </QMR.CoreQuestionWrapper>
  );
};
