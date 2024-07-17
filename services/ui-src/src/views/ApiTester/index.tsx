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
import { MeasureStatus } from "types";

export const ApiTester = () => {
  const userInfo = useUser();
  const userState = userInfo.userState;
  const userRole = userInfo.userRole;
  console.log(userInfo);
  return (
    <>
      <CUI.Flex flexWrap="wrap">
        <ContainedButton
          buttonText={"Create Core Set"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
          }}
          onClick={async () =>
            console.log(
              await createCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await editCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await getAllCoreSets({
                state: "AL",
                year: "2021",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await getCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await deleteCoreSet({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  userState,
                  userRole,
                },
              })
            )
          }
        />
      </CUI.Flex>
      <CUI.Flex flexWrap="wrap">
        <ContainedButton
          buttonText={"Create Measure"}
          buttonProps={{
            m: 2,
            colorScheme: "blue",
          }}
          onClick={async () =>
            console.log(
              await createMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await editMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  userState,
                  userRole,
                  data: {
                    test: "data",
                  },
                  status: MeasureStatus.INCOMPLETE,
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
          }}
          onClick={async () =>
            console.log(
              await listMeasures({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await getMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  userState,
                  userRole,
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
          }}
          onClick={async () =>
            console.log(
              await deleteMeasure({
                state: "AL",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
                  userState,
                  userRole,
                },
              })
            )
          }
        />
      </CUI.Flex>
    </>
  );
};
