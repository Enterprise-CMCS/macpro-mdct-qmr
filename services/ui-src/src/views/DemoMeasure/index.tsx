import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Q from "./questions";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "./schema";

export const DemoMeasure = () => {
  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/OH/2021`, name: `FFY 2021` },
        { path: `/OH/2021/ACS`, name: `Adult` },
        { path: `/OH/2021/ACS/AIF-HH`, name: `DQT-AD: Demo Questions` },
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <CUI.Container maxW="2xl" as="section">
            <Q.Reporting />
            <Q.Status />
            <Q.DataSource />
            <Q.AdditionalNotes />
            <QMR.ContainedButton
              buttonProps={{ type: "submit", isFullWidth: true }}
              buttonText="Submit"
            />
          </CUI.Container>
        </form>
      </FormProvider>
    </QMR.StateLayout>
  );
};
