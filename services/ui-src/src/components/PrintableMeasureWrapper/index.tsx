import {
  ReactElement,
  cloneElement,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import * as CUI from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  useForm,
  FormProvider,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { areSomeRatesCompleted } from "utils/form";
import * as DC from "dataConstants";
import { AnyObject, CoreSetAbbr } from "types";
import { measureDescriptions } from "measures/measureDescriptions";
import SharedContext from "shared/SharedContext";
import * as Labels from "labels/Labels";

const LastModifiedBy = ({ user }: { user: string | undefined }) => {
  if (!user) return null;
  return (
    <CUI.Box textAlign="right" mb="2">
      <CUI.Text fontWeight="hairline">{`Last modified by: ${user}`}</CUI.Text>
    </CUI.Box>
  );
};

export interface PrintableMeasureWrapperProps {
  name: string;
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
  year: string;
  measureId: string;
  setValidationFunctions: Dispatch<SetStateAction<Function[]>>;
  handleSave: (data: any) => void;
}

const Measure = ({ measure, handleSave, ...rest }: MeasureProps) => {
  const { watch } = useFormContext();

  const watchedData = useWatch();

  const watchReportingRadio = useWatch({ name: "DidReport" });
  const isNotReportingData = watchReportingRadio === "no";

  const watchMeasureSpecification = useWatch({
    name: "MeasurementSpecification",
  });
  const isOtherMeasureSpecSelected = watchMeasureSpecification === "Other";
  const isPrimaryMeasureSpecSelected =
    watchMeasureSpecification && !isOtherMeasureSpecSelected;

  const showOptionalMeasureStrat = areSomeRatesCompleted(
    watchedData,
    rest.measureId
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        (name === DC.ADDITIONAL_NOTES_UPLOAD ||
          name === DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD) &&
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
  spaName?: string;
  autocompleteOnCreation?: boolean;
  measureData: any;
  defaultData?: { [type: string]: { formData: any; title: string } };
}

export const PrintableMeasureWrapper = ({
  measure,
  name,
  year,
  spaName,
  measureId,
  measureData,
  defaultData,
}: Props) => {
  const params = useParams();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    defaultValues: measureData?.data ?? undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  //WIP: this code will be replaced with a dynamic import onces we refactored enough files
  const shared: AnyObject = {
    ...Labels[`CQ${year}` as "CQ2021" | "CQ2022" | "CQ2023" | "CQ2024"],
    year: year,
  };

  useEffect(() => {
    // reset core set qualifier data to use the default values for table rendering
    if (
      !methods.formState.isDirty &&
      !measureData?.data &&
      measureId === "CSQ"
    ) {
      methods.reset(
        params.coreSetId
          ? defaultData?.[
              (params.coreSetId?.split("_")?.[0] ??
                params.coreSetId) as CoreSetAbbr
            ]?.formData
          : undefined
      );
    }
    // default loaded data reset
    else if (!methods.formState.isDirty) methods.reset(measureData?.data);
  }, [measureData, methods, defaultData, params, measureId]);

  if (!params.coreSetId || !params.state) {
    return null;
  }

  const foundMeasureDescription =
    measureDescriptions[measureData?.year]?.[measureData?.measure] ||
    measureData?.description;

  return (
    <CUI.VStack padding={10}>
      <CUI.Box textAlign={"center"} mb="2">
        <CUI.Text id={measureData?.measure} fontSize={"2xl"} fontWeight="bold">
          ({measureData?.measure})
        </CUI.Text>
      </CUI.Box>
      <CUI.Box textAlign={"center"} mb="2">
        <CUI.Text id={measureData?.measure} fontSize={"2xl"} fontWeight="bold">
          {foundMeasureDescription}
        </CUI.Text>
      </CUI.Box>
      {!!(spaName && measureData?.measure === "CSQ") && (
        <CUI.Box textAlign={"center"} mb="2">
          <CUI.Text id={spaName} fontSize={"xl"}>
            {spaName}
          </CUI.Text>
        </CUI.Box>
      )}
      <LastModifiedBy user={measureData?.lastAlteredBy} />
      {!!measureData?.detailedDescription && (
        <CUI.Box textAlign={"center"} mb="2">
          <CUI.Text
            fontSize="xl"
            my="6"
            fontWeight={400}
            data-cy="detailed-description"
          >
            {measureData.detailedDescription}
          </CUI.Text>
        </CUI.Box>
      )}
      <FormProvider {...methods}>
        <SharedContext.Provider value={shared}>
          <>
            <form data-testid="measure-wrapper-form" style={{ width: "100%" }}>
              <fieldset data-testid="fieldset" disabled>
                <CUI.Container maxW="7xl" as="section" px="0">
                  <Measure
                    measure={measure}
                    name={foundMeasureDescription || name}
                    year={year}
                    measureId={measureId}
                    setValidationFunctions={() => {}}
                    handleSave={() => {}}
                  />
                </CUI.Container>
              </fieldset>
            </form>
          </>
        </SharedContext.Provider>
      </FormProvider>
    </CUI.VStack>
  );
};
