import { useUser } from "hooks/authHooks";
import * as CUI from "@chakra-ui/react";

interface Props {
  force?: boolean;
}

export const AdminMask = ({ force = false }: Props) => {
  const { isStateUser } = useUser();
  if (!isStateUser || !!force) {
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
        className="hidden-print-items"
      />
    );
  }
  return null;
};
