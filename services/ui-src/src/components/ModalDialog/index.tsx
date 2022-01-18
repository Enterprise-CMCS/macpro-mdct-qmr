import * as CUI from "@chakra-ui/react";

interface Props {
  bodyText: string;
  handleModalResponse: (response: boolean) => void;
}

export const YesNoModalDialog = ({ bodyText, handleModalResponse }: Props) => {
  return (
    <>
      <CUI.Modal isOpen={true} onClose={() => handleModalResponse(false)}>
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader>Validation Errors</CUI.ModalHeader>
          <CUI.ModalCloseButton />
          <CUI.ModalBody>{bodyText}</CUI.ModalBody>
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
