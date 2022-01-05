import * as QMR from "components";
import * as Q from "./";

export const CompleteCoreSets = () => {
  return (
    <>
      <Q.QualifierHeader
        header="4. Complete all Child Core Set and Child Core Set Measures to submit to CMS"
        description="Complete all Child Core Set and Child Core Set Measures to submit to CMS for review"
      />

      <QMR.ContainedButton
        buttonText="Complete Core Set Questions"
        buttonProps={{
          bg: "blue.600",
          colorScheme: "blue",
          textTransform: "capitalize",
          m: "5",
          type: "submit",
        }}
      />
    </>
  );
};
