import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { ReactElement, cloneElement } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "measures/schema";
import { Measure } from "measures/types";
import { useParams } from "react-router";

interface Props {
  measure: ReactElement;
  name: string;
  year: string;
  measureId: string;
}

export const MeasureWrapper = ({ measure, name, year, measureId }: Props) => {
  const params = useParams();
  /*
  this is where we put all the high level stuff for measures
  this would include:
  - validating the route params (state, coreset)
  - querying the measure data
  - defining the update method
  - handing top level errors
  - loading states (maybe?)

  all of the methods defined here can be passed as props to every measure below
  */

  const methods = useForm<Measure.Form>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
  });

  const handleSave = (data: any) => {
    console.log("saved");
    console.log({ data });
  };

  const handleSubmit = (data: any) => {
    console.log("submitted");
    console.log({ data });
  };

  if (!params.coreset || !params.state) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <QMR.StateLayout
        breadcrumbItems={[
          { path: `/${params.state}/${year}`, name: `FFY ${year}` },
          {
            path: `/${params.state}/${year}/${params.coreset}/${measureId}`,
            name,
          },
        ]}
        buttons={
          <QMR.MeasureButtons
            handleSave={methods.handleSubmit(handleSave)}
            handleSubmit={methods.handleSubmit(handleSubmit)}
            lastSavedText="Saved Moments Ago"
          />
        }
      >
        <form>
          <CUI.Box maxW="7xl" as="section">
            {cloneElement(measure, { name, year })}
          </CUI.Box>
        </form>
      </QMR.StateLayout>
    </FormProvider>
  );
};
