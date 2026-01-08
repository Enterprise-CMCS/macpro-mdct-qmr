import { createStandaloneToast } from "@chakra-ui/toast";
import { Box, Text } from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { useEditCoreSet } from "hooks/api";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  coreSet: CoreSetAbbr;
  coreSetStatus?: CoreSetTableItem.Status;
  isSubmitted: boolean;
  year: string;
  styleProps?: { button?: {}; helperText?: {} };
}

export const SubmitCoreSetButton = ({
  coreSet,
  coreSetStatus,
  isSubmitted = false,
  year,
}: Props) => {
  const { mutate, isPending } = useEditCoreSet();
  const queryClient = useQueryClient();
  const userInfo = useUser();

  const { toast } = createStandaloneToast();

  const urlParams = useParams();
  const state = urlParams.state !== undefined ? urlParams.state : "";

  return (
    <Box textAlign="center" data-cy="SubmitCoreSetButtonWrapper">
      {!isSubmitted ? (
        <ContainedButton
          buttonText={"Submit Core Set"}
          disabledStatus={
            isPending ||
            !userInfo.isStateUser ||
            coreSetStatus !== CoreSetTableItem.Status.COMPLETED
          }
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
                  queryClient.refetchQueries();
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
