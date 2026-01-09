import { createStandaloneToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/react";
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { useEditCoreSet } from "hooks/api";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  coreSet: CoreSetAbbr;
  coreSetStatus?: CoreSetTableItem.Status;
  year: string;
  styleProps?: { button?: {}; helperText?: {} };
}

export const SubmitCoreSetButton = ({
  coreSet,
  coreSetStatus,
  year,
}: Props) => {
  const { mutate, isPending } = useEditCoreSet();
  const queryClient = useQueryClient();
  const userInfo = useUser();

  const { toast } = createStandaloneToast();

  const urlParams = useParams();
  const state = urlParams.state !== undefined ? urlParams.state : "";
  const isDisabled =
    isPending ||
    !userInfo.isStateUser ||
    coreSetStatus !== CoreSetTableItem.Status.COMPLETED;

  const handleSubmiCoreSet = () => {
    return mutate(
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
  };

  return (
    <Button
      variant="primary"
      onClick={() => handleSubmiCoreSet}
      isDisabled={isDisabled}
      width="246px"
    >
      Submit Core Set
    </Button>
  );
};
