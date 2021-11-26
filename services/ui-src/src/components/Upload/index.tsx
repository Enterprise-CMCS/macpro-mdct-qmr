import React, { useCallback } from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";

interface IUploadProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  maxSize?: number;
}

export const Upload: React.FC<IUploadProps> = ({ file, setFile, maxSize }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0].size <= (maxSize ?? 1000000)) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile, maxSize]
  );

  const clearFile = () => {
    setFile(undefined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <CUI.VStack
        {...getRootProps()}
        border={isDragActive ? "3px" : "0"}
        borderStyle={isDragActive ? "dotted" : "none"}
        borderColor="#9bdef9"
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
      {file && (
        <CUI.HStack
          background="#f0fafe"
          px="1rem"
          justifyContent="space-between"
        >
          <CUI.Text variant="xl" onClick={clearFile}>
            File Name: {file.name}
          </CUI.Text>
          <CUI.Button background="none" onClick={clearFile}>
            x
          </CUI.Button>
        </CUI.HStack>
      )}
    </>
  );
};
