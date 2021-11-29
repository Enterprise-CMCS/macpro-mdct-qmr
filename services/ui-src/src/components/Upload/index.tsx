import React, { useCallback, useState } from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";

interface IUploadProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  maxSize?: number;
  label?: string;
}

export const Upload: React.FC<IUploadProps> = ({
  file,
  setFile,
  maxSize,
  label,
}) => {
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size <= (maxSize ?? 80000000)) {
        setFile(acceptedFiles[0]);
        setIsFileTooLarge(false);
      } else {
        setIsFileTooLarge(true);
      }
    },
    [setFile, maxSize]
  );

  const convertFileSize = (fileSize: number) => {
    if (fileSize < 1000000) {
      return `${fileSize / 1000}KB`;
    } else {
      return `${fileSize / 1000000}MB`;
    }
  };

  const clearFile = () => {
    setFile(undefined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      {label && <CUI.Text>{label}</CUI.Text>}
      <CUI.VStack
        {...getRootProps()}
        border="3px"
        borderStyle="dotted"
        borderColor={isDragActive ? "#9bdef9" : "rgba(255,255,255,0)"}
        background="#F0FAFE"
        py="1.5rem"
        borderRadius="10"
        boxSizing="border-box"
        cursor="pointer"
      >
        <FolderIcon />
        <input {...getInputProps()} style={{ display: "none" }} />
        <CUI.Text fontSize="lg">
          Drag & drop or{" "}
          <button type="button">
            <CUI.Text color="#6f9fcf" as="u">
              browse
            </CUI.Text>
          </button>
        </CUI.Text>
        <CUI.Text color="#5B616B" fontSize="sm">
          Maximum file size of 80MB.
        </CUI.Text>
      </CUI.VStack>
      {isFileTooLarge && (
        <CUI.Alert borderRadius={10} status="error">
          <CUI.AlertIcon />
          <CUI.AlertTitle mr={2}>File upload too large:</CUI.AlertTitle>
          <CUI.AlertDescription>
            The maximum file size is {convertFileSize(maxSize ?? 80000000)}
          </CUI.AlertDescription>
        </CUI.Alert>
      )}
      {file && (
        <CUI.HStack
          background="#f0fafe"
          pl="1rem"
          borderRadius="10"
          justifyContent="space-between"
        >
          <CUI.Text variant="xl">
            File Name: {file.name} ({convertFileSize(file.size)})
          </CUI.Text>
          <CUI.Button background="none" onClick={clearFile}>
            x
          </CUI.Button>
        </CUI.HStack>
      )}
    </>
  );
};
