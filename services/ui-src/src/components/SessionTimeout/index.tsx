import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import { Auth } from "aws-amplify";
import * as CUI from "@chakra-ui/react";
import { useUser } from "hooks/authHooks";

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

  // start inactive check
  const timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      const storedTimeStamp = localStorage.getItem(SESSION_TIMEOUT_KEY);
      warningInactive(storedTimeStamp);
    }, 60000);
  };

  // warning timer
  const warningInactive = async (timeString: any) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 3;
      const popTime = 1;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const secondsLeft = 60 - diff.seconds();
      const minutesLeft = maxTime - diff.minutes();
      setSeconds(secondsLeft * minutesLeft);

      if (minPast === popTime) {
        onOpen();
      }

      if (minPast === maxTime) {
        logout();
        clearInterval(warningInactiveInterval.current);
        localStorage.removeItem(SESSION_TIMEOUT_KEY);
      }
    }, 1000);
  };

  // reset interval timer
  const resetTimer = useCallback(async () => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);
    const session = await Auth.currentSession();

    if (session.isValid()) {
      const timeStamp = moment();
      localStorage.setItem(SESSION_TIMEOUT_KEY, timeStamp as any);
    } else {
      clearInterval(warningInactiveInterval.current);
      localStorage.removeItem(SESSION_TIMEOUT_KEY);
    }
    timeChecker();
    onClose();
  }, [onClose, timeChecker]);

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
  }, [resetTimer, timeChecker]);

  if (!isOpen) {
    return null;
  }

  const minutesRemaining = Math.ceil(seconds / 60);

  return (
    <CUI.Modal isOpen={isOpen} onClose={onClose}>
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
        <CUI.ModalFooter></CUI.ModalFooter>
      </CUI.ModalContent>
    </CUI.Modal>
  );
};
