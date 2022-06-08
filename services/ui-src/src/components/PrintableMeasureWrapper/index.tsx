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
import * as QMR from "components";
import { areSomeRatesCompleted } from "utils/form";
import * as DC from "dataConstants";

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
  autocompleteOnCreation?: boolean;
  measureData: any;
}

export const PrintableMeasureWrapper = ({
  measure,
  name,
  year,
  measureId,
  measureData,
}: Props) => {
  const params = useParams();

  const methods = useForm({
    shouldUnregister: true,
    mode: "all",
    defaultValues: measureData?.data ?? undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  if (!params.coreSetId || !params.state) {
    return null;
  }

  return (
    <CUI.VStack padding={10}>
      <CUI.HStack>
        <CUI.Text id={measureData?.measure} fontSize={"2xl"} fontWeight="bold">
          ({measureData?.measure}) {measureData?.description}
        </CUI.Text>
      </CUI.HStack>
      <LastModifiedBy user={measureData?.lastAlteredBy} />
      <FormProvider {...methods}>
        <>
          <QMR.AdminMask />
          <form data-testid="measure-wrapper-form">
            <fieldset data-testid="fieldset" disabled>
              <CUI.Container maxW="7xl" as="section" px="0">
                <Measure
                  measure={measure}
                  name={name}
                  year={year}
                  measureId={measureId}
                  setValidationFunctions={() => {}}
                  handleSave={() => {}}
                />
              </CUI.Container>
            </fieldset>
          </form>
          <a href="#top-of-page">Back to top</a>
        </>
      </FormProvider>
    </CUI.VStack>
  );
};
