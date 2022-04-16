import { Box, Text, useToast } from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { useEditCoreSet } from "hooks/api";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useQueryClient } from "react-query";

interface Props {
  coreSet: CoreSetAbbr;
  status: CoreSetTableItem.Status;
  year: string;
}

export const SubmitCoreSetButton = ({ coreSet, status, year }: Props) => {
  const helperText = `Complete all Core Set Questions and Core Set Measures to submit FFY ${year}`;
  const isSubmitted = status === CoreSetTableItem.Status.SUBMITTED;
  const { mutate, isLoading } = useEditCoreSet();
  const queryClient = useQueryClient();
  const userInfo = useUser();
  const toast = useToast();

  const urlParams = useParams();
  const state = urlParams.state !== undefined ? urlParams.state : "";

  return (
    <Box textAlign="center">
      {!isSubmitted ? (
        <ContainedButton
          buttonText={"Submit Core Set"}
          disabledStatus={
            isLoading // || status !== CoreSetTableItem.Status.COMPLETED
          }
          buttonProps={{
            bg: "blue.600",
            colorScheme: "blue",
            w: "full",
          }}
          helperText={helperText}
          onClick={() => {
            mutate(
              {
                coreSet,
                state,
                year,
                body: {
                  submitted: true,
                  status: CoreSetTableItem.Status.SUBMITTED,
                  userRole: userInfo.userRole,
                  userState: userInfo.userState,
                },
              },
              {
                onSettled: () => {
                  queryClient.refetchQueries(["coreSets"]);
                  toast({
                    status: "success",
                    description: "Core Set submitted successfully!",
                    duration: 4000,
                  });
                },
              }
            );
          }}
        />
      ) : (
        <Text fontStyle="italic">Submitted</Text>
      )}
    </Box>
  );
};
