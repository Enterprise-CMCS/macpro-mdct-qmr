import React from "react";
import * as CUI from "@chakra-ui/react";

export const DemoDrawer = () => {
  const addHash = (hash: string) => {
    window.location.hash = `${hash}`;
  };
  const openDrawerButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      <CUI.Button
        ref={openDrawerButtonRef}
        onClick={() => setIsDrawerOpen(true)}
        style={{
          zIndex: 10,
          position: "fixed",
          top: 10,
          left: 10,
        }}
      >
        Open Components Navigation
      </CUI.Button>

      <CUI.Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* <CUI.DrawerOverlay /> */}
        <CUI.DrawerContent>
          <CUI.DrawerCloseButton />
          <CUI.DrawerHeader>Components</CUI.DrawerHeader>
          <CUI.DrawerBody>
            <CUI.VStack>
              <CUI.Button isFullWidth onClick={() => addHash("#text-area")}>
                Text Area
              </CUI.Button>
              <CUI.Button isFullWidth onClick={() => addHash("#radio-button")}>
                Radio Button
              </CUI.Button>
              <CUI.Button isFullWidth onClick={() => addHash("#text-input")}>
                Text Input
              </CUI.Button>
              <CUI.Button isFullWidth onClick={() => addHash("#select-input")}>
                Select Input
              </CUI.Button>
              <CUI.Button
                isFullWidth
                onClick={() => addHash("#number-input-with-mask")}
              >
                Number Input With Mask
              </CUI.Button>
            </CUI.VStack>
          </CUI.DrawerBody>
        </CUI.DrawerContent>
      </CUI.Drawer>
    </>
  );
};
