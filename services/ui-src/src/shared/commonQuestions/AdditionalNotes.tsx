import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Upload } from "components/Upload";
import * as Types from "shared/types/Type";
import * as DC from "dataConstants";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnyObject } from "types";
import { parseLabelToHTML } from "utils/parser";
import { useGetMeasure } from "hooks/api";

export const AdditionalNotes = () => {
  const register = useCustomRegister<Types.AdditionalNotes>();
  const { getValues, resetField } = useFormContext();
  const didReport = getValues()["DidReport"];
  const [labels, setLabel] = useState<AnyObject>();

  useEffect(() => {
    resetField("AdditionalNotes-AdditionalNotes");
  }, [didReport, resetField]);

  //FUTURE DELETE: scaffolding code, will be removed as we progress with the refactoring. This chunk is just for getting the year
  const { data: apiData } = useGetMeasure({
    coreSet: "ACS",
    measure: "AAB-AD",
  });
  const year = apiData.Item.year;
  import(`labels/${year}/commonQuestionsLabel`).then((result) => {
    setLabel(result.commonQuestionsLabel);
  });
  //////////////////////////

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
