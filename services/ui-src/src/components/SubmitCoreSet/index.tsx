import { Box } from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
import { CoreSetTableItem } from "components/Table/types";
import { editCoreSet } from "libs/api";
import { useUser } from "hooks/authHooks";

interface Props {
  status: CoreSetTableItem.Status;
  year: string;
}

export const SubmitCoreSetButton = ({ status, year }: Props) => {
  const isSubmitted = status === CoreSetTableItem.Status.SUBMITTED;
  const helperText = !isSubmitted
    ? `Complete all Core Set Questions and Core Set Measures to submit FFY ${year}`
    : undefined;
  const userInfo = useUser();
  return (
    <Box textAlign="center">
      {!isSubmitted ? (
        <ContainedButton
          buttonText={"Submit Core Set"}
          // disabledStatus={status !== CoreSetTableItem.Status.COMPLETED}
          buttonProps={{
            bg: "blue.600",
            colorScheme: "blue",
            w: "full",
          }}
          helperText={helperText}
          onClick={() => {
            editCoreSet({
              state: "OH",
              year: "2021",
              coreSet: "ACS",
              body: {
                submitted: true,
                userState: userInfo.userState,
                userRole: userInfo.userRole,
                status: "submitted",
              },
            });
          }}
        />
      ) : (
        <p>Test</p>
      )}
    </Box>
  );
};
