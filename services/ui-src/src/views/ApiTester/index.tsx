import * as CUI from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
import { useUser } from "hooks/authHooks";
import {
  createCoreSet,
  editCoreSet,
  getAllCoreSets,
  getCoreSet,
  deleteCoreSet,
  listMeasures,
  getMeasure,
  createMeasure,
  editMeasure,
  deleteMeasure,
} from "libs/api";

export const ApiTester = () => {
  const userInfo = useUser();
  const user_state = userInfo.userState;
  const user_role = userInfo!.user!.role;
  return (
    <>
      <CUI.Flex flexWrap="wrap" spacing={5}>
        <ContainedButton
          buttonText={"Create Core Set"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await createCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  user_state,
                  user_role,
                },
              }),
              userInfo
            )
          }
        />
        <ContainedButton
          buttonText={"Edit Core Set"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await editCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  user_state,
                  user_role,
                  status: "complete",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get All Core Sets"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getAllCoreSets({
                state: "AL",
                year: "2021",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get Specific Core Set"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Delete Core Set"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await deleteCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
      </CUI.Flex>
      <CUI.Flex flexWrap="wrap" spacing={5}>
        <ContainedButton
          buttonText={"Create Measure"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await createMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  user_state,
                  user_role,
                  test: "data",
                  description: "test description",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Edit Measure"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await editMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  user_state,
                  user_role,
                  data: {
                    test: "data",
                  },
                  status: "incomplete",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"List all measures"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await listMeasures({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get Measure"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Delete Measure"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await deleteMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  user_state,
                  user_role,
                },
              })
            )
          }
        />
      </CUI.Flex>
    </>
  );
};
