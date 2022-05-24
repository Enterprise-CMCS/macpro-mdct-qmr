import { useEffect, useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { DeliverySystems } from "./deliverySystems";
import * as Common from "../Common";
import { useForm, FormProvider } from "react-hook-form";
import { ACSQualifierForm } from "./types";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMeasure, useGetMeasure, useEditCoreSet } from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";
import { useQueryClient } from "react-query";
import { validationFunctions } from "./validationFunctions";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "hooks/authHooks";
import { CoreSetTableItem } from "components/Table/types";

export const ACSQualifiers = () => {
  const { state, year } = useParams();
  const mutation = useUpdateMeasure();
  const userInfo = useUser();
  const updateCoreSet = useEditCoreSet().mutate;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>();

  // get qualifier data and prepoulate default values if data exists
  const { data: apiData, refetch } = useGetMeasure({
    coreSet: CoreSetAbbr.ACS,
    measure: "CSQ",
  });

  const methods = useForm<ACSQualifierForm>({
    shouldUnregister: true,
    mode: "all",
    defaultValues: {
      CoreSetMeasuresAuditedOrValidatedDetails: [Common.initialAuditValues],
      PercentageEnrolledInEachDeliverySystem: [
        {
          label: "Fee-for-Service",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
        },
        {
          label: "PCCM",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
        },
        {
          label: "Managed Care",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
        },
        {
          label: "Integrated Care Model (ICM)",
          TwentyOneToSixtyFour: "",
          GreaterThanSixtyFour: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (!methods.formState.isDirty) {
      methods.reset(apiData?.Item?.data);
    }
  }, [apiData, methods]);

  const handleValidation = (data: ACSQualifierForm) => {
    validateAndSetErrors(data);
  };

  const handleSubmit = (data: ACSQualifierForm) => {
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

  const handleSave = (data: ACSQualifierForm) => {
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
    data: ACSQualifierForm;
    callback?: () => void;
  }) => {
    const requestData = {
      data,
      measure: "CSQ",
      status,
      coreSet: CoreSetAbbr.ACS,
    };

    mutation.mutate(requestData, {
      onSuccess: () => {
        // refetch the qualifier measure and redirect to measure list page if specified
        queryClient.refetchQueries(["measure", state, year, "CSQ"]);

        if (callback) {
          callback();
        }
        refetch();

        updateCoreSet({
          coreSet: CoreSetAbbr.ACS,
          state: state ?? "",
          year: year ?? "",
          body: {
            submitted: false,
            status: CoreSetTableItem.Status.IN_PROGRESS,
            userRole: userInfo.userRole,
            userState: userInfo.userState,
          },
        });
      },
    });
  };

  const validateAndSetErrors = (data: ACSQualifierForm): boolean => {
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
          path: `/${state}/${year}/${CoreSetAbbr.ACS}`,
          name: ``,
        },
        {
          path: `/${state}/${year}/${CoreSetAbbr.ACS}/CSQ`,
          name: `Adult Core Set Qualifiers`,
        },
      ]}
      buttons={
        <QMR.MeasureButtons
          handleSave={methods.handleSubmit(handleSave)}
          lastAltered={apiData?.Item.lastAltered}
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
                Adult Core Set Questions
              </CUI.Text>
              <QMR.SupportLinks />
            </CUI.Box>
            <CUI.OrderedList>
              <DeliverySystems />
              <Common.Audit type="AD" />
              <Common.ExternalContractor />
              <Common.CompleteCoreSets
                handleValidation={methods.handleSubmit(handleValidation)}
                type="AD"
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
