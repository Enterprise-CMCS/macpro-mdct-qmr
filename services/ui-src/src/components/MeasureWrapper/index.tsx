import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { ReactElement, cloneElement, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validationSchema } from "measures/schema";
import { Measure } from "measures/types";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useGetMeasure, useUpdateMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";

interface Props {
  measure: ReactElement;
  name: string;
  year: string;
  measureId: string;
}

export const MeasureWrapper = ({ measure, name, year, measureId }: Props) => {
  const params = useParams();
  const { isStateUser } = useUser();
  const [lastSavedText, setLastSavedText] = useState("");

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

  const { mutate: updateMeasure } = useUpdateMeasure();
  const { data: apiData } = useGetMeasure({
    coreSet: params.coreSetId as CoreSetAbbr,
    measure: measureId,
  });
  const measureData = apiData?.Item;

  const methods = useForm<Measure.Form>({
    shouldUnregister: true,
    mode: "all",
    resolver: joiResolver(validationSchema),
    defaultValues: measureData?.data ?? undefined,
  });

  const handleSave = (data: any) => {
    updateMeasure({ data, status: measureData?.status });
  };

  const handleSubmit = (data: any) => {
    updateMeasure({ data, status: MeasureStatus.COMPLETE });
  };

  if (!params.coreSetId || !params.state) {
    return null;
  }

  useEffect(() => {
    // interval for updating the last saved
    const interval = setInterval(() => {
      const lastTime = apiData?.Item.lastAltered / 1000;
      const currentTime = new Date().getTime() / 1000;
      if (lastTime && currentTime) {
        if (true) {
          setLastSavedText("Saved Moments Ago");
        }
      }
    }, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [apiData, setLastSavedText]);

  return (
    <FormProvider {...methods}>
      <QMR.StateLayout
        breadcrumbItems={[
          { path: `/${params.state}/${year}`, name: `FFY ${year}` },
          // This next path object is to bring the user back to the measures list with the back button
          {
            path: `/${params.state}/${year}/${params.coreSetId}`,
            name: "",
          },
          {
            path: `/${params.state}/${year}/${params.coreSetId}/${measureId}`,
            name: `${measureId} - ${name}`,
          },
        ]}
        buttons={
          <QMR.MeasureButtons
            handleSave={methods.handleSubmit(handleSave)}
            handleSubmit={methods.handleSubmit(handleSubmit)}
            lastSavedText={lastSavedText}
          />
        }
      >
        <>
          {!isStateUser && (
            <CUI.Box
              top={0}
              left={0}
              position="fixed"
              width="100vw"
              height="100vh"
              zIndex={2}
              backgroundColor="gray.100"
              opacity={0.2}
            />
          )}
          <form data-testid="measure-wrapper-form">
            <CUI.Container maxW="5xl" as="section">
              <CUI.Text fontSize="sm">
                For technical questions regarding use of this application,
                please reach out to MDCT_Help@cms.hhs.gov. For content-related
                questions about measure specifications, or what information to
                enter in each field, please reach out to
                MACQualityTA@cms.hhs.gov.
              </CUI.Text>
              {cloneElement(measure, {
                name,
                year,
                handleSubmit: methods.handleSubmit(handleSubmit),
              })}
            </CUI.Container>
          </form>
        </>
      </QMR.StateLayout>
    </FormProvider>
  );
};
