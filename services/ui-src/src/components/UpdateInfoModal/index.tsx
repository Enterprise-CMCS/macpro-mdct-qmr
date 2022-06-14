import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MeasureData } from "types";

interface Props {
  headerText: string;
  modalProps: { isOpen: boolean; measure: MeasureData<any> };
  handleModalResponse: (response: boolean) => void;
}

interface MeasureDetail {
  description?: string;
  detailedDescription?: string;
}

interface UpdateSSM {
  "update-ssm": MeasureDetail;
}

export const UpdateInfoModal = ({
  headerText,
  handleModalResponse,
  modalProps: {
    isOpen,
    measure: { description, detailedDescription },
  },
}: Props) => {
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

  return (
    <>
      <CUI.Modal
        isOpen={isOpen}
        size={"3xl"}
        onClose={() => handleModalResponse(false)}
      >
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader id="update-measure-info-header">
            {headerText}
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
              onClick={() => handleModalResponse(true)}
            >
              Yes
            </CUI.Button>
            <CUI.Button
              variant="ghost"
              onClick={() => handleModalResponse(false)}
            >
              No
            </CUI.Button>
          </CUI.ModalFooter>
        </CUI.ModalContent>
      </CUI.Modal>
    </>
  );
};
