/* eslint-disable no-console */
import {
  ReactElement,
  cloneElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import * as CUI from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  FormProvider,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as QMR from "components";
import { useGetMeasure, useUpdateMeasure } from "hooks/api";
import { AnyObject, CoreSetAbbr, MeasureStatus } from "types";
import { areObjectsDifferent, areSomeRatesCompleted } from "utils/form";
import * as DC from "dataConstants";
import { useUser } from "hooks/authHooks";
import { measureDescriptions } from "measures/measureDescriptions";
import { CompleteCoreSets } from "./complete";
import SharedContext from "shared/SharedContext";
import * as Labels from "labels/Labels";
import { coreSetBreadCrumbTitle } from "shared/coreSetByYear";
import { featuresByYear } from "utils/featuresByYear";
import { Alert } from "@cmsgov/design-system";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { FormError } from "error";

const LastModifiedBy = ({ user }: { user: string | undefined }) => {
  if (!user) return null;
  return (
    <CUI.Box textAlign="right" mb="2">
      <CUI.Text fontWeight="hairline">{`Last modified by: ${user}`}</CUI.Text>
    </CUI.Box>
  );
};

export interface MeasureWrapperProps {
  name: string;
  detailedDescription?: string;
  year: string;
  measureId: string;
  setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  isOtherMeasureSpecSelected?: boolean;
  isPrimaryMeasureSpecSelected?: boolean;
  showOptionalMeasureStrat?: boolean;
  isNotReportingData?: boolean;
}

interface MeasureProps {
  measure: ReactElement;
  name: string;
  detailedDescription?: string;
  year: string;
  measureId: string;
  setValidationFunctions: Dispatch<
    SetStateAction<{
      functions: Function[];
      data?: MeasureTemplateData;
    }>
  >;
  handleSave: (data: any) => void;
}

const Measure = ({ measure, handleSave, ...rest }: MeasureProps) => {
  const { watch, setValue } = useFormContext();

  const watchedData = useWatch();

  const watchReportingRadio = useWatch({ name: "DidReport" });
  const isNotReportingData = watchReportingRadio === "no";

  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });

  const opmRates = useWatch({
    name: DC.OPM_RATES,
  });

  const isOtherMeasureSpecSelected = watchMeasureSpecification === "Other";
  const isPrimaryMeasureSpecSelected =
    watchMeasureSpecification && !isOtherMeasureSpecSelected;

  const showOptionalMeasureStrat = areSomeRatesCompleted(
    watchedData,
    rest.measureId
  );

  useEffect(() => {
    if (isOtherMeasureSpecSelected && !opmRates) {
      setValue(DC.OPM_RATES, [
        {
          rate: [{ denominator: "", numerator: "", rate: "" }],
          description: "",
        },
      ]);
    }
  }, [watch, isOtherMeasureSpecSelected, opmRates, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // on file upload, save measure
      if (
        (name === DC.ADDITIONAL_NOTES_UPLOAD ||
          name === DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD ||
          name === DC.HEALTH_HOME_QUALIFIER_FILE_UPLOAD) &&
        type === "change"
      ) {
        handleSave(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSave]);

  return cloneElement(measure, {
    ...rest,
    isNotReportingData,
    isPrimaryMeasureSpecSelected,
    showOptionalMeasureStrat,
    isOtherMeasureSpecSelected,
  });
};

interface Props {
  measure: ReactElement;
  name: string;
  year: string;
  measureId: string;
  autocompleteOnCreation?: boolean;
  defaultData?: { [type: string]: { formData: any; title: string } };
}

export const MeasureWrapper = ({
  measure,
  name,
  year,
  measureId,
  defaultData,
  autocompleteOnCreation,
}: Props) => {
  const { isStateUser } = useUser();

  const navigate = useNavigate();
  const params = useParams();
  const [errors, setErrors] = useState<FormError[] | undefined>(undefined);

  const [validationFunctions, setValidationFunctions] = useState<{
    data?: MeasureTemplateData;
    functions: Function[];
  }>({ data: undefined, functions: [] });

  const [validating, setValidating] = useState(false);

  //WIP: this code will be replaced with a dynamic import onces we refactored enough files
  const shared: AnyObject = {
    ...Labels[
      `CQ${year}` as "CQ2021" | "CQ2022" | "CQ2023" | "CQ2024" | "CQ2025"
    ],
    year: year,
  };

  // setup default values for core set, as delivery system uses this to pregen the labeled portion of the table
  const coreSet = (params.coreSetId?.split("_")?.[0] ??
    params.coreSetId ??
    "ACS") as CoreSetAbbr;
  const defaultVals = params.coreSetId
    ? defaultData?.[
        (params.coreSetId?.split("_")?.[0] ?? params.coreSetId) as CoreSetAbbr
      ]
    : undefined;

  // check what type of core set we deal with for data driven rendering
  let type: "CH" | "AD" | "HH" = "AD";
  if (
    coreSet === CoreSetAbbr.CCS ||
    coreSet === CoreSetAbbr.CCSC ||
    coreSet === CoreSetAbbr.CCSM
  ) {
    type = "CH";
  } else if (coreSet === CoreSetAbbr.HHCS) {
    type = "HH";
  }

  const [showModal, setShowModal] = useState<boolean>(false);
  const { toast } = createStandaloneToast();
  const toastFailtoSave = () => {
    return toast({
      status: "error",
      description: "Failed to save or submit measure data.",
      duration: 4000,
    });
  };
  const toastSaved = () => {
    return toast({
      status: "success",
      description: "Successfully saved measure data.",
      duration: 4000,
    });
  };
  /*
  this is where we put all the high level stuff for measures
  all of the methods defined here can be passed as props to every measure below
  */

  const { mutate: updateMeasure, isPending: mutationRunning } =
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
  const { detailedDescription, stratificationRequired } = measureData || {};

  const { coreSetId } = useParams();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    defaultValues: measureData?.data ?? undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  useEffect(() => {
    // reset core set qualifier data to use the default values for table rendering
    if (
      !methods.formState.isDirty &&
      !apiData?.Item?.data &&
      apiData?.Item?.measure === "CSQ"
    ) {
      methods.reset(
        coreSetId
          ? defaultData?.[
              (coreSetId?.split("_")?.[0] ?? coreSetId) as CoreSetAbbr
            ]?.formData
          : undefined
      );
    }
    // default loaded data reset
    else {
      methods.reset(apiData?.Item?.data);
    }
  }, [apiData, methods, defaultData, coreSetId]);

  const handleValidation = (data: any) => {
    setValidating(true);
    handleSave(data);
    validateAndSetErrors(data);
  };

  const hasDataChanged = (data: any) => {
    //there are some instances where there is not change to the data but the way we load the data triggers react hook form to think there is.
    //this function is to do a comparison between the defaultValues (prev saved data) and data (data waiting to be saved)
    if (Object.keys(methods.formState.dirtyFields).length === 0) return false;

    //instead of looping through all the data, we will loop through only the keys that react hook form indicated has a change
    const fieldKeys = Object.keys(methods.formState.dirtyFields);

    //check if any field has changed
    return fieldKeys.some((key) =>
      areObjectsDifferent(methods.formState.defaultValues?.[key], data?.[key])
    );
  };

  const handleSave = (data: any) => {
    /* only auto-save measure on timeout if this form has been touched / modified
     * false postitives seems to happen with the form isDirty check so we're going to check if there's any values in dirtyFields instead
     */

    if (!mutationRunning && !loadingData && hasDataChanged(data)) {
      updateMeasure(
        {
          data,
          status: MeasureStatus.INCOMPLETE,
          reporting: handleReportingResponse(data),
        },
        {
          onSettled: (data, error) => {
            if (data && !error) {
              refetch();
            }
            //TODO: some form of error showcasing should display here
            if (error) console.log(error);

            setValidating(false);
            toastSaved();
          },
          onError: () => {
            toastFailtoSave();
          },
        }
      );
    } else setValidating(false);
  };

  const handleClear = () => {
    submitDataToServer({
      data: {},
      status: MeasureStatus.INCOMPLETE,
      reporting: undefined,
      callback: () => {
        navigate(-1);
      },
    });
  };

  const handleSubmit = (data: any) => {
    const validatedErrors = validateAndSetErrors(data);

    if (validatedErrors) {
      setShowModal(true);
    } else {
      submitDataToServer({
        data,
        reporting: handleReportingResponse(data),
        callback: () => {
          navigate(-1);
        },
      });
    }
  };

  const handleReportingResponse = (data: any) => {
    if (data["DidReport"] === "yes" || data["DidCollect"] === "yes") {
      return "yes";
    } else if (data["DidReport"] === "no" || data["DidCollect"] === "no") {
      return "no";
    }

    return undefined;
  };

  const submitDataToServer = ({
    data,
    status = MeasureStatus.COMPLETE,
    callback,
    reporting,
  }: {
    data: any;
    status?: MeasureStatus;
    callback?: () => void;
    reporting: string | undefined;
  }) => {
    if (!mutationRunning && !loadingData) {
      updateMeasure(
        { data, status, reporting },
        {
          onSettled: (data, error) => {
            if (data && !error) {
              refetch();
              if (callback) {
                callback();
              }
            }

            //TODO: some form of error showcasing should display here
            if (error) console.log(error);
          },
          onError: () => {
            toastFailtoSave();
          },
        }
      );
    }
  };

  const validateAndSetErrors = (data: any): boolean => {
    const validationErrors = validationFunctions?.functions.reduce(
      (acc: any, current: any) => {
        //temporary code to be used during migration of validation file
        const error = current(data, validationFunctions.data, coreSetId);
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

    setErrors(validationErrors.length > 0 ? validationErrors : []);
    return validationErrors.length > 0;
  };

  const handleValidationModalResponse = (continueWithErrors: boolean) => {
    setShowModal(false);
    if (!continueWithErrors) return;

    const manualSubmit = (data: any) => {
      submitDataToServer({
        data,
        reporting: handleReportingResponse(data),
        callback: () => {
          navigate(-1);
        },
      });
      setErrors(undefined);
    };
    methods.handleSubmit(manualSubmit)();
  };

  if (!params.coreSetId || !params.state) {
    return null;
  }

  const separatedCoreSet = coreSetBreadCrumbTitle();

  const formatTitle = (customDescription?: string) => {
    const foundMeasureDescription =
      measureDescriptions?.[year]?.[measureId] || customDescription;

    return foundMeasureDescription || "";
  };

  const breadCrumbName =
    separatedCoreSet?.[params.coreSetId] ??
    `- ${formatTitle(apiData?.Item?.description)}`;

  return (
    <FormProvider {...methods}>
      <QMR.YesNoModalDialog
        isOpen={showModal}
        headerText="Validation Error"
        handleModalResponse={handleValidationModalResponse}
        bodyText="There are still errors on this measure, would you still like to complete?"
      />
      <QMR.StateLayout
        breadcrumbItems={[
          {
            path: `/${params.state}/${year}`,
            name: `${featuresByYear.displayFFYLanguage ? "FFY" : ""} ${year}`,
          },
          // This next path object is to bring the user back to the measures list with the back button
          {
            path: `/${params.state}/${year}/${params.coreSetId}`,
            name: "",
          },
          {
            path: `/${params.state}/${year}/${params.coreSetId}/${measureId}`,
            name:
              defaultVals?.title ??
              `${measureId} ${apiData?.Item ? breadCrumbName : ""}`,
          },
        ]}
        buttons={
          <QMR.MeasureButtons
            isLoading={mutationRunning}
            handleSave={methods.handleSubmit(handleSave)}
            lastAltered={measureData?.data && measureData?.lastAltered}
            isSubmitted={measureData?.status === MeasureStatus.COMPLETE}
            isAutoCompletedMeasure={autocompleteOnCreation}
          />
        }
      >
        <CUI.Skeleton isLoaded={!loadingData}>
          <>
            <QMR.AdminMask />
            <form data-testid="measure-wrapper-form">
              <fieldset data-testid="fieldset" disabled={!isStateUser}>
                <CUI.Container maxW="7xl" as="section" px="0">
                  <QMR.SessionTimeout handleSave={handleSave} />
                  <LastModifiedBy user={measureData?.lastAlteredBy} />
                  {stratificationRequired?.includes(coreSet) && (
                    <CUI.Box mb="1rem">
                      <Alert heading="Reminder: Measure Stratification Required">
                        <CUI.Text>
                          {`For ${year} Core Sets reporting, states are expected to report stratified data for this measure.`}
                        </CUI.Text>
                      </Alert>
                    </CUI.Box>
                  )}
                  {measureId !== "CSQ" && (
                    <>
                      {Object.keys(separatedCoreSet ?? []).includes(
                        params.coreSetId as CoreSetAbbr
                      ) && (
                        <CUI.Heading size="md" mb={6}>
                          {measureId}: {formatTitle()}
                        </CUI.Heading>
                      )}
                      <CUI.Text fontSize="sm">
                        For technical questions regarding use of this
                        application, please reach out to MDCT_Help@cms.hhs.gov.
                        For content-related questions about measure
                        specifications, or what information to enter in each
                        field, please reach out to MACQualityTA@cms.hhs.gov.
                      </CUI.Text>
                    </>
                  )}
                  <SharedContext.Provider value={shared}>
                    <Measure
                      measure={measure}
                      name={name}
                      detailedDescription={detailedDescription}
                      year={year}
                      measureId={measureId}
                      setValidationFunctions={setValidationFunctions}
                      handleSave={handleSave}
                    />
                  </SharedContext.Provider>
                  {/* Core set qualifiers use a slightly different submission button layout */}
                  {!!(!autocompleteOnCreation && !defaultData) && (
                    <QMR.CompleteMeasureFooter
                      handleClear={methods.handleSubmit(handleClear)}
                      handleSubmit={methods.handleSubmit(handleSubmit)}
                      handleValidation={methods.handleSubmit(handleValidation)}
                      disabled={!isStateUser || mutationRunning}
                      validating={validating}
                    />
                  )}
                  {!!(!autocompleteOnCreation && defaultData) && (
                    <CompleteCoreSets
                      handleSubmit={methods.handleSubmit(handleSubmit)}
                      handleValidation={methods.handleSubmit(handleValidation)}
                      type={type}
                    />
                  )}
                </CUI.Container>
                {errors?.length === 0 && (
                  <QMR.Notification
                    key={uuidv4()}
                    alertProps={{ my: "3" }}
                    alertStatus="success"
                    alertTitle={`Success`}
                    alertDescription={`The ${
                      defaultVals ? "Qualifier" : "measure"
                    } has been validated successfully`}
                    close={() => {
                      setErrors(undefined);
                    }}
                  />
                )}
                {errors
                  ?.sort((a, b) =>
                    a.errorLocation.localeCompare(b.errorLocation)
                  )
                  ?.map((error, index) => (
                    <QMR.Notification
                      key={uuidv4()}
                      alertProps={{ my: "3" }}
                      alertStatus={error.errorType ? "warning" : "error"}
                      alertTitle={`${error.errorLocation} ${
                        error.errorType ?? "Error"
                      }`}
                      alertDescription={error.errorMessage}
                      extendedAlertList={error.errorList}
                      close={() => {
                        const newErrors = [...errors];
                        newErrors.splice(index, 1);
                        setErrors(
                          newErrors.length !== 0 ? newErrors : undefined
                        );
                      }}
                    />
                  ))}
              </fieldset>
            </form>
          </>
        </CUI.Skeleton>
      </QMR.StateLayout>
    </FormProvider>
  );
};
