import React, { useCallback, useState } from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";

interface IUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxSize?: number;
  label?: string;
}

export const Upload: React.FC<IUploadProps> = ({
  files,
  setFiles,
  maxSize = 83886080,
  label,
}) => {
  const [erroredFiles, setErroredFiles] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const acceptedTempFiles: File[] = [];
      const erroredFiles: string[] = [];

      for (const file of acceptedFiles) {
        file.size <= maxSize
          ? acceptedTempFiles.push(file)
          : erroredFiles.push(file.name);
      }

      erroredFiles.length > 0
        ? setErroredFiles(erroredFiles)
        : setErroredFiles([]);

      acceptedTempFiles.length > 0
        ? setFiles([...files, ...acceptedTempFiles])
        : setFiles([]);
    },
    [setFiles, maxSize, files]
  );

  const convertFileSize = (fileSize: number) => {
    if (fileSize < 1048576) {
      return `${fileSize / 1024}KB`;
    } else {
      return `${fileSize / 1048576}MB`;
    }
  };

  const clearFile = (fileIndexToClear: number) => {
    const filteredArray = files.filter(
      (_, index) => index !== fileIndexToClear
    );
    setFiles(filteredArray);
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
        borderColor={isDragActive ? "blue.100" : "rgba(255,255,255,0)"}
        background="blue.50"
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
            <CUI.Text color="blue.300" as="u">
              browse
            </CUI.Text>
          </button>
        </CUI.Text>
        <CUI.Text color="gray.500" fontSize="sm">
          Maximum file size of {convertFileSize(maxSize)}.
        </CUI.Text>
      </CUI.VStack>
      {erroredFiles.map((erroredFile, index) => (
        <CUI.Alert
          key={`${erroredFile}-${index}`}
          borderRadius={10}
          status="error"
        >
          <CUI.AlertIcon />
          <CUI.AlertTitle mr={2}>{erroredFile} too large:</CUI.AlertTitle>
          <CUI.AlertDescription>
            The maximum file size is {convertFileSize(maxSize)}
          </CUI.AlertDescription>
        </CUI.Alert>
      ))}
      {files.map((file, index) => (
        <CUI.HStack
          key={`${index}-${file.name}`}
          background="blue.50"
          pl="1rem"
          borderRadius="10"
          justifyContent="space-between"
        >
          <CUI.Text variant="xl">
            File Name: {file.name} ({convertFileSize(file.size)})
          </CUI.Text>
          <CUI.Button
            data-testid={`test-delete-btn-${index}`}
            background="none"
            onClick={() => clearFile(index)}
          >
            x
          </CUI.Button>
        </CUI.HStack>
      ))}
    </>
  );
};
