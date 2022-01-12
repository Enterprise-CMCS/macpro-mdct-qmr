import * as CUI from "@chakra-ui/react";
import { ContainedButton } from "components/ContainedButton";
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                body: {
                  test: "data",
                  test2: "moreData",
                },
              })
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                body: {
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
                state: "FS",
                year: "2021",
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
                body: {
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
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await listMeasures({
                state: "FS",
                year: "2021",
                coreSet: "ACS",
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
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
                state: "FS",
                year: "2021",
                coreSet: "ACS",
                measure: "AIF-HH",
              })
            )
          }
        />
      </CUI.Flex>
    </>
  );
};
