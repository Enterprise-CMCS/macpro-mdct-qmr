import React from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";
import { Storage } from "aws-amplify";

interface IUploadProps {
  maxSize?: number;
  label?: string;
  acceptedFileTypes?: string | string[];
  name: string;
}

export const Upload = ({
  maxSize = 82000000,
  label,
  name,
  acceptedFileTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".xlsx",
    ".jpg",
    ".jpeg",
    ".png",
    ".jfif",
  ],
}: IUploadProps) => {
  const toast = CUI.useToast();

  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      async function uploadFile(file: any) {
        const fileToUpload = ensureLowerCaseFileExtension(file);

        let retPromise;
        const targetPathname = `${Date.now()}/${fileToUpload.name}`;

        try {
          const stored = await Storage.vault.put(targetPathname, fileToUpload, {
            level: "protected",
            contentType: fileToUpload.type,
          });

          const url = await Storage.vault.get(stored.key, {
            level: "protected",
          });

          let result = {
            s3Key: stored.key,
            filename: fileToUpload.name,
            contentType: fileToUpload.type,
            url: url.split("?", 1)[0], //We only need the permalink part of the URL since the S3 bucket policy allows for public read
          };

          retPromise = Promise.resolve(result);
        } catch (error) {
          console.log(error);
          retPromise = Promise.reject(error);
        }

        return retPromise;
      }

      async function uploadFiles(fileArray: any[]) {
        let resultPromise;
        if (fileArray.length > 0) {
          // Process each file.
          let uploadPromises: any[] = [];
          fileArray.forEach((file: any) => {
            let promise = uploadFile(file);
            uploadPromises.push(promise);
          });

          //Wait until all files are uploaded.
          resultPromise = new Promise((resolve, reject) => {
            Promise.all(uploadPromises)
              .then((results) => {
                resolve(results);
              })
              .catch((error) => {
                if (error) {
                  toast({
                    status: "warning",
                    description: "There was an error uploading your file",
                    duration: 4000,
                  });

                  console.log(error);
                  reject("There was an upload error");
                }
              });
          });
        } else {
          // Since we have no files then we are successful.
          Promise.resolve();
        }

        return resultPromise;
      }

      uploadFiles(acceptedFiles).then((result: any) =>
        field.onChange([...field.value, ...result])
      );
    },
    [field, toast]
  );

  const convertFileSize = (fileSize: number) => {
    if (fileSize < 1030000) {
      return `${Math.ceil(fileSize / 1000)}KB`;
    } else {
      return `${Math.ceil(fileSize / 1030000)}MB`;
    }
  };

  const clearFile = (fileIndexToClear: number) => {
    const arrayToFilter = field.value as File[];
    const filteredArray = arrayToFilter.filter(
      (_, index) => index !== fileIndexToClear
    );
    field.onChange(filteredArray);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes,
      maxSize,
    });

  function ensureLowerCaseFileExtension(file: any) {
    const extensionStartIndex = file.name.lastIndexOf(".");
    const fileNameText = file.name.slice(0, extensionStartIndex);
    const fileNameExtension = file.name.substring(extensionStartIndex);
    const lowerCaseFileNameExtension = fileNameExtension.toLowerCase();

    if (fileNameExtension === lowerCaseFileNameExtension) {
      return file;
    } else {
      const updatedFileName = fileNameText.concat(lowerCaseFileNameExtension);
      const updatedFile = new File([file], updatedFileName, {
        type: file.type,
      });
      return updatedFile;
    }
  }

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
            <CUI.Text color="blue" as="u">
              browse
            </CUI.Text>
          </button>
        </CUI.Text>
        <CUI.Text color="black" fontSize="sm" fontWeight="300">
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
      {field.value.map((file: any, index: any) => {
        return (
          <CUI.HStack
            key={`${index}-${file.name}`}
            background="blue.50"
            pl="1rem"
            my="2"
            borderRadius="10"
            justifyContent="space-between"
          >
            <CUI.Text variant="xl">File Name: {file.filename}</CUI.Text>
            <CUI.Button
              data-testid={`test-delete-btn-${index}`}
              data-cy={`upload-delete-btn-${index}`}
              background="none"
              onClick={() => clearFile(index)}
            >
              x
            </CUI.Button>
          </CUI.HStack>
        );
      })}
    </>
  );
};
