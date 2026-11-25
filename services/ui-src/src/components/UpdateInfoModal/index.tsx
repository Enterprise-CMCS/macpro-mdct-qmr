import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Measure } from "@qmr/shared";

interface Props {
  modalProps:
    | { isOpen: true; measure: Measure }
    | { isOpen: false; measure: {} };
  handleModalResponse: (measure: Measure) => void;
  closeModal: () => void;
}

interface MeasureDetail {
  description?: string;
  detailedDescription?: string;
}

interface UpdateSSM {
  "update-ssm": MeasureDetail;
}

export const UpdateInfoModal = ({
  handleModalResponse,
  closeModal,
  modalProps: { isOpen, measure },
}: Props) => {
  const { description, detailedDescription } = isOpen ? measure : {};
  const methods = useForm<UpdateSSM>({
    shouldUnregister: true,
    mode: "all",
  });

  useEffect(() => {
    methods.reset({
      "update-ssm": {
        description,
        detailedDescription,
      },
    });
  }, [description, detailedDescription, methods]);

  const watchedData = methods.watch("update-ssm");
  const watchedDescription = watchedData?.description;
  const watchedDetailedDescription = watchedData?.detailedDescription;

  const updateMeasureInfo = () => {
    if (!("coreSet" in measure)) {
      // This can only happen if the `modalProps.isOpen` is set to `false`,
      // because when we open the modal we also set `modalProps.measure`.
      // But we're inside the modal right now, so that should be impossible.
      console.error("Cannot update measure info: Missing measure data");
      return;
    }

    handleModalResponse({
      ...measure,
      description: watchedDescription!,
      detailedDescription: watchedDetailedDescription!,
      data: measure.data ?? {},
    });
  };

  return (
    <>
      <CUI.Modal isOpen={isOpen} size={"3xl"} onClose={closeModal}>
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader id="update-measure-info-header">
            Update Measure Details
          </CUI.ModalHeader>
          <CUI.ModalCloseButton />
          <CUI.ModalBody id="update-measure-info-body">
            <FormProvider {...methods}>
              <CUI.VStack w="100%" alignItems="start">
                <QMR.TextInput
                  label="Name the measure"
                  name="update-ssm.description"
                  rules={{ required: true }}
                ></QMR.TextInput>
                <QMR.TextArea
                  label="Please provide a description of the measure"
                  name="update-ssm.detailedDescription"
                  rules={{ required: true }}
                ></QMR.TextArea>
              </CUI.VStack>
            </FormProvider>
          </CUI.ModalBody>
          <CUI.ModalFooter>
            <CUI.Button
              colorScheme="blue"
              mr={3}
              isDisabled={
                // Fields must not be empty && data must differ from original
                !(watchedDescription && watchedDetailedDescription) ||
                (watchedDescription === description &&
                  watchedDetailedDescription === detailedDescription)
              }
              onClick={updateMeasureInfo}
              data-cy="update-measure-yes"
            >
              Yes
            </CUI.Button>
            <CUI.Button
              variant="ghost"
              onClick={closeModal}
              data-cy="update-measure-no"
            >
              No
            </CUI.Button>
          </CUI.ModalFooter>
        </CUI.ModalContent>
      </CUI.Modal>
    </>
  );
};
