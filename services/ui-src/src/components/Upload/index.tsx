import React from "react";
import * as CUI from "@chakra-ui/react";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";
import { Storage } from "aws-amplify";
import { useQuery } from "react-query";
import { saveAs } from "file-saver";

interface IUploadProps {
  maxSize?: number;
  label?: string;
  acceptedFileTypes?: string | string[];
  name: string;
}

interface ListItemProps {
  file: any;
  index: number;
  clearFile: (fileNumber: number) => void;
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
  ],
}: IUploadProps) => {
  const { control } = useFormContext();
  const [uploadStatus, setUploadStatus] = React.useState(0);
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
            progressCallback(progress) {
              const progressRatio = (progress.loaded / progress.total) * 100;
              setUploadStatus(progressRatio);
            },
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
                if (error.indexOf("No credentials") !== -1) {
                  reject("SESSION_EXPIRED");
                } else {
                  console.log("Error uploading.", error);
                  reject("UPLOADS_ERROR");
                }
              });
          });
        } else {
          // Since we have no files then we are successful.
          Promise.resolve();
        }

        return resultPromise;
      }
      field.onChange([...field.value, ...acceptedFiles]);
      uploadFiles(acceptedFiles).then((result: any) =>
        field.onChange([...field.value, ...result])
      );
    },
    [field]
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
      {field.value
        .filter((file: any) => file.s3Key)
        .map((file: any, index: any) => {
          return (
            <ListItem
              file={file}
              index={index}
              clearFile={clearFile}
              key={`${index}-${file.s3Key}`}
            />
          );
        })}
      {Boolean(uploadStatus) && Boolean(uploadStatus < 100) && (
        <CUI.Progress hasStripe value={uploadStatus} my="3" />
      )}
    </>
  );
};

const ListItem = ({ file, index, clearFile }: ListItemProps) => {
  const { data } = useQuery([file.s3Key], async () => {
    const testUrl = await Storage.get(file.s3Key, {
      download: true,
      level: "protected",
    });
    return testUrl;
  });

  if (!data) return null;

  return (
    <CUI.HStack
      background="blue.50"
      pl="1rem"
      my="2"
      borderRadius="10"
      justifyContent="space-between"
    >
      <CUI.Text
        as="a"
        onClick={() => {
          saveAs(data.Body as Blob, file.filename);
        }}
        variant="xl"
      >
        {file.filename}
      </CUI.Text>
      <CUI.Button
        data-testid={`test-delete-btn-${index}`}
        data-cy={`upload-delete-btn-${index}`}
        background="none"
        onClick={async () => {
          await Storage.remove(file.s3Key, {
            level: "protected",
          });
          clearFile(index);
        }}
      >
        x
      </CUI.Button>
    </CUI.HStack>
  );
};
