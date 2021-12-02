import React, { useCallback } from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";
import { Control, FieldValues, useController } from "react-hook-form";

interface IUploadProps {
  maxSize?: number;
  label?: string;
  acceptedFileTypes?: string | string[];
  control: Control<FieldValues, Object>;
  name: string;
}

export const Upload = ({
  maxSize = 80000000,
  label,
  name,
  control,
  acceptedFileTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".xlsx",
    ".jpg",
    ".jpeg",
    ".png",
  ],
}: IUploadProps) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
      field.onChange([...files, ...acceptedFiles]);
    },
    [files, setFiles, field]
  );

  const convertFileSize = (fileSize: number) => {
    if (fileSize < 1000000) {
      return `${Math.ceil(fileSize / 1000)}KB`;
    } else {
      return `${Math.ceil(fileSize / 1000000)}MB`;
    }
  };

  const clearFile = (fileIndexToClear: number) => {
    const filteredArray = files.filter(
      (_, index) => index !== fileIndexToClear
    );
    setFiles(filteredArray);
    field.onChange(filteredArray);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes,
      maxSize,
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
      {fileRejections.map((erroredFile, index) => (
        <CUI.Alert
          key={`${erroredFile.file.name}-${index}`}
          borderRadius={10}
          status="error"
        >
          <CUI.AlertIcon />
          <CUI.AlertTitle mr={2}>
            {erroredFile.file.name}:{" "}
            {erroredFile.errors[0].message.replace(
              /[0-9]* bytes/g,
              convertFileSize(maxSize)
            )}
          </CUI.AlertTitle>
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
