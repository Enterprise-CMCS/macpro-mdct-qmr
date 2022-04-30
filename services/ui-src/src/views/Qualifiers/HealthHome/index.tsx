import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Common from "../Common";
import { AdministrativeQuestions } from "./administrativeQuestions";
import { CostSavingsData } from "./costSavingsData";
import { DeliverySystems } from "./deliverySystems";
import { useForm, FormProvider } from "react-hook-form";
import { HHCSQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";
import { validationFunctions } from "./validationFunctions";
import { v4 as uuidv4 } from "uuid";

export const HHCSQualifiers = () => {
  const { state, year, HHCS } = useParams();
  const mutation = useUpdateMeasure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>();
  const spaId = HHCS?.split("_")[1];
  // get qualifier data and prepoulate default values if data exists
  const { data } = useGetMeasure({
    coreSet: CoreSetAbbr.HHCS + `_${spaId}`,
    measure: "CSQ",
  });

  const methods = useForm<HHCSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      CoreSetMeasuresAuditedOrValidatedDetails: [Common.initialAuditValues],
      PercentageEnrolledInEachDeliverySystem: [
        {
          label: "Fee-for-Service",
          ZeroToSeventeen: "",
          EighteenToSixtyFour: "",
          GreaterThanSixtyFive: "",
        },
        {
          label: "PCCM",
          ZeroToSeventeen: "",
          EighteenToSixtyFour: "",
          GreaterThanSixtyFive: "",
        },
        {
          label: "Managed Care",
          ZeroToSeventeen: "",
          EighteenToSixtyFour: "",
          GreaterThanSixtyFive: "",
        },
        {
          label: "Integrated Care Model (ICM)",
          ZeroToSeventeen: "",
          EighteenToSixtyFour: "",
          GreaterThanSixtyFive: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (!methods.formState.isDirty) {
      methods.reset(data?.Item?.data);
    }
  }, [data, methods]);

  const handleValidation = (data: HHCSQualifierForm) => {
    validateAndSetErrors(data);
  };

  const handleSubmit = (data: HHCSQualifierForm) => {
    const validatedErrors = validateAndSetErrors(data);
    if (validatedErrors) {
      setShowModal(true);
    } else {
      saveDataToServer({
        status: MeasureStatus.COMPLETE,
        data,
        callback: () => {
          navigate(-1);
        },
      });
    }
  };

  const handleSave = (data: HHCSQualifierForm) => {
    saveDataToServer({
      status: MeasureStatus.INCOMPLETE,
      data,
      callback: () => {},
    });
  };

  const saveDataToServer = ({
    status,
    data,
    callback,
  }: {
    status: MeasureStatus;
    data: HHCSQualifierForm;
    callback?: () => void;
  }) => {
    const requestData = {
      data,
      measure: "CSQ",
      status,
      coreSet: "HHCS_18-0007",
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page if specified
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);

        if (callback) {
          callback();
        }
      },
    });
  };

  const validateAndSetErrors = (data: HHCSQualifierForm): boolean => {
    const validationErrors = Common.validateData(validationFunctions, data);
    setErrors(validationErrors.length > 0 ? validationErrors : undefined);
    return validationErrors.length > 0;
  };

  const handleValidationModalResponse = (continueWithErrors: boolean) => {
    setShowModal(false);

    if (continueWithErrors) {
      const data = methods.getValues();
      saveDataToServer({
        status: MeasureStatus.COMPLETE,
        data,
        callback: () => {
          navigate(-1);
        },
      });
      setErrors(undefined);
    }
  };

  return (
    <QMR.StateLayout
      breadcrumbItems={[
        { path: `/${state}/${year}`, name: `FFY ${year}` },
        {
          path: `/${state}/${year}/${CoreSetAbbr.HHCS}_${spaId}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.HHCS}_${spaId}/CSQ`,
          name: `Health Home Core Set Qualifiers`,
        },
      ]}
      buttons={
        <QMR.MeasureButtons
          handleSave={methods.handleSubmit(handleSave)}
          lastAltered={data?.Item?.lastAltered}
        />
      }
    >
      <FormProvider {...methods}>
        <QMR.SessionTimeout handleSave={handleSave} />
        <QMR.YesNoModalDialog
          isOpen={showModal}
          headerText="Validation Error"
          handleModalResponse={handleValidationModalResponse}
          bodyText="There are still errors on this measure, would you still like to complete?"
        />
        <QMR.AdminMask />
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <CUI.Box maxW="5xl" as="section">
            <CUI.Box mb="7" mt="3">
              <CUI.Text as="h1" fontSize="xl" mb="3" fontWeight="bold">
                Health Home Core Set Questions: SPA ID: {state}-{spaId}
              </CUI.Text>
              <QMR.SupportLinks />
              <QMR.HealthHomeInfo />
            </CUI.Box>
            <CUI.OrderedList>
              <AdministrativeQuestions />
              <CostSavingsData />
              <DeliverySystems />
              <Common.Audit type="HH" />
              <Common.CompleteCoreSets
                handleValidation={methods.handleSubmit(handleValidation)}
                type="HH"
              />
            </CUI.OrderedList>
          </CUI.Box>
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
      </FormProvider>
    </QMR.StateLayout>
  );
};
