import { useState, useRef } from "react";
import IdleTimer from "react-idle-timer";
import * as CUI from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useUser } from "hooks/authHooks";

interface Props {
  handleSave: (data: any) => void;
}

export const SessionTimeout = ({ handleSave }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { getValues } = useFormContext();
  const { logout } = useUser();

  let idleTimer: any = useRef(null);
  let logoutTimer: any = useRef(null);

  const onIdle = () => {
    const values = getValues();
    handleSave(values);
    setShowModal(!showModal);
    logoutTimer.current = setTimeout(
      () => {
        logout();
      },
      1000 * 60 * 5
    ); // 5 mins
  };

  const handleStayLoggedIn = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
    idleTimer.reset();
    setShowModal(false);
  };

  return (
    <>
      <IdleTimer
        ref={(ref: any) => {
          idleTimer = ref;
        }}
        element={document}
        stopOnIdle
        onIdle={onIdle}
        timeout={1000 * 60 * 55} // 55 mins
        debounce={500}
      />

      <CUI.Modal isOpen={showModal} onClose={() => {}}>
        <CUI.ModalOverlay />
        <CUI.ModalContent>
          <CUI.ModalHeader>Attention</CUI.ModalHeader>
          <CUI.ModalBody>
            You will be logged off soon due to inactivity. Your data has been
            saved.
          </CUI.ModalBody>
          <CUI.ModalFooter>
            <CUI.Button colorScheme="blue" mr={3} onClick={handleStayLoggedIn}>
              I'm Still Here
            </CUI.Button>
          </CUI.ModalFooter>
        </CUI.ModalContent>
      </CUI.Modal>
    </>
  );
};
