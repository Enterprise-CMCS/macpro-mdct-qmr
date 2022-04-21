import * as CUI from "@chakra-ui/react";

export const ComponentMask = () => {
  return (
    <CUI.Box
      top={0}
      left={0}
      position="absolute"
      width="100%"
      height="100%"
      zIndex={2}
      backgroundColor="gray.100"
      opacity={0.5}
      cursor="not-allowed"
    />
  );
};
