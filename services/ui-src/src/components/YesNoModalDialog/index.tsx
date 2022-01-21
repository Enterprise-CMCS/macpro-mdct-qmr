import * as CUI from "@chakra-ui/react";

interface Props {
  headerText: string;
  bodyText: string;
  handleModalResponse: (response: boolean) => void;
  isOpen: boolean;
}

export const YesNoModalDialog = ({
  headerText,
  bodyText,
  handleModalResponse,
  isOpen,
}: Props) => {
  return (
    <>
      <CUI.Modal isOpen={isOpen} onClose={() => handleModalResponse(false)}>
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader>{headerText}</CUI.ModalHeader>
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
