/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import * as CUI from "@chakra-ui/react";
import { useUser } from "hooks/authHooks";
import { isAfter } from "date-fns";

// window events to listen for
const events = ["click", "load", "scroll", "keydown", "touchstart"];

// local storage key (we use local storage to persist accross tabs/windows)
const SESSION_TIMEOUT_KEY = "lastTimeActive";

export const SessionTimeout = () => {
  const [seconds, setSeconds] = useState(0);
  const { isOpen, onOpen, onClose } = CUI.useDisclosure();
  const { logout } = useUser();

  const warningInactiveInterval: any = useRef();
  const startTimerInterval: any = useRef();

  // warning timer
  const warningInactive = async (activeTime: number) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      // minutes after inactivity converted to miliseconds
      const maxTime = 3 * 60000;
      const popTime = 1 * 60000;

      const now = Date.now();

      // is the current time after the time to logout
      if (isAfter(now, activeTime + maxTime)) {
        logout();
        clearInterval(warningInactiveInterval.current);
        localStorage.removeItem(SESSION_TIMEOUT_KEY);
      }

      // is the current time after the time for the popup to show
      if (isAfter(now, activeTime + popTime) && !isOpen) {
        const secondsRemaining = (activeTime + maxTime - now) / 1000;
        setSeconds(Math.ceil(secondsRemaining));
        if (!isOpen) {
          onOpen();
        }
      }
    }, 1000);
  };

  // start inactive check
  const timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      const storedTimeStamp = localStorage.getItem(SESSION_TIMEOUT_KEY);
      warningInactive(Number(storedTimeStamp));
    }, 60000);
  };

  // reset interval timer
  const resetTimer = async () => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);
    const session = await Auth.currentSession();

    if (session.isValid()) {
      const timeStamp = Date.now();
      localStorage.setItem(SESSION_TIMEOUT_KEY, String(timeStamp));
    } else {
      clearInterval(warningInactiveInterval.current);
      localStorage.removeItem(SESSION_TIMEOUT_KEY);
    }
    timeChecker();
  };

  const handleClose = () => {
    resetTimer();
    onClose();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [resetTimer, timeChecker]);

  if (!isOpen) {
    return null;
  }

  const minutesRemaining = Math.ceil(seconds / 60);

  return (
    // onClose is a required prob but we dont want to close when click outside happens
    <CUI.Modal isOpen={isOpen} onClose={() => {}}>
      <CUI.ModalOverlay />
      <CUI.ModalContent>
        <CUI.ModalHeader>Attention</CUI.ModalHeader>
        <CUI.ModalBody>
          {`Due to inactivity you will be automatically logged out in ${
            minutesRemaining > 1
              ? `${minutesRemaining} minutes.`
              : `${seconds} seconds.`
          }`}
        </CUI.ModalBody>
        <CUI.ModalFooter>
          <CUI.Button colorScheme="blue" mr={3} onClick={handleClose}>
            I'm Still Here
          </CUI.Button>
        </CUI.ModalFooter>
      </CUI.ModalContent>
    </CUI.Modal>
  );
};
