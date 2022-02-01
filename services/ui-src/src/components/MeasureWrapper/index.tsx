import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { ReactElement, cloneElement, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Measure } from "measures/types";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useGetMeasure, useUpdateMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";

import { v4 as uuidv4 } from "uuid";
interface Props {
  measure: ReactElement;
  name: string;
  year: string;
  measureId: string;
}

export const MeasureWrapper = ({ measure, name, year, measureId }: Props) => {
  const params = useParams();
  const [errors, setErrors] = useState<any[]>();
  const [validationFunctions, setValidationFunctions] = useState<Function[]>(
    []
  );

  const { isStateUser } = useUser();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lastSavedText, setLastSavedText] = useState(
    "Awaiting Save Status Retrieval"
  );

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

  const { mutate: updateMeasure, isLoading: mutationRunning } =
    useUpdateMeasure();
  const {
    data: apiData,
    isLoading: loadingData,
    refetch,
  } = useGetMeasure({
    coreSet: params.coreSetId as CoreSetAbbr,
    measure: measureId,
  });
  const measureData = apiData?.Item;

  const methods = useForm<Measure.Form>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: measureData?.data ?? undefined,
  });

  useEffect(() => {
    methods.reset(apiData?.Item?.data);
  }, [apiData, methods]);

  const handleValidation = (data: any) => {
    handleSave(data);
    validateAndSetErrors(data);
  };

  const handleSave = (data: any) => {
    if (!mutationRunning && !loadingData) {
      setLastSavedText("Awaiting Changed Save Status");
      updateMeasure(
        { data, status: measureData?.status },
        {
          onSettled: (data, error) => {
            if (data && !error) {
              refetch();
            }
            //TODO: some form of error showcasing should display here
            if (error) setLastSavedText("Failed To Save Form Information");
          },
        }
      );
    }
  };

  const handleSubmit = (data: any) => {
    const validatedErrors = validateAndSetErrors(data);

    if (validatedErrors) {
      setShowModal(true);
    } else {
      submitDataToServer(data);
      console.log("submitted");
    }
    console.log({ errors });
    console.log({ data });
  };

  const submitDataToServer = (data: any) => {
    if (!mutationRunning && !loadingData) {
      setLastSavedText("Awaiting Changed Save Status");
      updateMeasure(
        { data, status: MeasureStatus.COMPLETE },
        {
          onSettled: (data, error) => {
            if (data && !error) refetch();

            //TODO: some form of error showcasing should display here
            if (error) setLastSavedText("Failed To Submit Form Information");
          },
        }
      );
    }
  };

  const validateAndSetErrors = (data: any): boolean => {
    const validationErrors = validationFunctions.reduce(
      (acc: any, current: any) => {
        const error = current(data);
        let errorArray = [];

        if (Array.isArray(error)) {
          errorArray = [...error];
        } else {
          errorArray = [error];
        }

        return error ? [...acc, ...errorArray] : acc;
      },
      []
    );

    setErrors(validationErrors.length > 0 ? validationErrors : undefined);
    return validationErrors.length > 0;
  };

  const handleValidationModalResponse = (continueWithErrors: boolean) => {
    setShowModal(false);

    if (continueWithErrors) {
      submitDataToServer(methods.getValues());
      setErrors(undefined);
      console.log("Submitted");
    }
  };

  // interval for updating the last saved text
  useEffect(() => {
    const checkSavedTime = () => {
      const lastTime = measureData?.lastAltered / 1000;
      const currentTime = new Date().getTime() / 1000;
      if (lastTime && currentTime) {
        const timeElapsed = currentTime - lastTime;
        if (timeElapsed < 1 * 60) {
          setLastSavedText("Saved Moments Ago");
        } else if (timeElapsed < 60 * 60) {
          setLastSavedText(
            `Last Saved ${(timeElapsed / 60).toFixed()} Minute(s) Ago`
          );
        } else {
          setLastSavedText(
            `Last Saved ${(timeElapsed / (60 * 60)).toFixed()} Hour(s) Ago`
          );
        }
      }
    };
    checkSavedTime();
    const interval = setInterval(checkSavedTime, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [measureData, setLastSavedText]);

  if (!params.coreSetId || !params.state) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <QMR.YesNoModalDialog
        isOpen={showModal}
        headerText="Validation Error"
        handleModalResponse={handleValidationModalResponse}
        bodyText="There are still errors on this measure, would you still like to complete?"
      ></QMR.YesNoModalDialog>
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
          //TODO: this needs some form of loading state for these buttons using mutationRunning
          <QMR.MeasureButtons
            handleSave={methods.handleSubmit(handleSave)}
            lastSavedText={lastSavedText}
          />
        }
      >
        <CUI.Skeleton isLoaded={!loadingData}>
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
                  measureId,
                  handleSubmit: methods.handleSubmit(handleSubmit),
                  handleValidation: methods.handleSubmit(handleValidation),
                  setValidationFunctions,
                  //TODO: the current submission loading state should be passed down here for the additional submit button found at the bottom of forms
                  // whenever the buttons have a loading prop
                })}
              </CUI.Container>
              {errors?.map((error, index) => (
                <QMR.Notification
                  key={uuidv4()}
                  alertProps={{ my: "3" }}
                  alertStatus="error"
                  alertTitle={`${error.errorLocation} Error`}
                  alertDescription={error.errorMessage}
                  close={() => {
                    const newErrors = [...errors];
                    newErrors.splice(index, 1);
                    setErrors(newErrors);
                  }}
                />
              ))}
            </form>
          </>
        </CUI.Skeleton>
      </QMR.StateLayout>
    </FormProvider>
  );
};
