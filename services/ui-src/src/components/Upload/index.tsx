import React from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";

interface IUploadProps {
  filePath?: string;
}

export const Upload: React.FC<IUploadProps> = () => {
  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  const uploadFileClock = () => {
    fileUploadRef?.current?.click();
  };

  return (
    <CUI.VStack background="#F0FAFE" py="1.5rem" borderRadius="10">
      <FolderIcon />
      <input ref={fileUploadRef} type="file" style={{ display: "none" }} />
      <CUI.Text fontSize="lg">
        Drag & drop or{" "}
        <button type="button" onClick={uploadFileClock}>
          <CUI.Text color="#6f9fcf" as="u">
            browse
          </CUI.Text>
        </button>
      </CUI.Text>
      <CUI.Text color="#5B616B" fontSize="sm">
        Maximum file size of 80MB.
      </CUI.Text>
    </CUI.VStack>
  );
};
