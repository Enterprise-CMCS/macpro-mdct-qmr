import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { DemoForm } from "views/DemoMeasure/DemoFormType";
import { Upload } from "components/Upload";

export const AdditionalNotes = () => {
  const register = useCustomRegister<DemoForm.DemoFormType>();

  return (
    <QMR.CoreQuestionWrapper label="Additional Notes/Comments on the measure (optional)">
      <QMR.TextArea
        label="Please add any additional notes or comments on the measure not otherwise captured above:"
        {...register("AdditionalNotes-AdditionalNotes")}
      />
      <CUI.Box marginTop={10}>
        <Upload
          label="If you need additional space to include comments or supplemental information, please attach further documentation below."
          {...register("AdditionalNotes-Upload")}
        />
      </CUI.Box>
    </QMR.CoreQuestionWrapper>
  );
};
