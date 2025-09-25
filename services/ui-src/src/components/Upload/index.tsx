import React, { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import * as QMR from "components";
import { FolderIcon } from "components/FolderIcon";
import { useDropzone } from "react-dropzone";
import { useController, useFormContext } from "react-hook-form";
import { downloadData, getUrl, remove, uploadData } from "aws-amplify/storage";
import { saveAs } from "file-saver";
import { useUser } from "hooks/authHooks";
import { createSafeS3Key } from "utils";

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
  const { toast } = createStandaloneToast();

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
        const targetPathname = `${Date.now()}/${createSafeS3Key(
          fileToUpload.name
        )}`;

        try {
          const stored = await uploadData({
            key: targetPathname,
            data: fileToUpload,
            options: {
              contentType: fileToUpload.type,
              onProgress: ({ transferredBytes, totalBytes }) => {
                const progressRatio = (transferredBytes / totalBytes!) * 100;
                setUploadStatus(progressRatio);
              },
            },
          }).result;

          const res = await getUrl({ key: stored.key });
          const url = await res.url;

          let result = {
            s3Key: `public/${stored.key}`,
            filename: fileToUpload.name,
            contentType: fileToUpload.type,
            url: url, //We only need the permalink part of the URL since the S3 bucket policy allows for public read
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
                  reject("There was an error uploading your file");
                }
              });
          });
        } else {
          // Since we have no files then we are successful.
          Promise.resolve();
        }

        return resultPromise;
      }

      uploadFiles(acceptedFiles)
        .then((result: any) => {
          //console.log("uploading");
          field.onChange([...field.value, ...result]);
        })
        .catch((error) => {
          console.log(error);

          toast({
            status: "warning",
            description: error,
            duration: 4000,
          });
        });
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

  function fileNameValidator(file: any) {
    const fileNameRegex = new RegExp("^[0-9a-zA-z-_.()* ]*$");

    if (!fileNameRegex.test(file.name)) {
      return {
        code: "Invalid file name",
        message: `The file name contains invalid characters. Only the following characters are allowed: A-Z, a-z, 0-9, -, _, (, ), *, ., and space`,
      };
    }
    return null;
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes,
      maxSize,
      validator: fileNameValidator,
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

  // Here, we determing if this is a state user. If it's a non-state user,
  // display the ComponentMask overlay to signal to the user that the upload box
  // is disabled.
  const { isStateUser } = useUser();

  return (
    <>
      {label && <CUI.Text>{label}</CUI.Text>}
      <CUI.VStack
        {...getRootProps()}
        borderWidth="3px"
        borderStyle="dotted"
        borderColor={isDragActive ? "blue.100" : "rgba(255,255,255,0)"}
        backgroundColor="blue.50"
        py="1.5rem"
        borderRadius="10"
        boxSizing="border-box"
        cursor="pointer"
        position="relative"
        className="prince-upload-wrapper"
        data-testid="upload-stack"
      >
        {!isStateUser && <QMR.ComponentMask />}
        <FolderIcon />
        <input
          data-testid="upload-component"
          {...getInputProps()}
          style={{ display: "none" }}
        />
        <CUI.Text fontSize="lg">
          Drag &amp; drop or{" "}
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async () => {
    setIsProcessing(true);

    const { body } = await downloadData({ path: file.s3Key }).result;
    saveAs(body as unknown as Blob, file.filename);
    setIsProcessing(false);
  };

  if (isProcessing)
    return (
      <CUI.Alert status="info" mt="2" borderRadius={10}>
        <CUI.AlertIcon />
        Processing. Please wait.
      </CUI.Alert>
    );

  return (
    <CUI.HStack
      backgroundColor="blue.50"
      pl="1rem"
      mt="2"
      borderRadius="10"
      justifyContent="space-between"
      zIndex={3}
      py="6px"
      className="prince-file-item"
    >
      <CUI.Button
        as="a"
        onClick={handleSave}
        variant="xl"
        data-cy={`file-upload-${file.filename}`}
        zIndex={3}
        tabIndex={0}
      >
        {file.filename}
      </CUI.Button>
      {console.log("file name: ", file)}
      <CUI.Button
        data-testid={`test-delete-btn-${index}`}
        data-cy={`upload-delete-btn-${index}`}
        aria-label={`Delete file-upload-${file.filename}`}
        background="none"
        onClick={async () => {
          await remove({ path: file.s3Key });
          clearFile(index);
        }}
      >
        Delete
      </CUI.Button>
    </CUI.HStack>
  );
};
