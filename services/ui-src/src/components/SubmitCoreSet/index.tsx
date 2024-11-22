import { createStandaloneToast } from "@chakra-ui/toast";
import { Box, Text } from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "components/Table/types";
import { useEditCoreSet } from "hooks/api";
import { useParams } from "react-router-dom";
import { useUser } from "hooks/authHooks";
import { useQueryClient } from "@tanstack/react-query";
import { featuresByYear } from "utils/featuresByYear";

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
  styleProps,
}: Props) => {
  const helperTextFiller = () => {
    const abbr = coreSet?.split("_") ?? [coreSet];
    switch (abbr[0]) {
      case CoreSetAbbr.ACS:
      case CoreSetAbbr.ACSC:
      case CoreSetAbbr.ACSM:
        return "Adult ";
      case CoreSetAbbr.CCS:
      case CoreSetAbbr.CCSM:
      case CoreSetAbbr.CCSC:
        return "Child ";
      case CoreSetAbbr.HHCS:
        return "Health Home ";
      default:
        return "";
    }
  };

  const subSetTextFiller = () => {
    const abbr = coreSet?.split("_") ?? [coreSet];
    switch (abbr[0]) {
      case CoreSetAbbr.ACS:
        return " ";
      case CoreSetAbbr.CCS:
        return ": Medicaid & CHIP ";
      case CoreSetAbbr.ACSM:
      case CoreSetAbbr.CCSM:
        return ": Medicaid ";
      case CoreSetAbbr.ACSC:
      case CoreSetAbbr.CCSC:
        return ": CHIP ";
      case CoreSetAbbr.HHCS:
        return " ";
      default:
        return " ";
    }
  };
  const helperText = `Complete all ${helperTextFiller()}Core Set Questions${subSetTextFiller()}and ${helperTextFiller()}Core Set Measures${subSetTextFiller()}to submit ${
    featuresByYear.displayFFYLanguage ? "FFY" : ""
  } ${year}`;
  const { mutate, isLoading } = useEditCoreSet();
  const queryClient = useQueryClient();
  const userInfo = useUser();

  const toast = createStandaloneToast();

  const urlParams = useParams();
  const state = urlParams.state !== undefined ? urlParams.state : "";

  return (
    <Box textAlign="center" data-cy="SubmitCoreSetButtonWrapper">
      {!isSubmitted ? (
        <ContainedButton
          buttonText={"Submit Core Set"}
          disabledStatus={
            isLoading ||
            !userInfo.isStateUser ||
            coreSetStatus !== CoreSetTableItem.Status.COMPLETED
          }
          buttonProps={{
            bg: "blue.600",
            colorScheme: "blue",
            w: "full",
            ...styleProps?.button,
          }}
          helperText={helperText}
          helperTextProps={styleProps?.helperText}
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
