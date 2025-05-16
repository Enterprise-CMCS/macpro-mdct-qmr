import * as QMR from "components";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "shared/types";
import * as DC from "dataConstants";

export const AdditionalNotes = () => {
  const register = useCustomRegister<Types.AdditionalNotes>();

  return (
    <QMR.CoreQuestionWrapper
      testid="additional-notes"
      label="Additional notes/comments (optional)"
    >
      <QMR.TextArea
        label="If your state would like to provide additional context about the reported stratified data, including stratification categories, please add notes below."
        {...register(DC.ADDITIONAL_NOTES)}
      />
    </QMR.CoreQuestionWrapper>
  );
};
