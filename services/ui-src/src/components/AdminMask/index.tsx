import { useUser } from "hooks/authHooks";
import * as CUI from "@chakra-ui/react";

export const AdminMask = () => {
  const { isStateUser } = useUser();
  if (!isStateUser) {
    return (
      <CUI.Box
        top={0}
        left={0}
        position="fixed"
        width="100vw"
        height="100vh"
        zIndex={2}
        backgroundColor="gray.100"
        opacity={0.2}
      />
    );
  }
  return null;
};
